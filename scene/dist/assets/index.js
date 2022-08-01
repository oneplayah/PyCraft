const url = window.location.href;
if (url.includes('phil-mac') || url.includes('4a33e686')) {
  const instructions = document.getElementById('instructions');
  instructions.style.display = 'block';
}

const canvas = document.getElementById("renderCanvas");

// Babylon boilerplate
var engine = null;
var scene = null;
var sceneToRender = null;
function startRenderLoop (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });

  // canvas.addEventListener('')

}
function createDefaultEngine () { 
  return new BABYLON.Engine(canvas, true, { 
    preserveDrawingBuffer: true, 
    stencil: true,  
    disableWebGL2Support: false
  }); 
};

const createScene = () => {
  // Scene & Lights
  const scene = new BABYLON.Scene(engine);
  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.4, 1, 0.4), scene);

  // Gravity
  let gravity = -0.1;
  scene.gravity = new BABYLON.Vector3(0, -0.1, 0);
  scene.collisionsEnabled = true;

  // Player / camera
  var camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(1, 2, 1), scene);
  camera.setTarget(new BABYLON.Vector3(50, 2, 57))
  camera.attachControl(canvas, true);
  camera.ellipsoid = new BABYLON.Vector3(0.5, 0.99, 0.5);
  camera.ellipsoidOffset = new BABYLON.Vector3(0, 0.05, 0);
  camera.minZ = 0.05;
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera._needMoveForGravity = true;
  camera.speed = 0.2;
  camera.keysUp = ['W'.charCodeAt(0)];
  camera.keysDown = ['S'.charCodeAt(0)];
  camera.keysLeft = ['A'.charCodeAt(0)];
  camera.keysRight = ['D'.charCodeAt(0)];

  scene.onPointerDown = () => {
    window.engine.enterPointerlock();
  };

  // Jump controls
  let gravityMultiplier = 1;
  const keys = {
    jump: 0,
  };
  scene.onKeyboardObservable.add((kbInfo) => {
    const isPressed = kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN ? 1 : 0;
    const key = kbInfo.event.key;
    if (key === " ") keys.jump = isPressed;
  });
  camera.step = function () {  
    if (keys.jump) {
      if(isGrounded()) {
          gravityMultiplier = -0.5;
          scene.gravity = new BABYLON.Vector3(0, gravity * gravityMultiplier, 0);
      }
    }
  }
  engine.runRenderLoop(() => {
    if (camera != null) {
      camera.step();
      if (gravityMultiplier < 1) {
          gravityMultiplier = gravityMultiplier + 0.02;
          scene.gravity = new BABYLON.Vector3(0, gravity * gravityMultiplier, 0);
      } else if (gravityMultiplier > 1) {
          gravityMultiplier = 1;
          scene.gravity = new BABYLON.Vector3(0, gravity * gravityMultiplier, 0);
      }
    }
  })
  function isGrounded(){ 
      if (floorRaycast(camera, 0, 0, 2.1).equals(BABYLON.Vector3.Zero())) {
          return false;
      } else {
          return true;
      }
  }
  function floorRaycast(cam, offsetx, offsetz, raycastlen) {
      let raycastFloorPos = new BABYLON.Vector3(cam.position.x + offsetx, cam.position.y, cam.position.z + offsetz);
      let ray = new BABYLON.Ray(raycastFloorPos, BABYLON.Vector3.Up().scale(-1), raycastlen);

      let predicate = function (mesh) {
          return mesh.isPickable && mesh.isEnabled();
      }

      let pick = scene.pickWithRay(ray, predicate);

      if (pick.hit) { 
          return pick.pickedPoint;
      } else {
          return BABYLON.Vector3.Zero();
      }
  }
  scene.registerBeforeRender(()=>{
      let dT = engine.getDeltaTime();
      camera.speed = 4.8 / dT;
      gravity = -4/dT;
  })

  // Ground
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 64, height: 64}, scene);
  ground.material = new BABYLON.GridMaterial('groundMaterial', scene);
  ground.material.lineColor = new BABYLON.Color3(0.03, 0.03, 0.03);
  ground.material.mainColor = new BABYLON.Color3(0.03, 0.23, 0);
  ground.position.x = 31.5;
  ground.position.z = 31.5;
  ground.position.y = -0.499;
  ground.checkCollisions = true;
  
  // Skybox
  const skybox = BABYLON.Mesh.CreateBox('skyBox', 5000.0, scene);
  skybox.position.y = -200;
  const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    '//www.babylonjs.com/assets/skybox/TropicalSunnyDay',
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  // add Blocks
  const colors = {
    'white':	[255,255,255],
    'black':	[0,0,0],
    'red':	[255,0,0],
    'lime':	[0,255,0],
    'blue':	[0,0,255],
    'yellow':	[255,255,0],
    'cyan':	[0,255,255],
    'aqua':	[0,255,255],
    'magenta':	[255,0,255],
    'fuchsia':	[255,0,255],
    'silver':	[192,192,192],
    'gray':	[128,128,128],
    'maroon':	[128,0,0],
    'olive':	[128,128,0],
    'green':	[0,128,0],
    'purple':	[128,0,128],
    'teal':	[0,128,128],
    'navy':	[0,0,128],
  };
  
  function colorToRGB (color) {
    if (!colors[color]) return [1, 1, 1];
    return colors[color].map(c => c/255);
  }
  
  function addBlock([x, y, z, color]) {  
    const blockMaterial = new BABYLON.GridMaterial('blockMaterial', scene);
    const [r, g, b] = colorToRGB(color);
    const dim = 1.5;
    blockMaterial.mainColor = new BABYLON.Color3(r/dim, g/dim, b/dim);
    blockMaterial.lineColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    blockMaterial.gridOffset = new BABYLON.Vector3(0.5, 0.5, 0.5);
    blockMaterial.minorUnitVisibility = 1;
  
    const block = BABYLON.MeshBuilder.CreateBox('block', {size: 1});
    block.material = blockMaterial;
    block.position.x = Math.floor(x);
    block.position.y = Math.floor(y);
    block.position.z = Math.floor(z);
    block.checkCollisions = true;
  };

  const pyBlocks = loadJsonFromFile('/assets/pyBlockData.txt');
  const jsBlocks = loadJsonFromFile('/assets/jsBlockData.txt');

  let allLanguageBlocks = [pyBlocks, jsBlocks];

  for (let languageBlocks of allLanguageBlocks) {
    if (languageBlocks && languageBlocks instanceof Array) {
      for (let block of languageBlocks) {
        addBlock(block);
      }
    }
  }
  
  return scene;
};

// More Babylon boilerplate
window.initFunction = async function() {
  const asyncEngineCreation = async function() {
    try {
      return createDefaultEngine();
    } catch(e) {
      console.log("the available createEngine function failed. Creating the default engine instead");
      return createDefaultEngine();
    }
  }
  window.engine = await asyncEngineCreation();
  if (!engine) throw 'engine should not be null.';
  startRenderLoop(engine, canvas);
  window.scene = createScene();
};

initFunction().then(() => {
  sceneToRender = scene;
});

function loadJsonFromFile(filePath) {
  let result = null;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return JSON.parse(result);
}

// Handle resize
window.addEventListener("resize", function () {
  engine.resize();
});

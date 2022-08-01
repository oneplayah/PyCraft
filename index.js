function generate() {
  let blocks = [];

  
  // ---- examples ----
  // create a single blue block at position x = 2, y = 0, z = 0
  let singleBlock = [2, 0, 0, 'blue'];
  // add the block to the main blocks array 
  blocks.push(singleBlock);

  // create two blocks, one on top of the other
  let twoBlocks = [[4, 0, 2, 'red'], [4, 1, 2, 'red']];
  // use concat to combine the two arrays, setting `blocks` to be the combined array
  blocks = blocks.concat(twoBlocks);

  // for loops can be used to create several blocks at once
  for (let i = 0; i < 10; i++) {
    blocks.push([6, i, 5, 'yellow'])
  }

  // functions let you reuse pieces of code
  function squiggle(x0, y0, z0, color) {
    for (let i = 0; i < 20; i++) {
      blocks.push([x0 + i, y0 + 2 + Math.sin(i) * 1.2, z0, color]);
    }
  }
  squiggle(10, 0, 10, 'lime')
  squiggle(34, 0, 10, 'magenta')

  // you can define functions outside of `generate`, like `wavyBridge` below
  const wavyBridgeBlocks = wavyBridge(9, 15);
  blocks = blocks.concat(wavyBridgeBlocks);

  // shift all blocks over in the z direction to space out JavaScript examples from others
  blocks = blocks.map(block => [block[0], block[1], 40 + block[2], block[3]]);
  // ---- -------- ----

  
  return blocks;
}

module.exports = generate;


// example
function wavyBridge(x0 = 0, z0 = 0, width = 4, color = 'gray') {
  let blocks = [];

  // stairs 
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < width; j++) {
      blocks.push([x0 + i, i, z0 + j, color]);
    }
  }

  // the wave
  for (let i = 2; i < 29; i++) {
    for (let j = 0; j < width; j++) {
      blocks.push([x0 + 7 + i, 8 + (Math.sin(i / 2) * 2), z0 + j, color]);
    }
  }

  // other stairs
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < width; j++) {
      blocks.push([x0 + 36 + i, 9 - i, z0 + j, color]);
    }
  }

  return blocks;
}
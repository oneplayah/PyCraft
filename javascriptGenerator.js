const fs = require('fs');

const path = './index.js';
if (fs.existsSync(path)) {
  try {
    const generate = require('./index.js');
    const blocks = generate();
    fs.writeFileSync('./scene/dist/assets/jsBlockData.txt', JSON.stringify(blocks));
  } catch(e) {
    console.log("\nERROR: The `generate` function wasn't found in `index.js`\n")
  }
} else {
  console.log("\nERROR: `index.js` file not found\n")
}

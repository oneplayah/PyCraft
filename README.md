# DefCraft in a Repl

This is a Repl for programming little Minecraft-like scenes that you can explore.

Once you fork the Repl, you can write code to describe structures made of blocks. When you Run the Repl, it will generate those blocks in an explorable 3D world. 

## How do I use it?

You can write JavaScript in `index.js` or Python in `main.py`.

Each of those files exports a function named `generate` that must return an array (or "list" in Python) of blocks to create.

"Blocks" are described by an array with the x position, y position, z position, and color, where positions are numbers and the color is a string. For example, block `[1, 5, 6, 'red']` indicates a red block at position x 1, y 5, and z 6 in the 3D world, where y is the vertical direction.

The array of blocks to return should therefore be an array of arrays (or list of lists). For example, returning `[[1, 5, 6, 'red'], [7, 3, 2, 'blue']]` from the `generate` function will create those two blocks. 

To re-generate after making changes, either click "Stop" then "Run" again, or use the shortcut for running a Repl. 

## What is DefCraft?

DefCraft (https://replit.com/@phil-mac/DefCraft?v=1) is a self-standing game prototype made on Replit where you write code in a little Lisp language to generate structures. 

This template, "DefCraft in a Repl" is a quick hack to see how much of that game could be created using a Repl as the coding environment, instead of having an in-game editor. The thought is that Replit is like a new interface for doing stuff on the internet, so maybe it could be an interface for playing a weird game like this.

Since it's in a Repl, it was easy to allow you to use JavaScript and Python, with a simplified system of declaring an array of the blocks to create.

The result is that this template is sort of like a little version of Processing, or p5.js, but where you can climb around on what you create, like in Minecraft.
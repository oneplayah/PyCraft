def generate():
  blocks = []

  # ---- examples ----
  # create a single navy block at position x = 6, y = 0, z = 6
  single_block = [8, 0, 6, "navy"]
  # add the block to the main blocks list 
  blocks.append(single_block)

  # create two blocks, one next to the other
  two_blocks = [[10, 0, 4, "purple"], [11, 0, 4, "purple"]]
  # use + operator to combine the two lists, setting `blocks` to be the combined list
  blocks = blocks + two_blocks

  # for loops can be used to create several blocks at once
  for i in range(10):
    blocks.append([12 + i, 0, 2, "green"])

  # line of blocks showing every usable color
  for i, color in enumerate(allColors):
    blocks.append([1, 1, 5 + i, color])

  # functions let you reuse pieces of code
  def tree(x_0, z_0, tiers):
    def branches(x, z, height, len):
      for i in range(-len, len + 1):
        blocks.append([x + i, height, z, "green"])
        blocks.append([x, height, z + i, "green"])

    h = (tiers * 2) + 2
    for i in range(0, h):
      blocks.append([x_0, i, z_0, "maroon"])
      branch_len = int((h - i) / 2);
      if (i % 2) == 0 and i > 1:
        branches(x_0, z_0, i, branch_len)

  tree(24, 11, 4)
  tree(37, 6, 2)
  tree(44, 18, 3)

  # you can define functions outside of `generate`, like `hut` 
  hut_blocks = hut(51, 5)
  blocks = blocks + hut_blocks
  # ---- -------- ----

  
  return blocks
  
# these are all the colors that are currently available
allColors = [
  "white",
  "black",
  "red",
  "lime",
  "blue",
  "yellow",
  "cyan",
  "magenta",
  "silver",
  "gray",
  "maroon",
  "olive",
  "green",
  "purple",
  "teal",
  "navy" 
]

def hut(x_0, z_0):
  blocks = []

  side_len = 8
  half_side_len = int(side_len/2);
  height = 5

  # foundation
  for i in range(side_len):
    for j in range(side_len):
      blocks.append([x_0 + i, 0, z_0 + j, "gray"])

  # pillars
  def pillar(x, z):
    for i in range(1, height):
      blocks.append([x, i, z, "maroon"])
  pillar(x_0, z_0);
  pillar(x_0 + side_len - 1, z_0)
  pillar(x_0, z_0 + side_len - 1)
  pillar(x_0 + side_len - 1, z_0 + side_len - 1)

  # roof
  for i in range(side_len):
    for j in range(-1, half_side_len):
      blocks.append([x_0 + i, height + j, z_0 + j, "olive"])
  for i in range(side_len):
    for j in range(-1, half_side_len):
      blocks.append([x_0 + i, height + j, z_0 + side_len - j - 1, "olive"])
  
  return blocks


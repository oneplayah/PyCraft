import json
import importlib.util

main_loader = importlib.util.find_spec("main")

if main_loader is not None:
  try: 
    from main import generate
    blocks = generate();
    with open("./scene/dist/assets/pyBlockData.txt", "w") as f:
      f.write(json.dumps(blocks))
  except:
    print("\nERROR: The `generate` function wasn't found in `main.py`\n")
else:
  print("\nERROR: `main.py` file not found\n")

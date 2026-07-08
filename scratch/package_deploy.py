import os
import shutil
import zipfile
import subprocess

client_dir = "dist/client"
shell_path = os.path.join(client_dir, "_shell.html")
index_path = os.path.join(client_dir, "index.html")

print("1. Copying _shell.html to index.html...")
if os.path.exists(shell_path):
    shutil.copyfile(shell_path, index_path)
    print("Successfully copied _shell.html to index.html")
else:
    print("Error: _shell.html not found!")
    exit(1)

print("2. Running fix-paths.js...")
result = subprocess.run(["node", "scripts/fix-paths.js"], capture_output=True, text=True)
print("Output:", result.stdout)
if result.stderr:
    print("Error:", result.stderr)

print("3. Packaging frontend-deploy.zip...")
zip_filename = "frontend-deploy.zip"

if os.path.exists(zip_filename):
    os.remove(zip_filename)

with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(client_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, client_dir)
            zipf.write(file_path, arcname)

print(f"Successfully packaged {zip_filename}!")

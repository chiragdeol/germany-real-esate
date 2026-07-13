import os
from PIL import Image

image_path = r"C:\Users\Boxinall\Downloads\european-deal-connect-main (1)\european-deal-connect-main\src\assets\logo-full.png"

if not os.path.exists(image_path):
    print("Logo file does not exist")
    exit()

try:
    img = Image.open(image_path)
    img = img.convert("RGBA")
    # Get colors
    colors = img.getcolors(1000000) # (count, (r, g, b, a))
    
    # Filter out transparent or near-transparent colors
    visible_colors = [c for c in colors if c[1][3] > 50]
    visible_colors.sort(key=lambda x: x[0], reverse=True)
    
    print("Top 10 visible colors:")
    for count, rgba in visible_colors[:20]:
        r, g, b, a = rgba
        hex_color = f"#{r:02x}{g:02x}{b:02x}"
        print(f"Count: {count}, RGBA: {rgba}, HEX: {hex_color}")
except Exception as e:
    print("Error:", e)

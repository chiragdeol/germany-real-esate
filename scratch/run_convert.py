import numpy as np

def rgb_to_xyz(rgb):
    # sRGB to XYZ
    rgb = np.array(rgb) / 255.0
    mask = rgb > 0.04045
    rgb[mask] = ((rgb[mask] + 0.055) / 1.055) ** 2.4
    rgb[~mask] = rgb[~mask] / 12.92
    
    # Transformation matrix for D65
    M = np.array([
        [0.4124564, 0.3575761, 0.1804375],
        [0.2126729, 0.7151522, 0.0721750],
        [0.0193339, 0.1191920, 0.9503041]
    ])
    return np.dot(M, rgb)

def xyz_to_oklab(xyz):
    # D65 to Oklab
    M1 = np.array([
        [0.8189330101, 0.3670694505, 0.0261997325],
        [0.0329845436, 0.9293118715, 0.0381461448],
        [0.0482003018, 0.1373509010, 0.3841630078]
    ])
    lms = np.dot(M1, xyz)
    lms_cubed = np.cbrt(lms)
    
    M2 = np.array([
        [0.2104542553, 0.7936177850, -0.0040720468],
        [1.9779984951, -2.4285922050, 0.4505937099],
        [0.0259040371, 0.7827717662, -0.8086757660]
    ])
    return np.dot(M2, lms_cubed)

def oklab_to_oklch(lab):
    L, a, b = lab
    C = np.sqrt(a**2 + b**2)
    h = np.arctan2(b, a) * 180 / np.pi
    if h < 0:
        h += 360
    return L, C, h

# Convert logo colors
navy_rgb = [4, 27, 51]
teal_rgb = [0, 211, 124]

navy_oklch = oklab_to_oklch(xyz_to_oklab(rgb_to_xyz(navy_rgb)))
teal_oklch = oklab_to_oklch(xyz_to_oklab(rgb_to_xyz(teal_rgb)))

print(f"Navy oklch: {navy_oklch[0]:.4f} {navy_oklch[1]:.4f} {navy_oklch[2]:.4f}")
print(f"Teal oklch: {teal_oklch[0]:.4f} {teal_oklch[1]:.4f} {teal_oklch[2]:.4f}")

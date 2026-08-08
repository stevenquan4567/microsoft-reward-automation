import zlib
import struct
import math

def clamp(val):
    return max(0, min(255, int(val)))

def make_png(width, height, pixel_func):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter type 0
        for x in range(width):
            r, g, b, a = pixel_func(x, y, width, height)
            raw_data.extend([clamp(r), clamp(g), clamp(b), clamp(a)])
            
    compressed = zlib.compress(raw_data, level=9)
    
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr)
    png.extend(struct.pack('>I', len(ihdr)) + b'IHDR' + ihdr + struct.pack('>I', ihdr_crc))
    
    # IDAT
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png.extend(struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc))
    
    # IEND
    iend_crc = zlib.crc32(b'IEND')
    png.extend(struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc))
    
    return bytes(png)

def render_icon(x, y, w, h):
    nx = (x / (w - 1) if w > 1 else 0.5) * 2 - 1
    ny = (y / (h - 1) if h > 1 else 0.5) * 2 - 1
    dist = math.sqrt(nx * nx + ny * ny)
    
    # Rounded box boundary
    box_d = max(abs(nx), abs(ny))
    if abs(nx) > 0.65 and abs(ny) > 0.65:
        corner_d = math.sqrt((abs(nx)-0.65)**2 + (abs(ny)-0.65)**2)
        if corner_d > 0.33:
            return (0, 0, 0, 0)
            
    # Border cyan glow
    if box_d > 0.86:
        alpha = 255 * (1 - (box_d - 0.86) / 0.14)
        return (0, 242, 254, alpha)
        
    # High-tech Bolt emblem in center
    # Triangle 1 (top-right to center)
    is_bolt = False
    if ny <= 0.05 and ny >= -0.65 and nx >= -0.3 and nx <= 0.35:
        if ny >= -0.65 + ((nx + 0.1) * 1.5):
            is_bolt = True
    if ny >= -0.05 and ny <= 0.65 and nx >= -0.35 and nx <= 0.3:
        if ny <= 0.65 + ((nx - 0.1) * 1.5):
            is_bolt = True

    if is_bolt:
        t = (ny + 0.65) / 1.3
        r = 0 + (168 - 0) * t
        g = 242 + (85 - 242) * t
        b = 254 + (247 - 254) * t
        return (r, g, b, 255)
        
    # Background gradient: #0b1329 to #1e1b4b
    t_bg = (ny + 1) / 2
    bg_r = 11 + (30 - 11) * t_bg
    bg_g = 19 + (27 - 19) * t_bg
    bg_b = 41 + (75 - 41) * t_bg
    
    # Inner subtle radial glow
    glow = max(0.0, 1.0 - dist * 1.1)
    bg_r += 15 * glow
    bg_g += 35 * glow
    bg_b += 65 * glow
    
    return (bg_r, bg_g, bg_b, 255)

for size in [16, 48, 128]:
    data = make_png(size, size, render_icon)
    with open(f'assets/icon{size}.png', 'wb') as f:
        f.write(data)
    print(f'Generated assets/icon{size}.png ({len(data)} bytes)')

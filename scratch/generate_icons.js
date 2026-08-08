const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper to create uncompressed PNG buffer in pure Node.js
function createPng(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 2; // Truecolor (RGB)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw Image Data (with filter byte 0 at start of each scanline)
  const lineLength = width * 3 + 1;
  const rawData = Buffer.alloc(height * lineLength);

  for (let y = 0; y < height; y++) {
    const lineStart = y * lineLength;
    rawData[lineStart] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const idx = lineStart + 1 + x * 3;
      // Draw rounded gradient badge effect
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < width * 0.45) {
        // Inner logo color (Golden Yellow #FFB900)
        rawData[idx] = 255;
        rawData[idx + 1] = 185;
        rawData[idx + 2] = 0;
      } else {
        // Background gradient (Teal #008080 to Dark Blue #0F172A)
        rawData[idx] = Math.max(0, Math.min(255, r + Math.floor(x * 10 / width)));
        rawData[idx + 1] = Math.max(0, Math.min(255, g + Math.floor(y * 20 / height)));
        rawData[idx + 2] = b;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(path.join(assetsDir, 'icon16.png'), createPng(16, 16, 15, 118, 110));
fs.writeFileSync(path.join(assetsDir, 'icon48.png'), createPng(48, 48, 15, 118, 110));
fs.writeFileSync(path.join(assetsDir, 'icon128.png'), createPng(128, 128, 15, 118, 110));

console.log('Successfully generated PNG icons in assets/!');

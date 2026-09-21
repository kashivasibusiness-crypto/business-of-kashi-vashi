const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const rootDir = path.resolve(__dirname, '..');
const logoPath = path.join(rootDir, 'src', 'assets', 'logo.png');

const buf = fs.readFileSync(logoPath);

// Parse PNG chunks
let offset = 8;
let idatChunks = [];
let ihdr = null;

while (offset < buf.length) {
  const length = buf.readUInt32BE(offset);
  const type = buf.slice(offset + 4, offset + 8).toString('ascii');
  const data = buf.slice(offset + 8, offset + 8 + length);
  if (type === 'IHDR') ihdr = data;
  if (type === 'IDAT') idatChunks.push(data);
  offset += 12 + length;
}

const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const bpp = 4;

console.log(`Original logo: ${width}x${height}`);

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const pixels = Buffer.alloc(width * height * bpp);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

// Defilter raw scanlines to standard RGBA pixels
for (let y = 0; y < height; y++) {
  const filter = raw[y * (1 + width * bpp)];
  for (let x = 0; x < width * bpp; x++) {
    const rawVal = raw[y * (1 + width * bpp) + 1 + x];
    const a = x >= bpp ? pixels[y * width * bpp + x - bpp] : 0;
    const b = y > 0 ? pixels[(y - 1) * width * bpp + x] : 0;
    const c = (x >= bpp && y > 0) ? pixels[(y - 1) * width * bpp + x - bpp] : 0;
    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + a) & 0xff;
    else if (filter === 2) val = (rawVal + b) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) val = (rawVal + paethPredictor(a, b, c)) & 0xff;
    pixels[y * width * bpp + x] = val;
  }
}

// Background color from top-left pixel
const bgR = pixels[0]; // 249
const bgG = pixels[1]; // 248
const bgB = pixels[2]; // 237
const bgA = pixels[3]; // 255

console.log(`Background color RGBA: (${bgR}, ${bgG}, ${bgB}, ${bgA})`);

// Rows 64 to 95: Clean residual micro-text ("BANARAS YATRA TRAVEL & TOURS")
// Replace rows >= 64 with the pure background color
for (let y = 64; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = (y * width + x) * bpp;
    pixels[p] = bgR;
    pixels[p + 1] = bgG;
    pixels[p + 2] = bgB;
    pixels[p + 3] = bgA;
  }
}

// Re-encode to PNG format with filter type 0 (None) for all scanlines
const scanlines = Buffer.alloc(height * (1 + width * bpp));
for (let y = 0; y < height; y++) {
  scanlines[y * (1 + width * bpp)] = 0; // Filter None
  pixels.copy(scanlines, y * (1 + width * bpp) + 1, y * width * bpp, (y + 1) * width * bpp);
}

const deflated = zlib.deflateSync(scanlines);

// CRC32 table & calculation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function calcCrc(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(typeStr, dataBuf) {
  const typeBuf = Buffer.from(typeStr, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(dataBuf.length, 0);
  const crcInput = Buffer.concat([typeBuf, dataBuf]);
  const crcVal = calcCrc(crcInput);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([lenBuf, typeBuf, dataBuf, crcBuf]);
}

const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdrChunk = makeChunk('IHDR', ihdr);
const idatChunk = makeChunk('IDAT', deflated);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);

// Overwrite src/assets/logo.png and sync to public assets
fs.writeFileSync(logoPath, finalPng);
console.log(`Updated ${logoPath} (${finalPng.length} bytes)`);

const publicLogo = path.join(rootDir, 'public', 'logo.png');
const publicFaviconPng = path.join(rootDir, 'public', 'favicon.png');
const publicFaviconIco = path.join(rootDir, 'public', 'favicon.ico');

fs.writeFileSync(publicLogo, finalPng);
fs.writeFileSync(publicFaviconPng, finalPng);
fs.writeFileSync(publicFaviconIco, finalPng);

console.log('Successfully synced cleaned logo to public/logo.png, public/favicon.png, and public/favicon.ico');

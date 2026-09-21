const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const rootDir = path.resolve(__dirname, '..');
const brandDir = path.join(rootDir, 'src', 'assets', 'brand');
const iconsDir = path.join(brandDir, 'icons');
fs.mkdirSync(iconsDir, { recursive: true });

function decodePNG(filePath) {
    const buf = fs.readFileSync(filePath);
    let offset = 8, ihdr, idats = [];
    while (offset < buf.length) {
        const len = buf.readUInt32BE(offset);
        const type = buf.slice(offset + 4, offset + 8).toString('ascii');
        if (type === 'IHDR') ihdr = buf.slice(offset + 8, offset + 8 + len);
        if (type === 'IDAT') idats.push(buf.slice(offset + 8, offset + 8 + len));
        offset += 12 + len;
    }
    const w = ihdr.readUInt32BE(0);
    const h = ihdr.readUInt32BE(4);
    const colorType = ihdr[9]; // 2 = RGB, 6 = RGBA
    const bpp = colorType === 6 ? 4 : 3;
    const raw = zlib.inflateSync(Buffer.concat(idats));
    const pixels = Buffer.alloc(w * h * bpp);

    function paeth(a, b, c) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        return (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
    }

    for (let y = 0; y < h; y++) {
        const filter = raw[y * (1 + w * bpp)];
        for (let x = 0; x < w * bpp; x++) {
            const rawVal = raw[y * (1 + w * bpp) + 1 + x];
            const a = x >= bpp ? pixels[y * w * bpp + x - bpp] : 0;
            const b = y > 0 ? pixels[(y - 1) * w * bpp + x] : 0;
            const c = (x >= bpp && y > 0) ? pixels[(y - 1) * w * bpp + x - bpp] : 0;
            let val = 0;
            if (filter === 0) val = rawVal;
            else if (filter === 1) val = (rawVal + a) & 0xff;
            else if (filter === 2) val = (rawVal + b) & 0xff;
            else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
            else if (filter === 4) val = (rawVal + paeth(a, b, c)) & 0xff;
            pixels[y * w * bpp + x] = val;
        }
    }
    return { w, h, bpp, pixels };
}

// CRC32 table
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

function encodeRGBAtoPNG(w, h, rgbaPixels) {
    const bpp = 4;
    const scanlines = Buffer.alloc(h * (1 + w * bpp));
    for (let y = 0; y < h; y++) {
        scanlines[y * (1 + w * bpp)] = 0; // Filter 0 (None)
        rgbaPixels.copy(scanlines, y * (1 + w * bpp) + 1, y * w * bpp, (y + 1) * w * bpp);
    }
    const deflated = zlib.deflateSync(scanlines, { level: 9 });

    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0);
    ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8; // Bit depth
    ihdr[9] = 6; // RGBA
    ihdr[10] = 0; // Compression
    ihdr[11] = 0; // Filter
    ihdr[12] = 0; // Interlace

    const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const ihdrChunk = makeChunk('IHDR', ihdr);
    const idatChunk = makeChunk('IDAT', deflated);
    const iendChunk = makeChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
}

function crop(src, x0, y0, cw, ch) {
    const dst = Buffer.alloc(cw * ch * 4);
    for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
            const srcX = x0 + x;
            const srcY = y0 + y;
            const dstIdx = (y * cw + x) * 4;
            if (srcX >= 0 && srcX < src.w && srcY >= 0 && srcY < src.h) {
                const srcIdx = (srcY * src.w + srcX) * src.bpp;
                dst[dstIdx] = src.pixels[srcIdx];
                dst[dstIdx + 1] = src.pixels[srcIdx + 1];
                dst[dstIdx + 2] = src.pixels[srcIdx + 2];
                dst[dstIdx + 3] = src.bpp === 4 ? src.pixels[srcIdx + 3] : 255;
            } else {
                dst[dstIdx + 3] = 0;
            }
        }
    }
    return { w: cw, h: ch, bpp: 4, pixels: dst };
}

function resize(src, targetW, targetH) {
    const dst = Buffer.alloc(targetW * targetH * 4);
    const xRatio = src.w / targetW;
    const yRatio = src.h / targetH;
    for (let y = 0; y < targetH; y++) {
        for (let x = 0; x < targetW; x++) {
            const srcX = Math.min(src.w - 1, Math.floor(x * xRatio));
            const srcY = Math.min(src.h - 1, Math.floor(y * yRatio));
            const srcIdx = (srcY * src.w + srcX) * src.bpp;
            const dstIdx = (y * targetW + x) * 4;
            dst[dstIdx] = src.pixels[srcIdx];
            dst[dstIdx + 1] = src.pixels[srcIdx + 1];
            dst[dstIdx + 2] = src.pixels[srcIdx + 2];
            dst[dstIdx + 3] = src.bpp === 4 ? src.pixels[srcIdx + 3] : 255;
        }
    }
    return { w: targetW, h: targetH, bpp: 4, pixels: dst };
}

console.log('🔄 [1/6] Processing Master Emblem (logo-main.png)...');
const master = decodePNG(path.join(brandDir, 'logo-main.png'));
// Create circular transparent version: outside the outer circle, alpha = 0 (trident tip preserved)
const transparentPixels = Buffer.alloc(master.w * master.h * 4);
const cx = master.w / 2;
const cy = master.h / 2;
// Outer circle radius is ~448px. Trident tip extends upwards to y ~ 26 (around center x)
for (let y = 0; y < master.h; y++) {
    for (let x = 0; x < master.w; x++) {
        const srcIdx = (y * master.w + x) * master.bpp;
        const dstIdx = (y * master.w + x) * 4;
        const r = master.pixels[srcIdx];
        const g = master.pixels[srcIdx + 1];
        const b = master.pixels[srcIdx + 2];

        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const isTridentZone = Math.abs(x - cx) < 95 && y < cy;
        const maxR = isTridentZone ? 490 : 448;

        const isBackground = r > 220 && g > 215 && b > 200;
        let alpha = 255;
        if (y < 28) {
            alpha = 0; // Clear anything above the trident tip
        } else if (y < 75 && isBackground) {
            alpha = 0; // Clear faint background box around top of trident
        } else if (dist > maxR + 2) {
            if (isBackground) alpha = 0;
        } else if (dist > maxR - 2) {
            const t = (dist - (maxR - 2)) / 4;
            if (isBackground) alpha = Math.round(255 * (1 - t));
        }

        // Clean up corners
        if (dist > 448 && isBackground) {
            alpha = 0;
        }

        transparentPixels[dstIdx] = r;
        transparentPixels[dstIdx + 1] = g;
        transparentPixels[dstIdx + 2] = b;
        transparentPixels[dstIdx + 3] = alpha;
    }
}

const transparentPng = encodeRGBAtoPNG(master.w, master.h, transparentPixels);
fs.writeFileSync(path.join(brandDir, 'kashi-vashi-emblem-transparent.png'), transparentPng);
fs.writeFileSync(path.join(brandDir, 'logo-main.png'), transparentPng);
fs.writeFileSync(path.join(rootDir, 'src', 'assets', 'logo.png'), transparentPng);
fs.writeFileSync(path.join(rootDir, 'public', 'logo.png'), transparentPng);
console.log('  ✅ Saved src/assets/logo.png & public/logo.png (1013x1013)');

console.log('🔄 [2/6] Processing Horizontal Dark & Light Logos...');
const variations = decodePNG(path.join(brandDir, 'media_1789374641498.png'));

// Crop Horizontal Logo (Dark): y=177 to 289, x=8 to 406 (w=398, h=112)
const darkBanner = crop(variations, 8, 177, 398, 112);
fs.writeFileSync(path.join(brandDir, 'logo-horizontal-dark.png'), encodeRGBAtoPNG(darkBanner.w, darkBanner.h, darkBanner.pixels));
console.log('  ✅ Saved src/assets/brand/logo-horizontal-dark.png (398x112)');

// Crop Horizontal Logo (Light): y=30 to 154, x=8 to 406 (w=398, h=124)
const lightBanner = crop(variations, 8, 30, 398, 124);
fs.writeFileSync(path.join(brandDir, 'logo-horizontal-light.png'), encodeRGBAtoPNG(lightBanner.w, lightBanner.h, lightBanner.pixels));
console.log('  ✅ Saved src/assets/brand/logo-horizontal-light.png (398x124)');

// Crop Compact Logo: y=318 to 430, x=122 to 256
const compactLogo = crop(variations, 122, 318, 134, 112);
fs.writeFileSync(path.join(brandDir, 'logo-compact.png'), encodeRGBAtoPNG(compactLogo.w, compactLogo.h, compactLogo.pixels));

// Crop Icon Only: y=318 to 430, x=15 to 110
const iconCircle = crop(variations, 15, 318, 95, 95);
fs.writeFileSync(path.join(brandDir, 'logo-icon-circle.png'), encodeRGBAtoPNG(iconCircle.w, iconCircle.h, iconCircle.pixels));

console.log('🔄 [3/6] Processing App Icon...');
const appIconSheet = decodePNG(path.join(brandDir, 'media_1789374621945.png'));
// Squircle is at x=12, y=73, w=164, h=165
const appIconCropped = crop(appIconSheet, 12, 73, 164, 165);
const appIcon180 = resize(appIconCropped, 180, 180);
fs.writeFileSync(path.join(brandDir, 'app-icon.png'), encodeRGBAtoPNG(appIconCropped.w, appIconCropped.h, appIconCropped.pixels));
fs.writeFileSync(path.join(rootDir, 'public', 'apple-touch-icon.png'), encodeRGBAtoPNG(180, 180, appIcon180.pixels));
console.log('  ✅ Saved public/apple-touch-icon.png (180x180)');

console.log('🔄 [4/6] Processing Favicon...');
const faviconSheet = decodePNG(path.join(brandDir, 'media_1789374612955.png'));
// Top large icon card is at x=30, y=50, w=162, h=162
const faviconCropped = crop(faviconSheet, 30, 50, 162, 162);
const fav64 = resize(faviconCropped, 64, 64);
const fav32 = resize(faviconCropped, 32, 32);
const favPng = encodeRGBAtoPNG(64, 64, fav64.pixels);
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.png'), favPng);
fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), favPng); // Modern browsers support PNG inside favicon
console.log('  ✅ Saved public/favicon.png & public/favicon.ico');

console.log('🔄 [5/6] Processing 10 Website Icons...');
const iconsSheet = decodePNG(path.join(brandDir, 'media_1789374654953.png'));
// Width: 362, Height: 259
// Row 1: Home, Tours, Stay, Transport, Puja & Rituals (y: ~48 to 125)
// Row 2: Guide, Blog, Gallery, Contact, Support (y: ~140 to 220)
const colWidth = Math.floor(iconsSheet.w / 5); // ~72px
const iconNamesRow1 = ['home', 'tours', 'stay', 'transport', 'puja'];
const iconNamesRow2 = ['guide', 'blog', 'gallery', 'contact', 'support'];

iconNamesRow1.forEach((name, i) => {
    const x0 = i * colWidth + 6;
    const y0 = 45;
    const iconCrop = crop(iconsSheet, x0, y0, colWidth - 12, 75);
    fs.writeFileSync(path.join(iconsDir, `icon-${name}.png`), encodeRGBAtoPNG(iconCrop.w, iconCrop.h, iconCrop.pixels));
});

iconNamesRow2.forEach((name, i) => {
    const x0 = i * colWidth + 6;
    const y0 = 145;
    const iconCrop = crop(iconsSheet, x0, y0, colWidth - 12, 75);
    fs.writeFileSync(path.join(iconsDir, `icon-${name}.png`), encodeRGBAtoPNG(iconCrop.w, iconCrop.h, iconCrop.pixels));
});
console.log('  ✅ Extracted 10 website icons to src/assets/brand/icons/');

console.log('🔄 [6/6] Syncing dist assets...');
if (fs.existsSync(path.join(rootDir, 'dist'))) {
    fs.copyFileSync(path.join(rootDir, 'public', 'logo.png'), path.join(rootDir, 'dist', 'logo.png'));
    fs.copyFileSync(path.join(rootDir, 'public', 'favicon.png'), path.join(rootDir, 'dist', 'favicon.png'));
}
console.log('✨ Brand assets generation complete!');

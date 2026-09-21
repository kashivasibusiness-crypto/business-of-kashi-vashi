const fs = require('fs');
const zlib = require('zlib');

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

const { w, h, bpp, pixels } = decodePNG('src/assets/brand/logo-main.png');
console.log('Decoded logo-main.png:', w, 'x', h, 'bpp:', bpp);
const coords = [[10, 10], [50, 50], [950, 50], [50, 950], [950, 950]];
for (const [x, y] of coords) {
    const idx = (y * w + x) * bpp;
    console.log(`(${x}, ${y}) -> R:${pixels[idx]} G:${pixels[idx+1]} B:${pixels[idx+2]}`);
}

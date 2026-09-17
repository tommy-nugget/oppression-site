import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const out = 'public/images/brand/oppression-cross.png';

// Flat black background + white shape: use luminance directly as alpha
// (white -> opaque, black -> transparent), RGB forced to white.
const { data, info } = await sharp(src).grayscale().resize({ width: 600, withoutEnlargement: true }).raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const rgba = Buffer.alloc(width * height * 4);
for (let i = 0, p = 0; i < data.length; i++, p += 4) {
  const a = data[i];
  rgba[p] = 255; rgba[p + 1] = 255; rgba[p + 2] = 255; rgba[p + 3] = a;
}
await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(out);
console.log('wrote', out);

import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const outDir = path.dirname(src);

async function makeClean(sigma, threshold, suffix) {
  const { data, info } = await sharp(src)
    .grayscale()
    .threshold(128)
    .blur(sigma)
    .threshold(threshold)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  // build RGBA: white shape (255,255,255,255) where mask=255, black bg (0,0,0,255) elsewhere
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < data.length; i++, p += 4) {
    const v = data[i];
    rgba[p] = v; rgba[p + 1] = v; rgba[p + 2] = v; rgba[p + 3] = 255;
  }
  const out = path.join(outDir, `Oppression Cross - Clean${suffix}.png`);
  await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(out);
  console.log('wrote', out);
}

await makeClean(5, 90, ' v1 (sigma5-t90)');
await makeClean(7, 80, ' v2 (sigma7-t80)');
await makeClean(9, 70, ' v3 (sigma9-t70)');

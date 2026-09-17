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
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < data.length; i++, p += 4) {
    const v = data[i];
    rgba[p] = v; rgba[p + 1] = v; rgba[p + 2] = v; rgba[p + 3] = 255;
  }
  const out = path.join(outDir, `Oppression Cross - Clean${suffix}.png`);
  await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(out);
  console.log('wrote', out);
}

await makeClean(12, 60, ' v7 (sigma12-t60)');
await makeClean(15, 50, ' v8 (sigma15-t50)');
await makeClean(20, 40, ' v9 (sigma20-t40)');

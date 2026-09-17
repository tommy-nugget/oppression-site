import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const outDir = path.dirname(src);

async function makeClean(sigma, cutoff, suffix) {
  const { data, info } = await sharp(src)
    .grayscale()
    .threshold(128)
    .blur(sigma)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < data.length; i++, p += 4) {
    const v = data[i] >= cutoff ? 255 : 0; // manual hard binarize, no reliance on sharp threshold()
    rgba[p] = v; rgba[p + 1] = v; rgba[p + 2] = v; rgba[p + 3] = 255;
  }
  const out = path.join(outDir, `Oppression Cross - Clean${suffix}.png`);
  await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(out);

  // verify truly binary
  const check = await sharp(out).grayscale().raw().toBuffer();
  const vals = new Set();
  for (let i = 0; i < check.length; i += 11) vals.add(check[i]);
  console.log('wrote', out, '-- distinct values:', vals.size, Array.from(vals).slice(0, 5));
}

await makeClean(10, 60, ' v10 (sigma10-c60)');
await makeClean(14, 50, ' v11 (sigma14-c50)');
await makeClean(18, 45, ' v12 (sigma18-c45)');

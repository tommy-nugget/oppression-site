import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const outDir = path.dirname(src);

async function toBuffer(sharpInstance) {
  return sharpInstance.raw().toBuffer({ resolveWithObject: true });
}

async function morphClose(sigma, suffix) {
  // start: clean binary mask from the original
  const base = sharp(src).grayscale().threshold(128);
  const { data: baseData, info } = await toBuffer(base.clone());
  const { width, height } = info;

  function toSharp(buf) {
    return sharp(buf, { raw: { width, height, channels: 1 } });
  }

  // Dilate: blur then very low threshold (any nearby white wins)
  const { data: dilated } = await toBuffer(toSharp(baseData).blur(sigma).threshold(8));

  // Erode: blur the dilated result then very high threshold (must be almost fully white)
  const { data: closed } = await toBuffer(toSharp(dilated).blur(sigma).threshold(247));

  // final crisp binarize + composite white/black RGBA
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, p = 0; i < closed.length; i++, p += 4) {
    const v = closed[i] >= 128 ? 255 : 0;
    rgba[p] = v; rgba[p + 1] = v; rgba[p + 2] = v; rgba[p + 3] = 255;
  }
  const out = path.join(outDir, `Oppression Cross - Clean${suffix}.png`);
  await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(out);
  console.log('wrote', out);
}

await morphClose(6, ' v4 (close-sigma6)');
await morphClose(10, ' v5 (close-sigma10)');
await morphClose(14, ' v6 (close-sigma14)');

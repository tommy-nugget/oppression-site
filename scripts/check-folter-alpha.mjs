import sharp from 'sharp';
const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Folter Records - Logo White on Black - back removed.png';
const meta = await sharp(src).metadata();
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;
let minA = 255, maxA = 0;
const sample = new Set();
for (let i = 3; i < data.length; i += c * 37) {
  const a = data[i];
  if (a < minA) minA = a;
  if (a > maxA) maxA = a;
  sample.add(a);
}
console.log(JSON.stringify({ hasAlpha: meta.hasAlpha, w, h, minA, maxA, distinctSampled: sample.size }));

import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Pins - modified version.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

// check corner alpha + a histogram of alpha values
const corner = (data[(0 * w + 0) * c + 3]);
let minAlpha = 255, maxAlpha = 0;
let transparentCount = 0;
for (let i = 3; i < data.length; i += c) {
  const a = data[i];
  if (a < minAlpha) minAlpha = a;
  if (a > maxAlpha) maxAlpha = a;
  if (a < 250) transparentCount++;
}

// bbox of non-white AND alpha>0 content
const threshold = 235;
let minX = w, maxX = 0, minY = h, maxY = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * c;
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    const isBackground = a < 10 || (r > threshold && g > threshold && b > threshold);
    if (!isBackground) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(JSON.stringify({ w, h, cornerAlpha: corner, minAlpha, maxAlpha, transparentPixelCount: transparentCount, minX, maxX, minY, maxY, contentW: maxX - minX, contentH: maxY - minY }));

import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Pins - modified version 2.png';
const { data, info } = await sharp(src).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

const threshold = 235;
let minX = w, maxX = 0, minY = h, maxY = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * c;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (!(r > threshold && g > threshold && b > threshold)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(JSON.stringify({ w, h, minX, maxX, minY, maxY, contentW: maxX - minX, contentH: maxY - minY, centerX: (minX+maxX)/2, centerY: (minY+maxY)/2 }));

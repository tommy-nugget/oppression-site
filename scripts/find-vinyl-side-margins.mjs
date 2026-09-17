import sharp from 'sharp';

const files = [
  'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Vinyl - Black.jpg',
  'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Vinyl - marbled gold.jpg',
];

for (const f of files) {
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const colBrightness = [];
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = 0; y < h; y += 4) {
      const i = (y * w + x) * c;
      sum += data[i] + data[i + 1] + data[i + 2];
    }
    colBrightness.push(sum);
  }
  const threshold = Math.max(...colBrightness) * 0.03;
  let firstCol = 0;
  for (let x = 0; x < w; x++) { if (colBrightness[x] > threshold) { firstCol = x; break; } }
  let lastCol = w - 1;
  for (let x = w - 1; x >= 0; x--) { if (colBrightness[x] > threshold) { lastCol = x; break; } }
  console.log(f.split('\\').pop(), 'w', w, 'firstCol', firstCol, 'lastCol', lastCol, 'leftMarginPct', (firstCol/w*100).toFixed(1), 'rightMarginPct', ((w-1-lastCol)/w*100).toFixed(1));
}

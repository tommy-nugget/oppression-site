import sharp from 'sharp';

const files = [
  'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Vinyl - Black.jpg',
  'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Vinyl - marbled gold.jpg',
];

for (const f of files) {
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const rowBrightness = [];
  for (let y = 0; y < h; y++) {
    let sum = 0;
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * c;
      sum += data[i] + data[i + 1] + data[i + 2];
    }
    rowBrightness.push(sum);
  }
  const threshold = Math.max(...rowBrightness) * 0.02; // near-zero rows = pure black margin
  let firstContentRow = 0;
  for (let y = 0; y < h; y++) { if (rowBrightness[y] > threshold) { firstContentRow = y; break; } }
  let lastContentRow = h - 1;
  for (let y = h - 1; y >= 0; y--) { if (rowBrightness[y] > threshold) { lastContentRow = y; break; } }
  console.log(f.split('\\').pop(), 'h', h, 'firstContentRow', firstContentRow, 'lastContentRow', lastContentRow);
}

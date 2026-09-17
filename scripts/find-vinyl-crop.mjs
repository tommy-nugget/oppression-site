import sharp from 'sharp';

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, v];
}

const files = [
  'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Vinyl - Black.jpg',
  'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Vinyl - marbled gold.jpg',
];

for (const f of files) {
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  // For each row, count gold-ish pixels (the album cover's border/text uses a
  // consistent gold hue) to find the row where the cover artwork begins.
  const rowCounts = [];
  for (let y = 0; y < h; y++) {
    let count = 0;
    for (let x = 0; x < w; x += 2) {
      const i = (y * w + x) * c;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const [hue, s, v] = rgbToHsv(r, g, b);
      if (hue >= 30 && hue <= 55 && s > 0.35 && v > 0.35 && v < 0.95) count++;
    }
    rowCounts.push(count);
  }
  // find first row (after y=100, skipping the title text near the very top)
  // with a sustained band of gold pixels (the cover's gold border line)
  let borderRow = -1;
  for (let y = 250; y < h - 10; y++) {
    const windowSum = rowCounts.slice(y, y + 5).reduce((a, b) => a + b, 0);
    if (windowSum > 100) { borderRow = y; break; }
  }
  console.log(f.split('\\').pop(), 'w', w, 'h', h, 'firstGoldBorderRow~', borderRow);
}

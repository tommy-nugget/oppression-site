import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Pins.jpg';
const out = path.resolve('public/images/merch/pin.jpg');

// Tightest square crop that still fully contains the pin (measured bbox:
// x[195,988] y[115,697] in the 1200x833 source), centered on the pin.
await sharp(src)
  .extract({ left: 186, top: 0, width: 812, height: 812 })
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toFile(out);

console.log('cropped pin ->', out);

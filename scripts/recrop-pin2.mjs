import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Pins - modified version.png';
const out = path.resolve('public/images/merch/pin.jpg');

// Content bbox measured at x[300,1093] y[263,845] on the 1405x1170 source
// (center 696.5,554). Square crop sized so the pin fills ~94% of the frame,
// matching the target used for every other product photo.
await sharp(src)
  .flatten({ background: '#ffffff' })
  .extract({ left: 275, top: 132, width: 844, height: 844 })
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toFile(out);

console.log('cropped pin ->', out);

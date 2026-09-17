import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Pins - modified version 2.png';
const out = path.resolve('public/images/merch/pin.jpg');

await sharp(src)
  .flatten({ background: '#ffffff' })
  .extract({ left: 379, top: 250, width: 1008, height: 1008 })
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toFile(out);

console.log('cropped pin ->', out);

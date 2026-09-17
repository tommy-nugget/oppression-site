import sharp from 'sharp';
import path from 'node:path';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch\\Pins - modified version.png';
const out = path.resolve('public/images/merch/pin.jpg');

// Bigger square crop than last time (1080 vs 844) = more surrounding white
// kept = pin appears noticeably smaller, still a plain crop (no CSS scale
// tricks), so it behaves exactly like every other product photo.
await sharp(src)
  .flatten({ background: '#ffffff' })
  .extract({ left: 157, top: 14, width: 1080, height: 1080 })
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toFile(out);

console.log('cropped pin ->', out);

// One-off: resize + compress the Under the Black Sun Festival flyer (provisional version)
// into public/images/posters, following the same convention as the other posters.
import sharp from 'sharp';
import { rename } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\UTBS2027_Flyer.jpg';
const OUT_DIR = path.resolve('public/images/posters');
const OUT = path.join(OUT_DIR, 'under-the-black-sun-festival.jpg');
const TMP = OUT + '.tmp';
const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 85;

const meta = await sharp(SRC).metadata();
console.log('Source:', meta.width, 'x', meta.height, meta.format);

await sharp(SRC)
  .rotate()
  .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  .toFile(TMP);

await rename(TMP, OUT);

const outMeta = await sharp(OUT).metadata();
console.log('Output:', outMeta.width, 'x', outMeta.height, '->', OUT);

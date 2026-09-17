// One-off / reusable helper: resize + compress the members' live photos
// and drop them into public/images/members/live with clean filenames.
// Usage: node scripts/resize-member-live-photos.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Band Members live';
const OUT_DIR = path.resolve('public/images/members/live');
const MAX_DIMENSION = 1800;
const JPEG_QUALITY = 82;

const files = [
  ['Bio - G.S.V Live.jpg', 'gsv-live'],
  ['Bio - Tom L Live.jpg', 'tom-l-live'],
  ['Bio - Predark Live.jpg', 'predark-live'],
  ['Bio - Désert Live.jpg', 'desert-live'],
  ['Bio - John Live.jpg', 'john-live'],
];

await mkdir(OUT_DIR, { recursive: true });

for (const [srcName, slug] of files) {
  const srcPath = path.join(SOURCE_DIR, srcName);
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  await sharp(srcPath)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  console.log(`${srcName} -> ${slug}.jpg (${outMeta.width}x${outMeta.height})`);
}

console.log(`\nDone. ${files.length} images written to ${OUT_DIR}`);

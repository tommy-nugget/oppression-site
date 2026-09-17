// One-off / reusable helper: resize + compress source photos for the gallery
// and drop them into public/images/gallery with clean filenames.
// Usage: node scripts/resize-gallery-images.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\Website - Gallery';
const OUT_DIR = path.resolve('public/images/gallery');
const MAX_DIMENSION = 2400;
const JPEG_QUALITY = 82;

const files = [
  ['Band pic - church.jpg', 'promo-church'],
  ['Band pic - first one.jpg', 'promo-first-one'],
  ['Band pic - goat.png', 'promo-goat'],
  ['Band pic - torches.jpg', 'promo-torches'],
  ['Backstage - 1.jpeg', 'backstage-1'],
  ['Oppression Stage - 1.jpg', 'atmosphere-stage-1'],
  ['Oppression Stage - 2.jpg', 'atmosphere-stage-2'],
  ['Oppression Stage - 3.jpg', 'atmosphere-stage-3'],
  ['Salem - Residence 1.jpg', 'residence-1'],
  ['Salem - Residence 2.jpg', 'residence-2'],
  ['Salem - Residence 3.jpg', 'residence-3'],
  ['Salem - Residence 4.jpg', 'residence-4'],
  ['Salem - Residence 5.jpg', 'residence-5'],
  ['Salem - Residence 6.jpg', 'residence-6'],
  ...Array.from({ length: 11 }, (_, i) => [`Salem 2025 - ${i + 1}.jpg`, `salem-2025-${i + 1}`]),
  ...Array.from({ length: 5 }, (_, i) => [`Salem 2026 - ${i + 1}.jpg`, `salem-2026-${i + 1}`]),
  ...Array.from({ length: 4 }, (_, i) => [`Seisach 2025 - ${i + 1}.jpg`, `seisach-2025-${i + 1}`]),
  ...Array.from({ length: 5 }, (_, i) => [`Eriador Festival - ${i + 1}.jpg`, `eriador-festival-${i + 1}`]),
];

await mkdir(OUT_DIR, { recursive: true });

for (const [srcName, slug] of files) {
  const srcPath = path.join(SOURCE_DIR, srcName);
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const hasAlpha = !!meta.hasAlpha;
  const ext = hasAlpha ? 'png' : 'jpg';
  const outPath = path.join(OUT_DIR, `${slug}.${ext}`);

  let pipeline = img.rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: 'inside',
    withoutEnlargement: true,
  });
  pipeline = hasAlpha ? pipeline.png({ quality: 90 }) : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

  await pipeline.toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  console.log(`${srcName} -> ${slug}.${ext} (${outMeta.width}x${outMeta.height})`);
}

console.log(`\nDone. ${files.length} images written to ${OUT_DIR}`);

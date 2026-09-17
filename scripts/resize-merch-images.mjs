import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const srcDir = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch';
const outDir = path.resolve('public/images/merch');

fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  { src: 'Vinyl 1.png', out: 'vinyl-no-safe-place.jpg', width: 1400, quality: 88 },
  { src: 'T shirt - Main.jpg', out: 'tshirt-no-safe-place.jpg', width: 1000, quality: 85 },
  { src: 'T shirt - Round.jpg', out: 'tshirt-emblem.jpg', width: 1000, quality: 85 },
  { src: 'Patch - cut to shape.jpg', out: 'patch-shaped.jpg', width: 900, quality: 85 },
  { src: 'Patch - Rectangle.jpg', out: 'patch-rectangle.jpg', width: 900, quality: 85 },
  { src: 'Patch - Round.jpg', out: 'patch-round.jpg', width: 900, quality: 85 },
  { src: 'Pins.jpg', out: 'pin.jpg', width: 900, quality: 85 },
];

for (const job of jobs) {
  const srcPath = path.join(srcDir, job.src);
  const outPath = path.join(outDir, job.out);
  await sharp(srcPath)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .jpeg({ quality: job.quality })
    .toFile(outPath);
  console.log(`${job.src} -> ${outPath}`);
}

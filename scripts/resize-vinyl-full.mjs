import sharp from 'sharp';
import path from 'node:path';

const jobs = [
  { src: 'Vinyl - Black.jpg', out: 'vinyl-black.jpg' },
  { src: 'Vinyl - marbled gold.jpg', out: 'vinyl-marbled-gold.jpg' },
];
const srcDir = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.4 - Merch';
const outDir = path.resolve('public/images/merch');

for (const job of jobs) {
  await sharp(path.join(srcDir, job.src))
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, job.out));
  console.log(job.src, '->', job.out);
}

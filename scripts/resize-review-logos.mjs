// One-off / reusable helper: resize webzine logos and drop them into
// public/images/reviews with clean filenames.
// Usage: node scripts/resize-review-logos.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Logos Reviews';
const OUT_DIR = path.resolve('public/images/reviews');
const MAX_DIMENSION = 500;

const files = [
  ['Metal Factory Ch - Logo.jpg', 'metal-factory'],
  ['Thrashocore - Logo Square.jpg', 'thrashocore'],
  ['No Clean Singing - Logo Square.jpg', 'no-clean-singing'],
  ['Black Metal Zine - Logo Square.png', 'black-metal-zine'],
  ['Ammo Support the Underground - Logo Square.jpg', 'ammo-underground'],
  ['Metal Underground - Logo Square.jpg', 'metal-underground-at'],
  ['Zware Metalen - Logo Square.png', 'zware-metalen'],
  ['Vampster - Logo.png', 'vampster'],
  ['Earshot - Logo Square.jpg', 'earshot'],
];

await mkdir(OUT_DIR, { recursive: true });

for (const [srcName, slug] of files) {
  const srcPath = path.join(SOURCE_DIR, srcName);
  const ext = path.extname(srcName).toLowerCase();
  const outExt = ext === '.png' ? 'png' : 'jpg';
  const outPath = path.join(OUT_DIR, `${slug}.${outExt}`);

  let pipeline = sharp(srcPath).resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: 'inside',
    withoutEnlargement: true,
  });
  pipeline = outExt === 'png' ? pipeline.png({ quality: 90 }) : pipeline.jpeg({ quality: 85, mozjpeg: true });

  await pipeline.toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`${srcName} -> ${slug}.${outExt} (${meta.width}x${meta.height})`);
}

console.log(`\nDone. ${files.length} logos written to ${OUT_DIR}`);

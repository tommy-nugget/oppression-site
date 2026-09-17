import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.1 - Website - Gallery\\band pic - torches extended.jpg';
const out = 'public/images/gallery/promo-torches-extended.jpg';

await sharp(src)
  .rotate()
  .resize({ width: 2200, withoutEnlargement: true })
  .jpeg({ quality: 87 })
  .toFile(out);

console.log('wrote', out);

import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const out = 'public/images/brand/oppression-cross.png';

await sharp(src)
  .resize({ width: 300, withoutEnlargement: true })
  .png()
  .toFile(out);

console.log('wrote', out);

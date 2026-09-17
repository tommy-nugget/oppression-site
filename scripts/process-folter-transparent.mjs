import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Folter Records - Logo White on Black - back removed.png';
const out = 'public/images/brand/folter-records-transparent.png';

await sharp(src).png().toFile(out);
console.log('wrote', out);

import sharp from 'sharp';
await sharp('C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Folter Records - Logo White on Black - back removed.png')
  .flatten({ background: '#0b0b0a' })
  .toFile('scripts/_folter-preview.png');

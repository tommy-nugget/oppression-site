import sharp from 'sharp';
await sharp('public/images/brand/logo.png')
  .flatten({ background: '#0b0b0a' })
  .toFile('scripts/_logo-preview.png');

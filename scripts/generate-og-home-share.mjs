// Generates the social-share preview image (Open Graph / Twitter card) for the Home page:
// the band photo, cropped tighter on the faces, with the logo overlaid above the heads
// and a short "No Safe Place - Out Now" line overlaid below them.
import sharp from 'sharp';
import { readFile, rename } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_PHOTO = path.resolve('public/images/promo/band-outside.jpg');
const LOGO = path.resolve('public/images/brand/logo.png');
const FONT = path.resolve('scripts/_fonts/PlayfairDisplay-Italic500.ttf');
const OUT_DIR = path.resolve('public/images/og');
const OUT = path.join(OUT_DIR, 'home-share.jpg');
const TMP = OUT + '.tmp';

const WIDTH = 1200;
const HEIGHT = 630;

// Crop region on the 2400x1600 source: full width, trimmed top/bottom to focus
// on faces + a little canopy above, cutting the legs off the bottom.
const CROP = { left: 0, top: 80, width: 2400, height: 1260 };

const logoBuffer = await readFile(LOGO);
const logoBase64 = logoBuffer.toString('base64');
const LOGO_W = 330;
const LOGO_H = Math.round(LOGO_W * (1164 / 1600));
const LOGO_X = Math.round((WIDTH - LOGO_W) / 2);
const LOGO_Y = 55;

const fontBuffer = await readFile(FONT);
const fontBase64 = fontBuffer.toString('base64');

// Matches .hero-album-caption on the Home page: Playfair Display italic 500,
// uppercase, wide tracking, muted ink colour.
const CAPTION_FONT_SIZE = 34;
const CAPTION_LETTER_SPACING = CAPTION_FONT_SIZE * 0.4;

const overlaySvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Playfair Display';
        font-style: italic;
        font-weight: 500;
        src: url(data:font/ttf;base64,${fontBase64}) format('truetype');
      }
    </style>
    <linearGradient id="topScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.72" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="bottomScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.85" />
    </linearGradient>
    <filter id="captionShadow" x="-20%" y="-50%" width="140%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>
  <rect x="0" y="0" width="${WIDTH}" height="210" fill="url(#topScrim)" />
  <rect x="0" y="370" width="${WIDTH}" height="260" fill="url(#bottomScrim)" />
  <image x="${LOGO_X}" y="${LOGO_Y}" width="${LOGO_W}" height="${LOGO_H}" href="data:image/png;base64,${logoBase64}" />
  <text
    x="${WIDTH / 2}"
    y="565"
    text-anchor="middle"
    font-family="Playfair Display"
    font-style="italic"
    font-weight="500"
    font-size="${CAPTION_FONT_SIZE}"
    letter-spacing="${CAPTION_LETTER_SPACING}"
    fill="#d8b878"
    filter="url(#captionShadow)"
  >NO SAFE PLACE — OUT NOW</text>
</svg>
`;

await sharp(SOURCE_PHOTO)
  .extract(CROP)
  .resize(WIDTH, HEIGHT)
  .composite([{ input: Buffer.from(overlaySvg) }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(TMP);

await rename(TMP, OUT);
console.log('Written', OUT);

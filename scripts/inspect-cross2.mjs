import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const { data, info } = await sharp(src).grayscale().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

const hist = new Array(256).fill(0);
for (let i = 0; i < data.length; i += c) hist[data[i]]++;
// print a compact summary: how many pixels are near-black, near-white, mid-gray
let black = 0, white = 0, mid = 0;
for (let v = 0; v < 256; v++) {
  if (v < 40) black += hist[v];
  else if (v > 215) white += hist[v];
  else mid += hist[v];
}
console.log({ w, h, black, white, mid, total: w * h });

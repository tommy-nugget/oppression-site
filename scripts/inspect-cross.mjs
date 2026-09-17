import sharp from 'sharp';

const src = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

function px(x, y) {
  const i = (y * w + x) * c;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
}
console.log('corner(0,0)', px(0, 0));
console.log('corner(w-1,0)', px(w - 1, 0));
console.log('center', px(Math.floor(w / 2), Math.floor(h / 2)));

// histogram of alpha values
let alphaSet = new Set();
for (let i = 3; i < data.length; i += 4 * 97) alphaSet.add(data[i]);
console.log('sample alpha values', Array.from(alphaSet).slice(0, 10));

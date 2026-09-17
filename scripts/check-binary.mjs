import sharp from 'sharp';

const f = 'C:\\Users\\Utilisateur\\Downloads\\1 - OPPRESSION\\8 - Website\\8.2 - Pictures\\Oppression Cross - Clean v7 (sigma12-t60).png';
const { data, info } = await sharp(f).grayscale().raw().toBuffer({ resolveWithObject: true });
const vals = new Set();
for (let i = 0; i < data.length; i += 7) vals.add(data[i]);
console.log('distinct sampled values:', vals.size, Array.from(vals).sort((a,b)=>a-b).slice(0,20));

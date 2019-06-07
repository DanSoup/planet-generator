import cellularAutomata from './functions/cellularAutomata.js';
import generateNoise from './functions/generateNoise.js';
import lowerRes from './functions/lowerRes.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000000FF';
// ctx.fillRect(1, 1, 1, 1);

let image = generateNoise(256, 256, [0, 0, 0]);
image = lowerRes(image, 32)

const initialSeed = [];

image.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell) ctx.fillRect(x, y, 1, 1);
  });
});

// let post30 = cellularAutomata(initialSeed, 200 + variant[0], ['100', '011', '010', '001'])
// let post90 = cellularAutomata(post30, 200 + variant[1], ['100', '110', '001', '011'])

// for (let y = 0; y < 256; y++) {

//   post90.forEach((bin, x) => {
//     const lx = (x + 255) % 256;
//     const rx = (x + 1) % 256;
//     const blur = (post90[lx] + post90[x] + post90[rx]) / 3;
//     const color = (255 - Math.floor(blur * 255)).toString(16).padStart(2, '0');
//     ctx.fillStyle = `#${color}${color}${color}FF`;
//     ctx.fillRect(x, y, 1, 1);
//   });

//   post90 = cellularAutomata(post90, 10 + variant[2], ['100', '011', '010', '001']);

// }

// console.log(post30);
// console.log(post90);
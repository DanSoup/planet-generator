// import cellularAutomata from './functions/cellularAutomata.js';
// import generateNoise from './functions/generateNoise.js';
// import lowerRes from './functions/lowerRes.js';
// import blur from './functions/blur.js';
import writeText from './functions/writeText.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000000FF';
// ctx.fillRect(1, 1, 1, 1);

// let image = equalize(generateTurbulance(256, 256, [0, 0, 0], 10));
const oldImage = [];
for (let y = 0; y < 256; y++) {
  oldImage[y] = [];
  for (let x = 0; x < 256; x++) {
    oldImage[y][x] = 0;
  };
};

let image = writeText('hello');

image.forEach((row, y) => {
  row.forEach((cell, x) => {
    console.log(cell)
    if (cell === 1) {
      ctx.fillStyle = '#000000ff';
      ctx.fillRect(x, y, 1, 1);
    };
  });
});
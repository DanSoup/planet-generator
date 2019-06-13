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

let image = writeText('abcdefghijk');

image.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === 1) {
      ctx.fillStyle = '#000000ff';
      ctx.fillRect(x * 4, y * 4, 4, 4);
    };
  });
});

image = writeText('lmnopqrstu');

image.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === 1) {
      ctx.fillStyle = '#000000ff';
      ctx.fillRect(x * 4, y * 4 + 40, 4, 4);
    };
  });
});

image = writeText('vwxyz a bag');

image.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === 1) {
      ctx.fillStyle = '#000000ff';
      ctx.fillRect(x * 4, y * 4 + 80, 4, 4);
    };
  });
});
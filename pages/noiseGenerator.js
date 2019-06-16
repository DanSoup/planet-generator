// import cellularAutomata from './functions/cellularAutomata.js';
// import generateNoise from './functions/generateNoise.js';
// import lowerRes from './functions/lowerRes.js';
// import blur from './functions/blur.js';
import generateTurbulance from './functions/generateTurbulance.js';
import equalize from  './functions/equalize.js';
import waveGenerator from './functions/waveGenerator.js';
import generateSpiral from './functions/generateSpiral.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000000FF';
// ctx.fillRect(1, 1, 1, 1);

let image = equalize(generateSpiral(256, 256));
// let image = waveGenerator(256, 256);

console.log(image)

image.forEach((row, y) => {
  row.forEach((cell, x) => {
    const color = Math.floor(cell * 255).toString(16).padStart(2, '0');
    ctx.fillStyle = `#${color}${color}${color}ff`;
    ctx.fillRect(x, y, 1, 1);
  });
});
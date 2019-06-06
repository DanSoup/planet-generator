import cellularAutomata from './functions/cellularAutomata.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000000FF';
// ctx.fillRect(1, 1, 1, 1);

const variant = [63, 63, 0];

const initialSeed = [];

for (let i = 0; i < 257; i++) initialSeed[i] = 0;
initialSeed[0] = 1;
initialSeed[10] = 1;


let post30 = cellularAutomata(initialSeed, 200 + variant[0], ['100', '011', '010', '001'])
let post90 = cellularAutomata(post30, 200 + variant[1], ['100', '110', '001', '011'])

for (let y = 0; y < 256; y++) {

  post90.forEach((bin, x) => {if (bin) ctx.fillRect(x, y, 1, 1)});
  post90 = cellularAutomata(post90, 10 + variant[2], ['100', '011', '010', '001'])

}

// console.log(post30);
// console.log(post90);
import cellularAutomata from './cellularAutomata.js';

const generateNoise = (width = 256, height = 256, variant) => {

  let po2 = false;

  if (Math.log2(width) % 1 === 0) {
    po2 = true;
    width++;
  }

  const noiseArray = [];

  const initialSeed = [];
  for (let i = 0; i < width; i++) initialSeed[i] = 0;
  initialSeed[0] = 1;


  let post30 = cellularAutomata(initialSeed, width + 100 + variant[0], ['100', '011', '010', '001'])
  let post90 = cellularAutomata(post30, 100 + variant[1], ['100', '110', '001', '011'])
  let post150 = cellularAutomata(post90, 100 + variant[2], ['111', '100', '010', '001'])

  let currentGen = [...post150];

  for (let y = 0; y < height; y++) {
    noiseArray[y] = [...currentGen]
    currentGen = cellularAutomata(currentGen, 10, ['100', '011', '010', '001'])
  }

  if (po2) {
    return noiseArray.map(row => row.slice(0, width - 1));
  } else return noiseArray;

}

export default generateNoise;
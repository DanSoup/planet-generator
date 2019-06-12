import generateTurbulance from './generateTurbulance.js';
import equalize from  './equalize.js';
import blur from './blur.js';

const waveGenerator = (width, height, vars) => {
  
  const image = [];

  const distortion = blur(generateTurbulance(width, height, [0, 0, 0], 5), 2);

  for (let y = 0; y < height; y++) {
    image[y] = [];
    for (let x = 0; x < width; x++) {
      const frequency = 20.5;
      const pointDistortion = 0.5 * distortion[y][x];
      const neutralValue = y / height;
      image[y][x] = Math.cos((neutralValue + pointDistortion) * 2 * Math.PI * frequency)
    };
  };

  return equalize(image);

};

export default waveGenerator;
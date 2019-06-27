import generateNoise from './generateNoise.js';
import lowerRes from './lowerRes.js';
import blur from './blur.js';

const generateTurbulance = (width = 256, height = 256, variance = [0, 0, 0], turbLevels, time) => {

  let image = generateNoise(width, height, variance);

  const turbulantImages = [image]

  for (let i = 0; i < turbLevels; i++) {
    turbulantImages[i + 1] = blur(lowerRes(turbulantImages[i], 2 ** (i + 1)), 2 ** (i + 1))
  };

  const finalTurbulantImage = [];

  for (let y = 0; y < height; y++) {
    finalTurbulantImage[y] = [];
    for (let x = 0; x < width; x++) {
      let color = 0;
      turbulantImages.forEach((turbImage, i) => {
        color += turbImage[y][x] / (2 ** (turbLevels + 1 - (i)))
      })
      finalTurbulantImage[y][x] = color * (((Math.sin(time + y / 30 - x / 30) + 0.6) / 2) + 0.2);
    } 
  }

  return finalTurbulantImage;

};

export default generateTurbulance;
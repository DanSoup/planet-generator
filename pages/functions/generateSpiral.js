import equalize from './equalize.js';

const generateSpiral = (height, width) => {

  const image = [];

  for (let y = 0; y < height; y++) {
    image[y] = [];
    for (let x = 0; x < width; x++) {
      const adjustedX = x - width / 2;
      const adjustedY = y - height / 2;
      const nonZeroX = adjustedX ? adjustedX : adjustedX + 0.1;
      const yOverX = adjustedY / nonZeroX;
      let angleArg = yOverX;
      // const z = (Math.sin(((Math.atan(angleArg) + 0.5 * Math.PI) / (Math.PI)) * Math.sqrt((nonZeroX ** 2) + (adjustedY ** 2)) / 10) + 1) / 2;
      let a = 0;
      let b = 10;
      const frequency = 100
      const radius = Math.sqrt((nonZeroX ** 2) + (adjustedY ** 2))
      const normalizedTan = Math.atan(yOverX) * frequency * 2
      const z = Math.cos((normalizedTan + radius) / frequency)
      // const z = ((Math.atan(angleArg) + 0.5 * Math.PI) / (Math.PI))
      // const z = Math.atan(angleArg);
      image[y][x] = z;
    };
  };

  let maxZ = 0
  
  image.forEach(row => {
    row.forEach(cell => {
      maxZ = Math.max(maxZ, cell)
    });
  });

  image.forEach((row, y) => {
    row.forEach((cell, x) => {
      image[y][x] = image[y][x] / maxZ
    });
  });

  // const equalizedImage =  equalize(image.map(row => {
  //   return row.map(cell => {
  //     return Math.max(Math.min(cell, 1000), -1000)
  //   });
  // }));

  // return equalizedImage.map(row => {
  //   return row.map(cell => {
  //     return cell > 0.5 && cell < 0.6 ? 1 : 0;
  //   });
  // });

  return image;

};

export default generateSpiral;
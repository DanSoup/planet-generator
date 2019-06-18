import equalize from './equalize.js';

const generateSpiral = (height, width) => {

  const image = [];

  for (let y = 0; y < height; y++) {
    image[y] = [];
    for (let x = 0; x < width; x++) {
      const adjustedX = x - width / 2;
      const adjustedY = y - height / 2;
      const nonZeroX = adjustedX ? adjustedX : adjustedX + 0.001;
      const yOverX = adjustedY / nonZeroX;
      let angleArg = yOverX;
      const z = 5 * Math.atan(angleArg) - Math.sqrt((adjustedX ** 2) + (adjustedY ** 2));
      // const z = Math.atan(angleArg);
      image[y][x] = z;
    };
  };

  const equalizedImage =  equalize(image.map(row => {
    return row.map(cell => {
      return Math.max(Math.min(cell, 1000), -1000)
    });
  }));

  return equalizedImage.map(row => {
    return row.map(cell => {
      return cell > 0.5 && cell < 0.6 ? 1 : 0;
    });
  });

};

export default generateSpiral;
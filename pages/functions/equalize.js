const equalize = image => {
  
  const newImage = [];
  let min = 1;
  let max = 0;

  image.forEach(row => {
    row.forEach(cell => {
      min = Math.min(cell, min);
      max = Math.max(cell, max);
    });
  });

  const range = 1 / (max - min);

  image.forEach((row, y) => {
    newImage[y] = [];
    row.forEach((cell, x) => {
      newImage[y][x] = (cell - min) * range;
    });
  });

  return newImage;

};

export default equalize;
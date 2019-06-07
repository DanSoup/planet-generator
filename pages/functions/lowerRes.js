const lowerRes = (image, zoom) => {

  const newImage = [];

  image.forEach(((row, y) => {
    newImage[y] = [];
    row.forEach((cell, x) => {
      newImage[y][x] = image[y - (y % zoom)][x - (x % zoom)]
    });
  }));

  return newImage;

};

export default lowerRes;
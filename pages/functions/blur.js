const blur = (image, blurLevel) => {

  let blurredImage = image.map(row => [...row]);

  const height = image.length;
  const width = image[0].length;

  const pixelBlur = (x, y) => {
    const ly = (y + height - 1) % height; 
    const ry = (y + 1) % height;
    const lx = (x + width - 1) % width; 
    const rx = (x + 1) % width; 
    const l = blurredImage[y][lx];
    const r = blurredImage[y][rx];
    const u = blurredImage[ly][x];
    const d = blurredImage[ry][x];
    const c = blurredImage[y][x];
    return (l + r + u + d + c) / 5
  }

  for (let i = 0; i < blurLevel; i++) {
    let newImage = [];
    for (let y = 0; y < height; y++) {
      newImage[y] = [];
      for (let x = 0; x < width; x++) {
        newImage[y][x] = pixelBlur(x, y);
      }
    }
    blurredImage = newImage.map(row => [...row]);

  };

  return blurredImage;

};

export default blur;
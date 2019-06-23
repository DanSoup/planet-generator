const generatePlanet = (planet, camera, startX = 0, startY = 0, size = 128) => {

  const pixelSize = size / camera.resolution;
  const aRadius = 0.5 * camera.zoom * (planet.diameter / planet.distance);

  const image = [];
  const rawImage = [];
  const origin = size / 2;

  for (let y = 0; y < size; y++) {
    rawImage[y] = [];
    for (let x = 0; x < size; x++) {
      if ((x - origin + 0.5) ** 2 + (y - origin + 0.5) ** 2 < aRadius ** 2) {
        rawImage[y][x] = planet.color
      }
    };
  };

  let mostActivePixels = 0;

  for (let y = 0; y < camera.resolution; y++) {
    for (let x = 0; x < camera.resolution; x++) {

      const fullColor = {r: 0, g: 0, b: 0, a: 0};
      let activePixels = 0;

      for (let aY = 0; aY < pixelSize; aY++) {
        for (let aX = 0; aX < pixelSize; aX++) {
          const realY = y * pixelSize + aY;
          const realX = x * pixelSize + aX;
          if (rawImage[realY][realX]) {
            activePixels++;
            fullColor.r += rawImage[realY][realX].r;
            fullColor.g += rawImage[realY][realX].g;
            fullColor.b += rawImage[realY][realX].b;
            fullColor.a += rawImage[realY][realX].a;
          }
        };
      };

      mostActivePixels = Math.max(mostActivePixels, activePixels);
      const color = {r: fullColor.r, g: fullColor.g, b: fullColor.b, a: fullColor.a};

      image.push({color, x: startX + (x * pixelSize), y: startY + (y * pixelSize), w: pixelSize, h: pixelSize, activePixels});
    };
  };

  image.forEach(imageData => {
    imageData.color = {
      r: imageData.color.r / (mostActivePixels),
      g: imageData.color.g / (mostActivePixels),
      b: imageData.color.b / (mostActivePixels),
      a: imageData.color.a / (mostActivePixels)
    }
    // if (imageData.activePixels) console.log(imageData.color)
  });


  return image;

};

export default generatePlanet;
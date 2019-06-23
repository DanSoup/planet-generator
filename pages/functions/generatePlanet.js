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
        rawImage[y][x] = {r: 1, g: 1, b: 1, a: 1}
      }
      else rawImage[y][x] = {r: 0, g: 0, b: 0, a: 1};
    };
  };

  for (let y = 0; y < camera.resolution; y++) {
    for (let x = 0; x < camera.resolution; x++) {

      const fullColor = {r: 0, g: 0, b: 0, a: 0};

      for (let aY = 0; aY < pixelSize; aY++) {
        for (let aX = 0; aX < pixelSize; aX++) {
          const realY = y * pixelSize + aY;
          const realX = x * pixelSize + aX;
          fullColor.r += rawImage[realY][realX].r
          fullColor.g += rawImage[realY][realX].g
          fullColor.b += rawImage[realY][realX].b
          fullColor.a += rawImage[realY][realX].a
        };
      };

      const color = {r: fullColor.r / (pixelSize ** 2), g: fullColor.g / (pixelSize ** 2), b: fullColor.b / (pixelSize ** 2), a: fullColor.a / (pixelSize ** 2)};

      image.push({color, x: startX + (x * pixelSize), y: startY + (y * pixelSize), w: pixelSize, h: pixelSize});
    };
  };

  return image;

};

export default generatePlanet;
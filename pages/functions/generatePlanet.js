const generatePlanet = (planet, camera, startX = 0, startY = 0, maxSize = 128, zoom = 0) => {

  const maximumResolution = Math.max(camera.resolution * camera.zoom, 128);



  const size = Math.min(Math.floor(maxSize / camera.resolution) * camera.resolution, 128);
  const buffer = Math.floor((maxSize - size) / 2);
  const pixelSize = size / camera.resolution;
  const apparentZoom = size / maxSize;
  const aRadius = Math.min(0.5 * camera.zoom * apparentZoom * (planet.diameter / planet.distance), size * (0.45 * 2 ** zoom));
  
  const image = [];
  const rawImage = [];
  const origin = size / 2;

  for (let y = 0; y < size; y++) {
    rawImage[y] = [];
    for (let x = 0; x < size; x++) {
      if ((x - origin) ** 2 + (y - origin) ** 2 < aRadius ** 2) {
        const midX = x - origin;
        const midY = y - origin;
        const midZ = Math.sqrt(aRadius ** 2 - ((midX) ** 2 + (midY) ** 2));
        const theta = Math.PI * 0.25;
        const newX = midX + origin;
        const newY = Math.cos(theta) * midY - Math.sin(theta) * midZ + origin;
        const newZ = Math.sin(theta) * midY + Math.cos(theta) * midZ + origin;
        const newColor = {...planet.color}
        newColor.r = newColor.r * ((0.8 * newZ / size) + 0.2);
        newColor.g = newColor.g * ((0.8 * newZ / size) + 0.2);
        newColor.b = newColor.b * ((0.8 * newZ / size) + 0.2);
        rawImage[y][x] = newColor
      }
    };
  };

  let mostActivePixels = 0;

  for (let y = 0; y < Math.min(camera.resolution, 128); y++) {
    for (let x = 0; x < Math.min(camera.resolution, 128); x++) {

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

      image.push({color, x: buffer + startX + (x * pixelSize), y: buffer + startY + (y * pixelSize), w: pixelSize, h: pixelSize, activePixels});
    };
  };

  image.forEach(imageData => {
    imageData.color = {
      r: imageData.color.r / (mostActivePixels),
      g: imageData.color.g / (mostActivePixels),
      b: imageData.color.b / (mostActivePixels),
      a: imageData.color.a / (mostActivePixels)
    }
    const noTransparency = {
      r: imageData.color.r * imageData.color.a,
      g: imageData.color.g * imageData.color.a,
      b: imageData.color.b * imageData.color.a,
      a: 1
    }

    imageData.color = noTransparency;

    // if (imageData.activePixels) console.log(imageData.color)
  });

  image.forEach(imageData => {
    const {r, g, b} = imageData.color;
    imageData.color = {
      r: Math.floor(4 * Math.max(r, g, b)) / 4,
      g: Math.floor(4 * Math.max(r, g, b)) / 4,
      b: Math.floor(4 * Math.max(r, g, b)) / 4,
      a: 1
    }

  });


  return image;

};

export default generatePlanet;
const generatePlanet = (planet, camera, startX = 0, startY = 0, maxSize = 128, zoom = 0, zoomX = 0, zoomY = 0) => {

  const maximumResolution = 128 * Math.ceil(camera.resolution * camera.zoom / 128);

  // console.log(maximumResolution)

  const new_pixelSize = Math.min(Math.max(Math.floor(128 / (maximumResolution / 2 ** zoom)), 1), 128);
  // console.log(zoom, new_pixelSize)

  const aRadius = Math.min((camera.resolution * camera.zoom / 128) * (planet.diameter / planet.distance) * 2 ** zoom, 50 * 2 ** zoom);
  
  const image = [];
  const rawImage = [];
  const origin = 64;

  for (let y = 0; y < 128; y++) {
    rawImage[y] = [];
    for (let x = 0; x < 128; x++) {
      const rX = x - 64 + (zoomX * 2 ** zoom);
      const rY = y - 64 + (zoomY * 2 ** zoom);
      if ((rX) ** 2 + (rY) ** 2 < aRadius ** 2) {
        const midX = rX;
        const midY = rY;
        const midZ = Math.sqrt(aRadius ** 2 - ((midX) ** 2 + (midY) ** 2));
        const theta = Math.PI * 0.25;
        const newX = midX + origin - (zoomX * 2 ** zoom);
        // const newY = Math.cos(theta) * midY - Math.sin(theta) * midZ + origin;
        // const newZ = Math.sin(theta) * midY + Math.cos(theta) * midZ + origin;
        const newY = Math.cos(theta) * midY - Math.sin(theta) * midZ + 64 - (zoomY * 2 ** zoom);
        const newZ = Math.sin(theta) * midY + Math.cos(theta) * midZ + 64;

        // Surface image is generated here.
        const newColor = {...planet.color}
        newColor.r = newColor.r * ((0.8 * newX / 128) + 0.2);
        newColor.g = newColor.g * ((0.8 * newX / 128) + 0.2);
        newColor.b = newColor.b * ((0.8 * newX / 128) + 0.2);

        rawImage[y][x] = newColor
      }
    };
  };

  let mostActivePixels = 0;

  for (let y = 0; y < 128 / new_pixelSize; y++) {
    for (let x = 0; x < 128 / new_pixelSize; x++) {

      const fullColor = {r: 0, g: 0, b: 0, a: 0};
      let activePixels = 0;

      for (let aY = 0; aY < new_pixelSize; aY++) {
        for (let aX = 0; aX < new_pixelSize; aX++) {
          const realY = y * new_pixelSize + aY;
          const realX = x * new_pixelSize + aX;
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

      image.push({color, x: startX + (x * new_pixelSize), y: startY + (y * new_pixelSize), w: new_pixelSize, h: new_pixelSize, activePixels});
      
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

    if (Math.random() * 60000 > (Date.now() - state.photos[0].time)) {
      imageData.color.a = 1
      imageData.color.r = 1
      imageData.color.g = 1
      imageData.color.b = 1
    }

    // if (imageData.activePixels) console.log(imageData.color)
  });

  // image.forEach(imageData => {
  //   const {r, g, b} = imageData.color;
  //   imageData.color = {
  //     r: Math.floor(4 * Math.max(r, g, b)) / 4,
  //     g: Math.floor(4 * Math.max(r, g, b)) / 4,
  //     b: Math.floor(4 * Math.max(r, g, b)) / 4,
  //     a: 1
  //   }

  // });


  return image;

};

export default generatePlanet;
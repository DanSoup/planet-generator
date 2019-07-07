import xorshift from './xorshift.js';

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
      // const rX = x / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomX);
      // const rY = y / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomY);

      const pixelNo = (x, y) => {
        return (Math.floor(x / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomX))) + Math.floor((y / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomY))) * 128;
      }

      // if (pixelNo(x, y) * 1 > (Date.now() - state.photos[0].time)) {
        // rawImage[y][x] = {r: Math.random(), g: 0, b: 0, a: 1, ignore: true}
      // } else if ((rX) ** 2 + (rY) ** 2 < aRadius ** 2) {
      if ((rX) ** 2 + (rY) ** 2 < aRadius ** 2) {
        const midX = rX;
        const midY = rY;
        const midZ = Math.sqrt(aRadius ** 2 - ((midX) ** 2 + (midY) ** 2));

        const xRotation = Math.PI * planet.rotation.x / 8 + 10 * Date.now() / 100000;
        const yRotation = Math.PI * planet.rotation.y / 8 + 11 * Date.now() / 100000;
        const zRotation = Math.PI * planet.rotation.z / 8 + 12 * Date.now() / 10000;

        // const newX = (midX / 2 ** zoom) + 64 - (zoomX * 2 ** zoom);
        // const newY = ((Math.cos(xRotation) * midY - Math.sin(xRotation) * midZ) / 2 ** zoom) + 64 - (zoomY * 2 ** zoom);
        // const newZ = ((Math.sin(xRotation) * midY + Math.cos(xRotation) * midZ) / 2 ** zoom) + 64;

        let newX = (midX / 2 ** zoom);
        let newY = ((Math.cos(xRotation) * midY - Math.sin(xRotation) * midZ) / 2 ** zoom);
        let newZ = ((Math.sin(xRotation) * midY + Math.cos(xRotation) * midZ) / 2 ** zoom);

        newX = ((Math.cos(yRotation) * newX + Math.sin(yRotation) * newZ) / 2 ** zoom);
        newY = (newY / 2 ** zoom);
        newZ = ((-Math.sin(yRotation) * newX + Math.cos(yRotation) * newZ) / 2 ** zoom);

        newX = ((Math.cos(zRotation) * newX - Math.sin(zRotation) * newY) / 2 ** zoom);
        newY = ((Math.sin(zRotation) * newX + Math.cos(zRotation) * newY) / 2 ** zoom);
        newZ = (newZ / 2 ** zoom);

        newX += 64 - (zoomX * 2 ** zoom);
        newY += 64 - (zoomY * 2 ** zoom);
        newZ += 64;

        // Surface image is generated here.
        const newColor = {...planet.color}
        newColor.r = newColor.r * ((0.95 * newZ / 128) + 0) + parseInt(Math.sin(newX + newY * 128).toString(10).slice(-3)) / 40000;
        newColor.g = newColor.g * ((0.75 * newZ / 128) + 0.2 * newX / 128) + parseInt(Math.sin(newX + newY * 128).toString(10).slice(-3)) / 40000;
        newColor.b = newColor.b * ((0.55 * newZ / 128) + 0.4 * newY / 128) + parseInt(Math.sin(newX + newY * 128).toString(10).slice(-3)) / 40000;

        rawImage[y][x] = newColor
      } else {
        // rawImage[y][x] = {r: 0, g: 0, b: 0, a: 0}
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

      const pixelNo = (sX, sY) => {
        let x = sX * new_pixelSize;
        let y = sY * new_pixelSize;
        x = (((x / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomX))));
        y = (((y / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomY))));
        // const sinX = Math.sin(x / 128);
        // const sinY = Math.sin(y);

        // return (Math.sin(x / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomX))) + 128 * Math.floor((y / 2 ** zoom + ((128 - (2 ** (7 - zoom))) / 2 + zoomY)));
        return (x * 23 + x * y * 17 + y ** 2) % 128 * (y * 23 + x ** 2) % 128 * 128;
      }

      if (pixelNo(x, y) * 1 > (Date.now() - state.photos[0].time)) {
        color.r = Math.random();
        color.b = Math.random();
        color.g = Math.random();
        color.a = 1;
        color.noise = true;
      };
      
      image.push({color, x: startX + (x * new_pixelSize), y: startY + (y * new_pixelSize), w: new_pixelSize, h: new_pixelSize, activePixels});
      
    };
  };

  image.forEach(imageData => {
    
    if (!imageData.color.noise) {
      imageData.color = {
        r: imageData.color.r / (mostActivePixels),
        g: imageData.color.g / (mostActivePixels),
        b: imageData.color.b / (mostActivePixels),
        a: imageData.color.a / (mostActivePixels)
      }
    }

    const noTransparency = {
      r: imageData.color.r * imageData.color.a,
      g: imageData.color.g * imageData.color.a,
      b: imageData.color.b * imageData.color.a,
      a: 1
    }

    imageData.color = noTransparency;

    // if (Math.random() * 60000 > (Date.now() - state.photos[0].time)) {
    //   imageData.color.a = 1
    //   imageData.color.r = 1
    //   imageData.color.g = 1
    //   imageData.color.b = 1
    // }

    // if (imageData.activePixels) console.log(imageData.color)
  });

  // image.forEach(imageData => {
  //   const {r, g, b} = imageData.color;
  //   imageData.color = {
  //     r: Math.floor(4 * Math.max(r)) / (4),
  //     g: Math.floor(4 * Math.max(g)) / (4),
  //     b: Math.floor(4 * Math.max(b)) / (4),
  //     a: 1
  //   }
  // });


  return image;

};

export default generatePlanet;
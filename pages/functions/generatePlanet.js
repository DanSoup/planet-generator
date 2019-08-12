const generatePlanet = ({displayResolution, pixelSize, maxSize, camera, planet, zoom, zoomX, zoomY}) => {

  const image = [];

  const aRadius = Math.min((camera.resolution * camera.zoom / maxSize) * (planet.diameter / planet.distance) * 2 ** zoom * (1 / pixelSize), Math.floor(maxSize * 0.45) * 2 ** zoom * (1 / pixelSize));
  // const aRadius = Math.min((camera.resolution * camera.zoom / maxSize) * (planet.diameter / planet.distance), Math.floor(maxSize * 0.8));

  for (let y = 0; y < displayResolution; y++) {
    for (let x = 0; x < displayResolution; x++) {

      const ry = ((zoomY * (2 ** zoom) + y + 0.5) - displayResolution / 2) / aRadius; 
      const rx = ((zoomX * (2 ** zoom) + x + 0.5) - displayResolution / 2) / aRadius;
      const rz = (1 - ry ** 2 - rx ** 2) ** 0.5; 

      if (ry ** 2 + rx ** 2 < 1) image.push({color: {r: 1, g: 1, b: 1 - rz, a: 1}, x: x * pixelSize, y: y * pixelSize, w: pixelSize, h: pixelSize})
    } 
  }

  return image;

}

export default generatePlanet;
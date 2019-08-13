const generatePlanet = ({displayResolution, pixelSize, maxSize, camera, planet, zoom, zoomX, zoomY}) => {

  const image = [];

  const aRadius = Math.min((camera.resolution * camera.zoom / maxSize) * (planet.diameter / planet.distance) * 2 ** zoom * (1 / pixelSize), Math.floor(maxSize * 0.45) * 2 ** zoom * (1 / pixelSize));
  // const aRadius = Math.min((camera.resolution * camera.zoom / maxSize) * (planet.diameter / planet.distance), Math.floor(maxSize * 0.8));

  for (let y = 0; y < displayResolution; y++) {
    for (let x = 0; x < displayResolution; x++) {

      const ry = ((zoomY + y + 0.5) - displayResolution / 2) / aRadius; 
      const rx = ((zoomX + x + 0.5) - displayResolution / 2) / aRadius;
      const rz = (1 - ry ** 2 - rx ** 2) ** 0.5; 

      const theta = planet.rotation.x / 16 * Math.PI;
      const phi = planet.rotation.y / 16 * Math.PI;

      const mz = Math.sin(theta) * ry + Math.cos(theta) * rz;

      const nz = -Math.sin(phi) * rx + Math.cos(phi) * mz;

      if (ry ** 2 + rx ** 2 < 1) {
        // image.push({color: planet.color, x: x * pixelSize, y: y * pixelSize, w: pixelSize, h: pixelSize})
        image.push({
          color: {
            r: planet.color.r * (nz + 1) / 2,
            g: planet.color.g * (nz + 1) / 2,
            b: planet.color.b * (nz + 1) / 2,
            a: 1
          },
          x: x * pixelSize,
          y: y * pixelSize,
          w: pixelSize,
          h: pixelSize
        })
      }
    } 
  }

  return image;

}

export default generatePlanet;
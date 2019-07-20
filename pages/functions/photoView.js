import xorshift from './xorshift.js';
import writeText from './writeText.js';
import colors from './resources/colors.js';
import generatePlanet from './generatePlanet.js';

const photoView = (planet, camera, startX = 0, startY = 0, maxSize = 128, zoom = 0, zoomX = 0, zoomY = 0) => {


  const {border} = colors.default;

  const maximumResolution = maxSize * Math.ceil(camera.resolution * camera.zoom / maxSize);

  const pixelSize = Math.max(maxSize / (maximumResolution / 2 ** zoom), 1);

  const displayResolution = Math.min(maxSize, Math.min(maxSize, maximumResolution) / pixelSize)

  const aRadius = Math.min((camera.resolution * camera.zoom / maxSize) * (planet.diameter / planet.distance) * 2 ** zoom, Math.floor(maxSize * 0.8) * 2 ** zoom);
  // const aRadius = Math.min(20 * 2 ** zoom, Math.floor(maxSize * 0.8) * 2 ** zoom);
  
  const image = [];

  const planetData = generatePlanet({displayResolution, pixelSize, maxSize, aRadius, camera, planet, zoom});

  planetData.forEach(data => {
    const newData = {...data};
    newData.x += startX; 
    newData.y += startY;
    image.push(newData);
  });

  image.push(...writeText(maximumResolution.toString(10), border, 100 + (zoom ? 50 : 0), 150))
  image.push(...writeText(pixelSize.toString(10), border, 100 + (zoom ? 50 : 0), 160))
  image.push(...writeText(displayResolution.toString(10), border, 100 + (zoom ? 50 : 0), 170))

  const rawImage = [];
  const origin = Math.floor(maxSize / 2);

  // for (let y = 0; y < maxSize; y++) {
  //   rawImage[y] = [];
  //   for (let x = 0; x < maxSize; x++) {
      
  //     const rX = (x - origin + zoomX) / 2 ** (zoom);
  //     const rY = (y - origin + zoomY) / 2 ** (zoom);

  //     if ((x - origin + zoomX * 2 ** zoom) ** 2 + (y - origin + zoomY * 2 ** zoom) ** 2 < aRadius ** 2) {
  //       const midX = rX;
  //       const midY = rY;
  //       const midZ = Math.sqrt(aRadius ** 2 - rX ** 2 - rY ** 2);

  //       // const xRotation = 0 * Math.PI * planet.rotation.x / 8;
  //       const xRotation = 0 * Math.PI * planet.rotation.y / 8;
  //       const yRotation = 0 * Math.PI * planet.rotation.y / 8;
  //       const zRotation = 0 * Math.PI * planet.rotation.z / 8;

  //       // const newX = (midX / 2 ** zoom) + 64 - (zoomX * 2 ** zoom);
  //       // const newY = ((Math.cos(xRotation) * midY - Math.sin(xRotation) * midZ) / 2 ** zoom) + 64 - (zoomY * 2 ** zoom);
  //       // const newZ = ((Math.sin(xRotation) * midY + Math.cos(xRotation) * midZ) / 2 ** zoom) + 64;

  //       let xRotX = (midX);
  //       let xRotY = ((Math.cos(xRotation) * midY - Math.sin(xRotation) * midZ));
  //       let xRotZ = ((Math.sin(xRotation) * midY + Math.cos(xRotation) * midZ));

  //       let yRotX = ((Math.cos(yRotation) * xRotX + Math.sin(yRotation) * xRotZ));
  //       let yRotY = (xRotY);
  //       let yRotZ = ((-Math.sin(yRotation) * xRotX + Math.cos(yRotation) * xRotZ));

  //       let zRotX = ((Math.cos(zRotation) * yRotX - Math.sin(zRotation) * yRotY));
  //       let zRotY = ((Math.sin(zRotation) * yRotX + Math.cos(zRotation) * yRotY));
  //       let zRotZ = (yRotZ);

  //       // const newX = (zRotX / aRadius) * 0.5 + 0.5;
  //       // const newY = (zRotX / aRadius) * 0.5 + 0.5;
  //       // const newZ = (zRotZ / aRadius) * 0.5 + 0.5;

  //       const newX = (((zRotX + zoomX / 2) * 2 ** zoom) / aRadius) * 0.5 + 0.5;
  //       const newY = (((zRotY + zoomY / 2) * 2 ** zoom) / aRadius) * 0.5 + 0.5;
  //       // const newZ = (zRotZ / aRadius) * 0.5 + 0.5 
  //       const newZ = (((aRadius ** 2 - zRotX ** 2 - zRotY ** 2) ** 0.5 * (zRotZ < 0 ? 1 : -1) * 2 ** zoom) / aRadius) * 0.25 + 0.5

  //       // if (x === 64 && y === 64) console.log(zoom, newZ)

  //       // Surface image is generated here.
  //       const newColor = {...planet.color}
  //       newColor.r = 1;
  //       newColor.g = newZ;
  //       newColor.b = 1;
  //       newColor.a = 1;

  //       rawImage[y][x] = newColor;
  //     } else {
  //       rawImage[y][x] = {r: 0, g: 0, b: 0, a: 0};
  //     }
  //   };
  // };

  // for (let y = 0; y < maxSize; y++) {
  //   for (let x = 0; x < maxSize; x++) {
  //     const color = {};
  //     color.r = rawImage[y][x] ? rawImage[y][x].r : 0;
  //     color.g = rawImage[y][x] ? rawImage[y][x].g : 0;
  //     color.b = rawImage[y][x] ? rawImage[y][x].b : 0;
  //     color.a = rawImage[y][x] ? rawImage[y][x].a : 0;
  //     image.push({color, x: x + startX, y: y + startY, w: 1, h: 1})
  //   }
  // }


  return image;

};

export default photoView;
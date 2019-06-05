import hexColor from './hexColor.js';

const drawPlanet = (canvas, planetData) => {

  const {xRot, yRot, zRot, nColor, sColor, eColor, radius} = planetData;

  // Declaring variables
  const height = canvas.height;
  const width = canvas.width;
  const origin = {x: 128, y: 128, z: 128}

  const points = [];

  const ctx = mainCanvas.getContext('2d');
  let color = '#FFFFFF'

  // A function to draw a pixel at point (x, y) in newColor.
  const drawPixel = (x, y, newColor) => {
    ctx.fillStyle = newColor || color;
    ctx.fillRect(x, y, 1, 1);
  }

  // Creating the black background;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, height, width)

  const randomColor = () => {
    return hexColor(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      255
    )
  }

  // Circles along horizontal axis
  const mapLatitudes = (noPoints = 6) => {

    const newPoints = [{x : 0, y: -1, z: 0}, {x : 0, y: -1, z: 0}];

    for (let n = 1; n <= noPoints - 1; n++) {

      const y = Math.cos((n * Math.PI) / (noPoints - 1))

      const r = Math.sqrt(1 - y * y);

      for (let t = 0; t < 2 * Math.PI; t += Math.PI / (noPoints * r)) {

        const x = r * Math.cos(t);
        const z = r * Math.sin(t);

        newPoints.push({x, y, z});

      };

    };

    return newPoints

  };

  // Rotate a point in the y axis by t radians
  const rotateYAxis = (point, t) => {
    
    const x = point.x * Math.cos(t) + point.z * Math.sin(t);
    const y = point.y;
    const z = point.z * Math.cos(t) - point.x * Math.sin(t);
    
    const newPoint = {...point, x, y, z};
    
    return newPoint;

  }

  // Rotate a point in the z axis by t radians
  const rotateZAxis = (point, t) => {

    const x = point.x * Math.cos(t) + point.y * Math.sin(t);
    const y = point.y * Math.cos(t) - point.x * Math.sin(t);
    const z = point.z;
    
    const newPoint = {...point, x, y, z};
    
    return newPoint;

  }

  const rotateXAxis = (point, t) => {

    const x = point.x;
    const y = point.y * Math.cos(t) - point.z * Math.sin(t);
    const z = point.z * Math.cos(t) + point.y * Math.sin(t);
    
    const newPoint = {...point, x, y, z};
    
    return newPoint;

  }

  // Maps -1 to 1 coords to the real proportions of the canvas
  const mapToRealCoords = (points, radius, origin, pixelPerfect = true) => {
    return points.map(point => {
      if (pixelPerfect) {
        return {
          x: Math.round(point.x * radius + origin.x),
          y: Math.round(point.y * radius + origin.y),
          z: Math.round(point.z * radius + origin.z),
          color: point.color
        }
      } else {
        return {
          x: point.x * radius + origin.x,
          y: point.y * radius + origin.y,
          z: point.z * radius + origin.z,
          color: point.color
        }
      }
    });
  };

  let lats = mapLatitudes(radius * 5);

  lats.forEach(point => {

    const sProp = Math.max(point.y, 0);
    const nProp = Math.max(-1 * point.y, 0);
    const eProp = 1 - sProp - nProp;

    point.color = hexColor(
      Math.floor(sProp * sColor.r + eProp * eColor.r + nProp * nColor.r),
      Math.floor(sProp * sColor.g + eProp * eColor.g + nProp * nColor.g),
      Math.floor(sProp * sColor.b + eProp * eColor.b + nProp * nColor.b),
      Math.floor(sProp * sColor.a + eProp * eColor.a + nProp * nColor.a)
    );
  });

  lats = lats.map(point => {
    return rotateXAxis(rotateYAxis(rotateZAxis(point, zRot), yRot), xRot);
    // return point;
  });

  const realLats = mapToRealCoords(lats, radius, {x: 128, y: 128, z: 128}, false);

  realLats.sort((a, b) => a.z - b.z).forEach(point => {
    if (point.z > 128) {
      setTimeout(() => {
        drawPixel(point.x, point.y, point.color);
        });
      }
  });

}

export default drawPlanet;
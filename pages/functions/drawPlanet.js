import hexColor from './hexColor.js';

const drawPlanet = (canvas, planetData) => {

  // Declaring variables
  const height = 200;
  const width = 200;
  const radius = 90;
  const origin = {x: 100, y: 100, z: 100}

  const points = [];

  const ctx = mainCanvas.getContext('2d');
  let color = '#FFFFFF'

  // A function to draw a pixel at point (x, y) in newColor.
  const drawPixel = (x, y, newColor) => {
    // if (newColor) color = newColor;
    ctx.fillStyle = newColor || color;
    ctx.fillRect(x, y, 1, 1);
  }

  // Creating the black background;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 200, 200)

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
    
    const newPoint = {x, y, z};
    
    return newPoint;

  }

  // Rotate a point in the z axis by t radians
  const rotateZAxis = (point, t) => {

    const x = point.x * Math.cos(t) + point.y * Math.sin(t);
    const y = point.y * Math.cos(t) - point.x * Math.sin(t);
    const z = point.z;
    
    const newPoint = {x, y, z};
    
    return newPoint;

  }

  const rotateXAxis = (point, t) => {

    const x = point.x;
    const y = point.y * Math.cos(t) - point.z * Math.sin(t);
    const z = point.z * Math.cos(t) + point.y * Math.sin(t);
    
    const newPoint = {x, y, z};
    
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

  const lats = mapLatitudes(90).map(point => {
    // return rotateYAxis(rotateZAxis(point, 0.25 * Math.PI), 0.25 * Math.PI)
    return point;
  });

  lats.forEach(point => {
    point.color = hexColor(
      Math.floor((point.x + 1) * 128),
      Math.floor((point.y + 1) * 128),
      Math.floor((point.z + 1) * 128),
      255
    )
  });

  const realLats = mapToRealCoords(lats, 90, {x: 100, y: 100, z: 100}, false);

  realLats.forEach(point => {
    if (point.z > 100) drawPixel(point.x, point.y, point.color)
  });

}

export default drawPlanet;
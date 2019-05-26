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
  const pixel = (x, y, newColor) => {
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

    const newPoint = [...point];

    const x = point[0] - origin[0];
    const y = point[1] - origin[1];
    const z = point[2] - origin[2];

    newPoint[0] = x * Math.cos(t) + z * Math.sin(t) + origin[0];
    newPoint[1] = y + origin[1];
    newPoint[2] = z * Math.cos(t) - x * Math.sin(t) + origin[2];

    return newPoint;

  }

  // Rotate a point in the z axis by t radians
  const rotateZAxis = (point, t) => {

    const newPoint = [...point];

    const x = point[0] - origin[0];
    const y = point[1] - origin[1];
    const z = point[2] - origin[2];

    newPoint[0] = x * Math.cos(t) + y * Math.sin(t) + origin[0];
    newPoint[1] = y * Math.cos(t) - x * Math.sin(t) + origin[1];
    newPoint[2] = z + origin[2];

    return newPoint;

  }

  const lats = mapLatitudes(8).map(point => {
    // return rotateYAxis(rotateZAxis(point, 0.25 * Math.PI), 0.25 * Math.PI)
    return point;
  })

  const mapToRealCoords = (points, radius, origin, pixelPerfect = true) => {
    return points.map(point => {
      if (pixelPerfect) {
        return {
          x: Math.round(point.x * radius + origin.x),
          y: Math.round(point.y * radius + origin.y),
          z: Math.round(point.z * radius + origin.z)
        }
      } else {
        return {
          x: point.x * radius + origin.x,
          y: point.y * radius + origin.y,
          z: point.z * radius + origin.z
        }
      }
    });
  }

  const realLats = mapToRealCoords(lats, 10, {x: 100, y: 100, z: 100});

  realLats.forEach(point => {
    if (point.z > 100) pixel(point.x, point.y, '#FFFFFFFF')
  });

}

export default drawPlanet;
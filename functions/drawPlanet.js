import hexColor from './hexColor.js';

const drawPlanet = (canvas, planetData) => {

  // Declaring variables
  const height = 200;
  const width = 200;
  const radius = 90;
  const origin = [100, 100, 100]

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

    const newPoints = [[0, -1, 0, hexColor(128, 128, 128, 255)], [0, 1, 0, hexColor(128, 128, 128, 255)]];

    for (let n = 1; n <= noPoints - 1; n++) {

      const y = Math.cos((n * Math.PI) / (noPoints - 1))

      const r = Math.sqrt(1 - y * y);

      for (let t = 0; t < 2 * Math.PI; t += Math.PI / (noPoints * r)) {

        const x = r * Math.cos(t);
        const z = r * Math.sin(t);

        const luminoscity = Math.floor(y * 128) + 128;

        const red = Math.floor(256 * Math.abs(y));
        const green = 255;
        const blue = 0;

        const color = hexColor(red, green, blue, 255);

        newPoints.push([x, y, z, color]);

      };

    };

    return newPoints.map(point => {
      return [
        point[0] * radius + origin[0],
        point[1] * radius + origin[1],
        point[2] * radius + origin[2],
        point[3]
      ]
    });

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

  const lats = mapLatitudes(radius * 5).map(point => {
    return rotateYAxis(rotateZAxis(point, 0.25 * Math.PI), 0.25 * Math.PI)
  })

  lats.forEach(point => {
    if (point[2] > 100) pixel(Math.round(point[0]), Math.round(point[1]), point[3])
  });

}

export default drawPlanet;
const drawPlanet = (canvas, planetData) => {

  // Declaring variables
  const height = 200;
  const width = 200;
  const radius = 90;
  const origin = [100, 100, 100]

  // Randomly generate the angle of the axis.
  const poleAngle = []
  
  poleAngle[0] = Math.random() * Math.PI / 2;
  poleAngle[1] = Math.random() * Math.PI;

  // Calculate the positions of the ends of the axis
  const poleTips = []

  poleTips[0] = [Math.cos(poleAngle[0]) * Math.cos(poleAngle[1]), Math.cos(poleAngle[0]) * Math.sin(poleAngle[1])];
  poleTips[1] = [-poleTips[0][0], -poleTips[0][1]];

  const points = [];

  const ctx = mainCanvas.getContext('2d');
  let color = '#FFFFFF'

  // A function to draw a pixel at point (x, y) in newColor.
  const pixel = (x, y, newColor) => {
    if (newColor) color = newColor;
    ctx.fillStyle = newColor || color;
    ctx.fillRect(x, y, 1, 1);
  }

  // Creating the black background;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 200, 200)

  // Circle along horizontal axis
  const mapLatitudes = (noPoints = 6) => {

    const newPoints = [];

    for (let y = -1; y <= 1; y += 2 / noPoints) {

      const r = Math.sqrt(1 - y * y);

      for (let t = 0; t < 2 * Math.PI; t += Math.PI / (noPoints * r)) {

        const x = r * Math.cos(t);
        const z = r * Math.sin(t);

        newPoints.push([x, y, z]);

      };

    };

    return newPoints.map(point => {
      return [
        point[0] * radius + origin[0],
        point[1] * radius + origin[1],
        point[2] * radius + origin[2]
      ]
    });

  };

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

  const lats = mapLatitudes(128).map(point => {
    return rotateYAxis(rotateZAxis(point, 2), 2)
  })

  lats.forEach(point => {
    pixel(Math.round(point[0]), Math.round(point[1]))
  })

}

export default drawPlanet;
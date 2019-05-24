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

    for (let x = -1; x <= 1; x += 2 / noPoints) {

      const r = Math.sqrt(1 - x * x);

      for (let t = 0; t < 2 * Math.PI; t += Math.PI / noPoints) {

        const y = r * Math.cos(t);
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

  const lats = mapLatitudes(32)

  for (let t = 0; t < 100 * Math.PI; t += 0.01) {

    setTimeout(() => {

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 200, 200)
      ctx.fillStyle = '#FFFFFF';

    lats.forEach(point => {

      // const t = Math.PI / 4;
      const x = point[0] - origin[0];
      const y = point[1] - origin[1];
      const z = point[2] - origin[2];

      const rX = x * Math.cos(t) + z * Math.sin(t) + origin[0];
      const rY = y + origin[1];
      const rZ = z * Math.cos(t) - x * Math.sin(t) + origin[2];

      pixel(rX, rY);

    });

    }, t * 5000)

  }

  // for (let i = 0; i <= 4; i++) {

    

  //   const dX = poleTips[0][0] - poleTips[1][0];
  //   const dY = poleTips[0][1] - poleTips[1][1];

  //   // pixel((poleTips[0][0] - dX * (i / 100)) * radius + 100, (poleTips[0][1] - dY * (i / 100)) * radius + 100)
  //   pixel(Math.round((poleTips[0][0] - dX * (i / 4)) * radius + 100), Math.round((poleTips[0][1] - dY * (i / 4)) * radius + 100))

  // }

  // Drawing the tips of the poles
  // pixel(Math.round(poleTips[0][0] * radius + 100), Math.round(poleTips[0][1] * radius + 100));
  // pixel(Math.round(poleTips[1][0] * radius + 100), Math.round(poleTips[1][1] * radius + 100));

  // Drawing the axis of the planet
  // for (let i = 1; i < 99; i++) {

  //   const dX = poleTips[0][0] - poleTips[1][0];
  //   const dY = poleTips[0][1] - poleTips[1][1];

  //   // pixel((poleTips[0][0] - dX * (i / 100)) * radius + 100, (poleTips[0][1] - dY * (i / 100)) * radius + 100)
  //   // pixel(Math.round((poleTips[0][0] - dX * (i / 100)) * radius + 100), Math.round((poleTips[0][1] - dY * (i / 100)) * radius + 100))

  // }

  // Drawing a circle

  // const noPixels = 200;

  // for (let i = 0; i < noPixels; i++) {
  //   const x = Math.round(100 + radius * Math.sin((i / noPixels) * 2 * Math.PI))
  //   const y = Math.round(100 + radius * Math.cos((i / noPixels) * 2 * Math.PI))
  //   pixel(x, y)
  // };

};

export default drawPlanet;


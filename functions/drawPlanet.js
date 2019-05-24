const drawPlanet = (canvas, planetData) => {

  // Declaring variables
  const height = 200;
  const width = 200;
  const radius = 90;

  // Randomly generate the angle of the axis.
  const poleAngle = []
  
  poleAngle[0] = Math.random() * Math.PI / 2;
  poleAngle[1] = Math.random() * Math.PI;

  // Calculate the positions of the ends of the axis
  const poleTips = []

  poleTips[0] = [Math.cos(poleAngle[0]) * Math.cos(poleAngle[1]), Math.cos(poleAngle[0]) * Math.sin(poleAngle[1])];
  poleTips[1] = [-poleTips[0][0], -poleTips[0][1]];

console.log(mainCanvas)

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

  // Drawing the tips of the poles
  pixel(Math.round(poleTips[0][0] * radius + 100), Math.round(poleTips[0][1] * radius + 100));
  pixel(Math.round(poleTips[1][0] * radius + 100), Math.round(poleTips[1][1] * radius + 100));

  // Drawing the axis of the planet
  for (let i = 1; i < 99; i++) {

    const dX = poleTips[0][0] - poleTips[1][0];
    const dY = poleTips[0][1] - poleTips[1][1];

    // pixel((poleTips[0][0] - dX * (i / 100)) * radius + 100, (poleTips[0][1] - dY * (i / 100)) * radius + 100)
    pixel(Math.round((poleTips[0][0] - dX * (i / 100)) * radius + 100), Math.round((poleTips[0][1] - dY * (i / 100)) * radius + 100))

  }

  // Drawing a circle

  const noPixels = 200;

  for (let i = 0; i < noPixels; i++) {
    const x = Math.round(100 + radius * Math.sin((i / noPixels) * 2 * Math.PI))
    const y = Math.round(100 + radius * Math.cos((i / noPixels) * 2 * Math.PI))
    pixel(x, y)
  };

};

export default drawPlanet;


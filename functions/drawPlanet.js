const drawPlanet = (canvas, planetData) => {

  const poleAngle = []
  
  poleAngle[0] = Math.random() * Math.PI / 2;
  poleAngle[1] = Math.random() * Math.PI;

  const poleTips = []

  poleTips[0] = [Math.cos(poleAngle[0]) * Math.cos(poleAngle[1]), Math.cos(poleAngle[0]) * Math.sin(poleAngle[1])];
  poleTips[1] = [-poleTips[0][0], -poleTips[0][1]];



  const height = 200;
  const width = 200;
  const radius = 90;

  const ctx = mainCanvas.getContext('2d');
  let color = '#FFFFFF'

  const pixel = (x, y, newColor) => {
    if (newColor) color = newColor;
    ctx.fillStyle = newColor || color;
    ctx.fillRect(x, y, 1, 1);
  }

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 200, 200)

  const noPixels = 200;

  pixel(Math.round(poleTips[0][0] * radius + 100), Math.round(poleTips[0][1] * radius + 100));
  pixel(Math.round(poleTips[1][0] * radius + 100), Math.round(poleTips[1][1] * radius + 100));

  for (let i = 0; i < noPixels; i++) {
    const x = Math.round(100 + radius * Math.sin((i / noPixels) * 2 * Math.PI))
    const y = Math.round(100 + radius * Math.cos((i / noPixels) * 2 * Math.PI))
    pixel(x, y)
  }



};

export default drawPlanet;


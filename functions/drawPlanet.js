const drawPlanet = (canvas, planetData) => {

  const height = 200;
  const width = 200;

  const ctx = mainCanvas.getContext('2d');
  let color = '#FFFFFF'

  const pixel = (x, y, newColor) => {
    if (newColor) color = newColor;
    ctx.fillStyle = newColor || color;
    ctx.fillRect(x, y, 1, 1);
  }

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 200, 200)

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const ix = i - 100
      const jx = j - 100
      if (ix*ix + jx*jx < 90*90 && ix*ix + jx*jx > (89*89)) pixel(i, j, '#00FFFF')
    }
  }

};

export default drawPlanet;
const generateTerrain = (mainCanvas) => {

  const ctx = mainCanvas.getContext('2d');

  ctx.fillStyle = '#008000';
  ctx.fillRect(0, 0, 200, 200)

  const drawPixel = (point) => {
    ctx.fillStyle = point.color;
    ctx.fillRect(point.x, point.y, 1, 1);
  };

  for (let x = 0; x < 200; x++) {
    const xFraction = x / 200;
    const y = Math.floor((Math.cos(xFraction * 2 * Math.PI) * 50) + 100)
    drawPixel({x, y, color: '#FFFFFFFF'})
  };

  const mapLatitudes = (noPoints = 6) => {

    const newPoints = [[0, -1, 0, hexColor(128, 128, 128, 255)], [0, 1, 0, hexColor(128, 128, 128, 255)]];
    const newPointsO = [{x: 0, y: -1, color: '#FF0000'}, {x: 0, y: 1, color: '#FF0000'}]

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
        newPointsO.push({x, y, color});

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

};

export default generateTerrain;
const generateTerrain = (mainCanvas) => {

  const ctx = mainCanvas.getContext('2d');

  ctx.fillStyle = '#00FF00';
  ctx.fillRect(0, 0, 200, 200)

};

export default generateTerrain;
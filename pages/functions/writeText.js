import fonts from './resources/fonts/index.js';

const writeText = (string, color, sX, sY, size = 1, font = 'capitals') => {

  const curFont = fonts[font];

  const image = [];

  const sizeX = size[0] || size;
  const sizeY = size[1] || size;

  for (let i = 0; i < curFont.meta.height; i++) image.push([]);

  let cursorPos = 0;

  const addLetter = letter => {
    let maxX = 0;
    letter.forEach((row, y) => {
      row.forEach((cell, x) => {
        image[y][x + cursorPos] = cell;
        maxX = Math.max(maxX, x);
      })
    })
    cursorPos += maxX + 2;
  }

  string.split('').forEach(letter => {
    addLetter(curFont[letter]);
  });
  
  const newImage = [];
  
  image.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) newImage.push({color, x: sX + (x * sizeX), y: sY + (y * sizeY), w: sizeX, h: sizeY})
    });
  });

  return newImage;

};

export default writeText;
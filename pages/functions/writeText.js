import fonts from './resources/fonts/index.js';

const writeText = (string, font = 'capitals') => {

  const curFont = fonts[font];

  const image = [];

  for (let i = 0; i < curFont.meta.height; i++) image.push([]);

  let cursorPos = 0;

  const addLetter = letter => {
    console.log(letter)
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
    addLetter(curFont[letter])
  })
  
  return image;

};

export default writeText;
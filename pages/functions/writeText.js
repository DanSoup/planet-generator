import letters from './letters.js';

const writeText = (string) => {

  const image = [[], [], [], [], [], [], []];

  let cursorPos = 0;

  const addLetter = letter => {
    let maxX = 0;
    letter.forEach((row, y) => {
      row.forEach((cell, x) => {
        image[y][x + cursorPos] = cell;
        maxX = Math.max(maxX, x);
      })
    })
    cursorPos += maxX + 3;
  }

  string.split('').forEach(letter => {
    addLetter(letters[letter])
  })
  
  return image;

};

export default writeText;
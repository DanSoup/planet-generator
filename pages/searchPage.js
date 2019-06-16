import colors from './functions/resources/colors.js';
import writeText from './functions/writeText.js';

const searchPage = () => {

  const image = [];
  const {background, border, sidebar, clear, highlight} = colors.default;

  // Background
  image.push({color: border, x: 65, y: 0, w: 335, h: 225});
  image.push({color: background, x: 65, y: 1, w: 334, h: 223});

  // Left Window
  image.push({color: border, x: 68, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 69, y: 5, w: 128, h: 128});

  // Right Window
  image.push({color: border, x: 266, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 267, y: 5, w: 128, h: 128});

  // Scroll Window
  image.push({color: border, x: 68, y: 137, w: 328, h: 84});
  image.push({color: clear, x: 69, y: 138, w: 326, h: 76});
  image.push({color: clear, x: 69, y: 215, w: 326, h: 5});

  // Buttons Top Row
  image.push({color: border, x: 201, y: 4, w: 20, h: 20});
  image.push({color: clear, x: 202, y: 5, w: 18, h: 18});
  image.push({color: border, x: 222, y: 4, w: 20, h: 20});
  image.push({color: clear, x: 223, y: 5, w: 18, h: 18});
  image.push({color: border, x: 243, y: 4, w: 20, h: 20});
  image.push({color: clear, x: 244, y: 5, w: 18, h: 18});

  // Buttons Second Row
  image.push({color: border, x: 201, y: 25, w: 20, h: 20});
  image.push({color: clear, x: 202, y: 26, w: 18, h: 18});
  image.push({color: border, x: 222, y: 25, w: 20, h: 20});
  image.push({color: clear, x: 223, y: 26, w: 18, h: 18});
  image.push({color: border, x: 243, y: 25, w: 20, h: 20});
  image.push({color: clear, x: 244, y: 26, w: 18, h: 18});

  // Buttons Third Row
  image.push({color: border, x: 201, y: 46, w: 20, h: 20});
  image.push({color: clear, x: 202, y: 47, w: 18, h: 18});
  image.push({color: border, x: 222, y: 46, w: 20, h: 20});
  image.push({color: clear, x: 223, y: 47, w: 18, h: 18});
  image.push({color: border, x: 243, y: 46, w: 20, h: 20});
  image.push({color: clear, x: 244, y: 47, w: 18, h: 18});

  // Button Symbols
  image.push({color: border, x: 204, y: 13, w: 14, h: 2});

  image.push({color: border, x: 246, y: 13, w: 14, h: 2});
  image.push({color: border, x: 252, y: 7, w: 2, h: 14});

  image.push({color: border, x: 204, y: 34, w: 14, h: 2});
  image.push({color: border, x: 205, y: 33, w: 1, h: 4});
  image.push({color: border, x: 206, y: 32, w: 1, h: 6});
  image.push({color: border, x: 207, y: 31, w: 1, h: 8});
  image.push({color: border, x: 208, y: 30, w: 1, h: 3});
  image.push({color: border, x: 209, y: 30, w: 1, h: 2});
  image.push({color: border, x: 208, y: 37, w: 1, h: 3});
  image.push({color: border, x: 209, y: 38, w: 1, h: 2});

  image.push({color: border, x: 246, y: 34, w: 14, h: 2});
  image.push({color: border, x: 258, y: 33, w: 1, h: 4});
  image.push({color: border, x: 257, y: 32, w: 1, h: 6});
  image.push({color: border, x: 256, y: 31, w: 1, h: 8});
  image.push({color: border, x: 255, y: 30, w: 1, h: 3});
  image.push({color: border, x: 254, y: 30, w: 1, h: 2});
  image.push({color: border, x: 255, y: 37, w: 1, h: 3});
  image.push({color: border, x: 254, y: 38, w: 1, h: 2});

  image.push({color: border, x: 231, y: 7, w: 2, h: 14});
  image.push({color: border, x: 230, y: 8, w: 4, h: 1});
  image.push({color: border, x: 229, y: 9, w: 6, h: 1});
  image.push({color: border, x: 228, y: 10, w: 8, h: 1});
  image.push({color: border, x: 227, y: 11, w: 3, h: 1});
  image.push({color: border, x: 227, y: 12, w: 2, h: 1});
  image.push({color: border, x: 234, y: 11, w: 3, h: 1});
  image.push({color: border, x: 235, y: 12, w: 2, h: 1});

  image.push({color: border, x: 231, y: 49, w: 2, h: 14});
  image.push({color: border, x: 230, y: 61, w: 4, h: 1});
  image.push({color: border, x: 229, y: 60, w: 6, h: 1});
  image.push({color: border, x: 228, y: 59, w: 8, h: 1});
  image.push({color: border, x: 227, y: 58, w: 3, h: 1});
  image.push({color: border, x: 227, y: 57, w: 2, h: 1});
  image.push({color: border, x: 234, y: 58, w: 3, h: 1});
  image.push({color: border, x: 235, y: 57, w: 2, h: 1});

  image.push({color: border, x: 204, y: 62, w: 2, h: 1});
  image.push({color: border, x: 204, y: 61, w: 3, h: 1});
  image.push({color: border, x: 205, y: 60, w: 4, h: 1});
  image.push({color: border, x: 206, y: 59, w: 2, h: 1});
  image.push({color: border, x: 209, y: 59, w: 1, h: 1});
  image.push({color: border, x: 206, y: 58, w: 1, h: 1});
  image.push({color: border, x: 210, y: 58, w: 1, h: 1});
  image.push({color: border, x: 207, y: 57, w: 1, h: 1});
  image.push({color: border, x: 211, y: 57, w: 2, h: 1});
  image.push({color: border, x: 208, y: 56, w: 1, h: 1});
  image.push({color: border, x: 210, y: 56, w: 4, h: 1});
  image.push({color: border, x: 209, y: 55, w: 6, h: 1});
  image.push({color: border, x: 209, y: 54, w: 7, h: 1});
  image.push({color: border, x: 210, y: 53, w: 7, h: 1});
  image.push({color: border, x: 211, y: 52, w: 4, h: 1});
  image.push({color: border, x: 217, y: 52, w: 1, h: 1});
  image.push({color: border, x: 212, y: 51, w: 2, h: 1});
  image.push({color: border, x: 218, y: 51, w: 1, h: 1});
  image.push({color: border, x: 213, y: 50, w: 1, h: 1});
  image.push({color: border, x: 215, y: 50, w: 1, h: 1});
  image.push({color: border, x: 218, y: 50, w: 1, h: 1});
  image.push({color: border, x: 214, y: 49, w: 1, h: 1});
  image.push({color: border, x: 217, y: 49, w: 1, h: 1});
  image.push({color: border, x: 215, y: 48, w: 2, h: 1});
  
  image.push({color: border, x: 255, y: 50, w: 4, h: 3});
  image.push({color: clear, x: 256, y: 51, w: 2, h: 1});
  image.push({color: border, x: 247, y: 52, w: 12, h: 10});
  image.push({color: clear, x: 248, y: 53, w: 10, h: 8});
  image.push({color: border, x: 250, y: 55, w: 2, h: 1});
  image.push({color: border, x: 249, y: 56, w: 1, h: 2});
  image.push({color: border, x: 250, y: 58, w: 2, h: 1});
  image.push({color: border, x: 252, y: 56, w: 1, h: 2});
  image.push({color: border, x: 254, y: 55, w: 3, h: 3});


  // Left Window Target
  image.push({color: highlight, x: 69, y: 5, w: 128, h: 1});
  image.push({color: highlight, x: 69, y: 5, w: 1, h: 128});
  image.push({color: highlight, x: 69, y: 132, w: 128, h: 1});
  image.push({color: highlight, x: 196, y: 5, w: 1, h: 128});

  return image;

};

export default searchPage;
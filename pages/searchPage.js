import colors from './functions/resources/colors.js';

const searchPage = () => {

  const image = [];
  const {background, border, sidebar, clear} = colors.default;

  image.push({color: border, x: 0, y: 0, w: 400, h: 225});
  image.push({color: background, x: 65, y: 1, w: 334, h: 223});
  image.push({color: sidebar, x: 1, y: 1, w: 63, h: 223});
  image.push({color: border, x: 68, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 69, y: 5, w: 128, h: 128});
  image.push({color: border, x: 266, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 267, y: 5, w: 128, h: 128});
  image.push({color: border, x: 68, y: 138, w: 328, h: 83});
  image.push({color: clear, x: 69, y: 139, w: 326, h: 75});
  image.push({color: clear, x: 69, y: 215, w: 326, h: 5});

  return image;

};

export default searchPage;
import colors from './functions/resources/colors.js';
import writeText from './functions/writeText.js';

const searchPage = () => {

  const image = [];
  const {background, border, sidebar, clear} = colors.default;

  image.push({color: border, x: 65, y: 0, w: 335, h: 225});
  image.push({color: background, x: 65, y: 1, w: 334, h: 223});
  image.push({color: border, x: 68, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 69, y: 5, w: 128, h: 128});
  image.push({color: border, x: 266, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 267, y: 5, w: 128, h: 128});
  image.push({color: border, x: 68, y: 137, w: 328, h: 84});
  image.push({color: clear, x: 69, y: 138, w: 326, h: 76});
  image.push({color: clear, x: 69, y: 215, w: 326, h: 5});

  image.push({color: border, x: 201, y: 4, w: 20, h: 20});
  image.push({color: clear, x: 202, y: 5, w: 18, h: 18});
  image.push({color: border, x: 222, y: 4, w: 20, h: 20});
  image.push({color: clear, x: 223, y: 5, w: 18, h: 18});
  image.push({color: border, x: 243, y: 4, w: 20, h: 20});
  image.push({color: clear, x: 244, y: 5, w: 18, h: 18});

  image.push({color: border, x: 201, y: 25, w: 20, h: 20});
  image.push({color: clear, x: 202, y: 26, w: 18, h: 18});
  image.push({color: border, x: 222, y: 25, w: 20, h: 20});
  image.push({color: clear, x: 223, y: 26, w: 18, h: 18});
  image.push({color: border, x: 243, y: 25, w: 20, h: 20});
  image.push({color: clear, x: 244, y: 26, w: 18, h: 18});

  image.push({color: border, x: 201, y: 46, w: 20, h: 20});
  image.push({color: clear, x: 202, y: 47, w: 18, h: 18});
  image.push({color: border, x: 222, y: 46, w: 20, h: 20});
  image.push({color: clear, x: 223, y: 47, w: 18, h: 18});
  image.push({color: border, x: 243, y: 46, w: 20, h: 20});
  image.push({color: clear, x: 244, y: 47, w: 18, h: 18});

  return image;

};

export default searchPage;
import colors from './functions/resources/colors.js';
import writeText from './functions/writeText.js';

const photoPage = () => {

  const image = [];
  const {background, border, sidebar, clear} = colors.default;

  image.push({color: border, x: 65, y: 0, w: 335, h: 225});
  image.push({color: background, x: 65, y: 1, w: 334, h: 223});
  image.push({color: border, x: 100, y: 50, w: 130, h: 130});
  image.push({color: clear, x: 101, y: 51, w: 128, h: 128});
  return image;

};

export default photoPage;
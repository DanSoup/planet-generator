import colors from './functions/resources/colors.js';
import writeText from './functions/writeText.js';

const sidebarPage = (cursor, state) => {

  const image = [];
  const {background, border, sidebar, clear} = colors.default;

  image.push({color: border, x: 0, y: 0, w: 65, h: 225});
  image.push({color: sidebar, x: 1, y: 1, w: 63, h: 223});
  image.push(...writeText('space', border, 5, 5))
  image.push(...writeText('photography', border, 5, 11, [1, 2]))
  image.push(...writeText('idle', border, 46, 22))

  const button = (sX, sY, text) => {

    let hover = cursor.x > sX && cursor.x < sX + 57 && cursor.y > sY && cursor.y <= sY + 13; 
    if (cursor.b === 'down') hover = false;
    if (hover && cursor.b === 'click') state.page = text;

    image.push({color: border, x: sX, y: sY, w: 57, h: 13});
    image.push({color: !hover ? clear : background, x: sX + 1, y: sY + 1, w: 55, h: 11});
    image.push(...writeText(text, border, sX + 4, sY + 4));
  }

  button(4, 30, 'search');
  button(4, 46, 'photo');
  button(4, 62, 'cameras');
  button(4, 78, 'atlas');
  button(4, 94, 'shop');

  return image;

};

export default sidebarPage;
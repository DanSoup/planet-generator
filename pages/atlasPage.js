import colors from './functions/resources/colors.js';
import writeText from './functions/writeText.js';

let page = 3;

const atlasPage = (cursor, state) => {

  const image = [];
  const {background, border, sidebar, clear, highlight} = colors.default;

  // Background
  image.push({color: border, x: 65, y: 0, w: 335, h: 225});
  image.push({color: background, x: 65, y: 1, w: 334, h: 223});

  // Left Window
  image.push({color: border, x: 68, y: 4, w: 195, h: 130});
  image.push({color: clear, x: 69, y: 5, w: 193, h: 128});

  // Right Window
  image.push({color: border, x: 266, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 267, y: 5, w: 128, h: 128});

  // Space Objects

  state.cosmos.sort((a, b) => a.id - b.id).forEach((sO, oIndex) => {

    // Bar
    image.push({color: border, x: 68, y: 4 + oIndex * 11, w: 195, h: 12});
    
    const apparentRadius = Math.floor(sO.diameter / sO.distance) / 2;
    // Planet window
    image.push({color: clear, x: 69, y: 5 + oIndex * 11, w: 10, h: 10});
    image.push({color: clear, x: 80, y: 5 + oIndex * 11, w: 182, h: 10});
    image.push(...writeText(`${apparentRadius} - ${((sO.diameter / sO.distance) / 2).toString()}`, border, 81, 6 + oIndex * 11))

    // const apparentRadius = sO.radius;

    const origin = {x: 74 + apparentRadius % 1, y: 10 + oIndex * 11 + apparentRadius % 1};

    // if (apparentRadius >= 0.5 && sO.distance === 4) {
    if (apparentRadius >= 0.5) {
      for (let x = -0.5 - apparentRadius; x <= apparentRadius; x++) {
        for (let y = -0.5 - apparentRadius; y <= apparentRadius; y++) {
          if (x ** 2 + y ** 2 <= apparentRadius ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            image.push({color: sO.color, x: pixelX , y: pixelY, w: 1, h: 1})
          }
        };
      };
    }

  });

  return image;

};

export default atlasPage;
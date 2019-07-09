import colors from './functions/resources/colors.js';
import generatePlanet from './functions/generatePlanet.js';
import writeText from './functions/writeText.js';

const photoPage = () => {

  const planet = state.cosmos.find(object => object.id === state.selectedObject);
  const camera = state.cameras[0];

  const image = [];
  const {background, border, sidebar, selected, clear, highlight} = colors.default;

  const panLimit = 64 - 2 ** (6 - state.photoView.zoom);

  state.photoView.xZoomPos = Math.max(Math.min(panLimit, state.photoView.xZoomPos), -panLimit)
  state.photoView.yZoomPos = Math.max(Math.min(panLimit, state.photoView.yZoomPos), -panLimit)

  const {zoom, xZoomPos, yZoomPos} = state.photoView;

  const borderedBox = (x, y, w, h, borderColor = border, centerColor = clear) => {
    image.push({color: borderColor, x, y, w, h});
    image.push({color: centerColor, x: x + 1, y: y + 1, w: w - 2, h: h - 2});
  };

  const button = (x, y, w, h, icon = [], clickFunction = () => {}) => {
    let hover = false;
    let click = false;
    if (cursor.x >= x && cursor.x <= x + w && cursor.y >= y && cursor.y <= y + h) hover = true;
    if (hover && cursor.b === 'down') click = true;
    let firstColor = hover ? click ? selected : highlight : border;
    let secondColor = clear;
    borderedBox(x, y, w, h, firstColor, secondColor);
    icon.forEach((fill) => {
      image.push({color: firstColor, ...fill});
    });
    if (hover && cursor.b === 'click') clickFunction();
  }

  // Background
  borderedBox(64, 0, 336, 225, border, background);

  // Left Window
  borderedBox(68, 4, 130, 130, border, clear);

  // Right Window
  borderedBox(266, 4, 130, 130, border, clear);

  // Zoom Out Button
  button(201, 4, 20, 20, [
    {x: 204, y: 13, w: 14, h: 2}
  ], () => {
    state.photoView.zoom = Math.max(1, state.photoView.zoom) - 1;
  })

  // Zoom In Button
  button(243, 4, 20, 20, [
    {x: 246, y: 13, w: 14, h: 2},
    {x: 252, y: 7, w: 2, h: 14}
  ], () => {
    state.photoView.zoom = Math.min(5, state.photoView.zoom) + 1;
  });

  // Pan Up Button
  button(222, 4, 20, 20, [
    {x: 231, y: 7, w: 2, h: 14},
    {x: 230, y: 8, w: 4, h: 1},
    {x: 229, y: 9, w: 6, h: 1},
    {x: 228, y: 10, w: 8, h: 1},
    {x: 227, y: 11, w: 3, h: 1},
    {x: 227, y: 12, w: 2, h: 1},
    {x: 234, y: 11, w: 3, h: 1},
    {x: 235, y: 12, w: 2, h: 1}
  ], () => {
    state.photoView.yZoomPos = state.photoView.yZoomPos - Math.max(1, 2 ** (4 - zoom));
  });

  // Pan Left Button
  button(201, 25, 20, 20, [
    {x: 204, y: 34, w: 14, h: 2},
    {x: 205, y: 33, w: 1, h: 4},
    {x: 206, y: 32, w: 1, h: 6},
    {x: 207, y: 31, w: 1, h: 8},
    {x: 208, y: 30, w: 1, h: 3},
    {x: 209, y: 30, w: 1, h: 2},
    {x: 208, y: 37, w: 1, h: 3},
    {x: 209, y: 38, w: 1, h: 2},
  ], () => {
    state.photoView.xZoomPos = state.photoView.xZoomPos - Math.max(1, 2 ** (4 - zoom));
  });

  // Pan Right Button
  button(243, 25, 20, 20, [
    {x: 246, y: 34, w: 14, h: 2},
    {x: 258, y: 33, w: 1, h: 4},
    {x: 257, y: 32, w: 1, h: 6},
    {x: 256, y: 31, w: 1, h: 8},
    {x: 255, y: 30, w: 1, h: 3},
    {x: 254, y: 30, w: 1, h: 2},
    {x: 255, y: 37, w: 1, h: 3},
    {x: 254, y: 38, w: 1, h: 2}
  ], () => {
    state.photoView.xZoomPos = state.photoView.xZoomPos + Math.max(1, 2 ** (4 - zoom));
  });

  // Pan Down Button
  button(222, 46, 20, 20, [
    {x: 231, y: 49, w: 2, h: 14},
    {x: 230, y: 61, w: 4, h: 1},
    {x: 229, y: 60, w: 6, h: 1},
    {x: 228, y: 59, w: 8, h: 1},
    {x: 227, y: 58, w: 3, h: 1},
    {x: 227, y: 57, w: 2, h: 1},
    {x: 234, y: 58, w: 3, h: 1},
    {x: 235, y: 57, w: 2, h: 1},
  ], () => {
    state.photoView.yZoomPos = state.photoView.yZoomPos + Math.max(1, 2 ** (4 - zoom));
  });

  // Center Button
  button(222, 25, 20, 20, [
    {x: 228, y: 28, w: 8, h: 2},
    {x: 228, y: 40, w: 8, h: 2},
    {x: 225, y: 31, w: 2, h: 8},
    {x: 237, y: 31, w: 2, h: 8},
    {x: 227, y: 29, w: 2, h: 2},
    {x: 226, y: 30, w: 2, h: 2},
    {x: 235, y: 39, w: 2, h: 2},
    {x: 236, y: 38, w: 2, h: 2},
    {x: 227, y: 39, w: 2, h: 2},
    {x: 226, y: 38, w: 2, h: 2},
    {x: 235, y: 29, w: 2, h: 2},
    {x: 236, y: 30, w: 2, h: 2},
    {x: 231, y: 34, w: 2, h: 2},
  ]);


  button(243, 46, 20, 20, [
    {x: 255, y: 50, w: 4, h: 1},
    {x: 255, y: 51, w: 1, h: 1},
    {x: 258, y: 51, w: 1, h: 10},
    {x: 247, y: 52, w: 12, h: 1},
    {x: 247, y: 52, w: 1, h: 9},
    {x: 247, y: 61, w: 12, h: 1},
    {x: 254, y: 55, w: 3, h: 3},
    {x: 250, y: 55, w: 2, h: 1},
    {x: 250, y: 58, w: 2, h: 1},
    {x: 249, y: 56, w: 1, h: 2},
    {x: 252, y: 56, w: 1, h: 2}
  ]);

  button(201, 46, 20, 20, [
    {x: 204, y: 62, w: 2, h: 1},
    {x: 204, y: 61, w: 3, h: 1},
    {x: 205, y: 60, w: 4, h: 1},
    {x: 206, y: 59, w: 2, h: 1},
    {x: 209, y: 59, w: 1, h: 1},
    {x: 206, y: 58, w: 1, h: 1},
    {x: 210, y: 58, w: 1, h: 1},
    {x: 207, y: 57, w: 1, h: 1},
    {x: 211, y: 57, w: 2, h: 1},
    {x: 208, y: 56, w: 1, h: 1},
    {x: 210, y: 56, w: 4, h: 1},
    {x: 209, y: 55, w: 6, h: 1},
    {x: 209, y: 54, w: 7, h: 1},
    {x: 210, y: 53, w: 7, h: 1},
    {x: 211, y: 52, w: 4, h: 1},
    {x: 217, y: 52, w: 1, h: 1},
    {x: 212, y: 51, w: 2, h: 1},
    {x: 218, y: 51, w: 1, h: 1},
    {x: 213, y: 50, w: 1, h: 1},
    {x: 215, y: 50, w: 1, h: 1},
    {x: 218, y: 50, w: 1, h: 1},
    {x: 214, y: 49, w: 1, h: 1},
    {x: 217, y: 49, w: 1, h: 1},
    {x: 215, y: 48, w: 2, h: 1},
  ])  

  image.push(...generatePlanet(planet, camera, 69, 5, 128))
  image.push(...generatePlanet(planet, camera, 267, 5, 128, zoom, xZoomPos, yZoomPos))
  
  // Left Window Target
  image.push({color: highlight, x: 69 + 64 - (2 ** (6 - zoom)) + xZoomPos, y: 5 + 64 - (2 ** (6 - zoom)) + yZoomPos, w: 128 / (2 ** zoom), h: 1});
  image.push({color: highlight, x: 69 + 64 - (2 ** (6 - zoom)) + xZoomPos, y: 5 + 64 - (2 ** (6 - zoom)) + yZoomPos, w: 1, h: 128 / (2 ** zoom)});
  image.push({color: highlight, x: 69 + 64 - (2 ** (6 - zoom)) + xZoomPos, y: 132 + 64 - (2 ** (6 - zoom)) - (128 - 2 ** (7 - zoom)) + yZoomPos, w: 128 / (2 ** zoom), h: 1});
  image.push({color: highlight, x: 196 - (128 - 2 ** (7 - zoom)) + xZoomPos + 64 - (2 ** (6 - zoom)), y: 5 + 64 - (2 ** (6 - zoom)) + yZoomPos, w: 1, h: 128 / (2 ** zoom)});

  return image;
};

export default photoPage;
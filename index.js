// import generatePlanet from './functions/generatePlanet.js';
// import drawPlanet from './pages/functions/drawPlanet.js';
// import generateTerrain from './functions/generateTerrain.js';
import hexColor from './pages/functions/hexColor.js';
import searchPage from './pages/searchPage.js';

const mainCanvas = document.getElementById('mainCanvas');
const fpsDisplay = document.getElementById('fpsDisplay');
const ctx = mainCanvas.getContext('2d');

const scale = 5;
let frame = 0;

mainCanvas.setAttribute('height', 225 * scale);
mainCanvas.setAttribute('width', 400 * scale);

const draw = imageData => {
  imageData.forEach(({color, x, y, w, h}) => {
    ctx.fillStyle = hexColor(color)
    ctx.fillRect(x * scale, y * scale, w * scale, h * scale)
  })

  const debug = true;

  ctx.fillStyle = '#FF000080';
  if (debug) {
    for (let y = 0; y < 225; y++) {
      ctx.fillRect(0, y * scale, 400 * scale, 1)
    };
    for (let x = 0; x < 400; x++) {
      ctx.fillRect(x * scale, 0, 1, 225 * scale)
    };
  };

};

const advanceFrame = timestamp => {

  ctx.clearRect(0, 0, 400 * scale, 225 * scale)
  const imageData = [{color: {r: 1, g: 0, b: 0, a: 1}, x: 100, y: 0, w: 100, h: 200}];

  imageData.push(...searchPage());

  draw(imageData)
  
  setTimeout(() => window.requestAnimationFrame(advanceFrame), 1000 / 60);
};

window.requestAnimationFrame(advanceFrame);

// drawPlanet(mainCanvas)
// generateTerrain(mainCanvas)
// import generatePlanet from './functions/generatePlanet.js';
// import drawPlanet from './pages/functions/drawPlanet.js';
// import generateTerrain from './functions/generateTerrain.js';
import hexColor from './pages/functions/hexColor.js';
import searchPage from './pages/searchPage.js';
import sidebarPage from './pages/sidebarPage.js';
import photoPage from './pages/photoPage.js';
import xorshift from './pages/functions/xorshift.js';

const mainCanvas = document.getElementById('mainCanvas');
const fpsDisplay = document.getElementById('fpsDisplay');
const ctx = mainCanvas.getContext('2d');

const scale = 3;
let frame = 0;
let seed = 100;

const state = {
  initialSeed: seed,
  planetSeed: seed + 1,
  page: 'search',
  cosmos: [

  ]
}

class SpaceObject {
  constructor () {
    this.id = state.cosmos.length + 1;
    this.seed = state.planetSeed;
  };
  get diameter () {
    const min = this.distance;
    const max = Math.min(min * 8, 1000000000)
    const size = Math.floor((((xorshift(this.seed, 1) % 1001) / 1000) * (max - min)) + min)
    return size;
  };
  get radius () {
    return this.diameter / 2;
  };
  get x () {
    return Math.floor((xorshift(this.seed, 2) % (128 ** 2)) / 128);
  };
  get y () {
    return Math.floor((xorshift(this.seed, 3) % (128 ** 2)) / 128);
  };
  get color () {
    return {
      r: xorshift(this.seed, 4) / 100 % 1,
      g: xorshift(this.seed, 4) / 10000 % 1,
      b: xorshift(this.seed, 4) / 1000000 % 1,
      a: 1
    }
  };
  get distance () {
    return (xorshift(this.seed, 5) % 1000000000) + 1;
  }
}

const createObject = () => {
  state.planetSeed = xorshift(state.planetSeed);
  state.cosmos.push(new SpaceObject());
}

for (let i = 0; i < 10; i++) {
  createObject();
}

state.cosmos.forEach(sO => {
  // console.log(sO.diameter, sO.x, sO.y)
  // console.log(sO.diameter / sO.distance, sO.x, sO.y)    

})

mainCanvas.setAttribute('height', 225 * scale);
mainCanvas.setAttribute('width', 400 * scale);

const draw = imageData => {
  imageData.forEach(({color, x, y, w, h}) => {
    ctx.fillStyle = hexColor(color)
    ctx.fillRect(x * scale, y * scale, w * scale, h * scale)
  })

  const debug = 0;

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

let cursor = {x: 0, y: 0, b: 'up'};

const getMousePos = evt => {
  var rect = mainCanvas.getBoundingClientRect();
  cursor.x = Math.floor((evt.clientX - rect.left) / scale);
  cursor.y = Math.floor((evt.clientY - rect.top) / scale);
}

const handleMouseDown = e => {
  cursor.b = 'down';
}

const handleMouseUp = e => {
  cursor.b = 'click';  
}

mainCanvas.addEventListener('mousemove', getMousePos);
mainCanvas.addEventListener('mousedown', handleMouseDown);
mainCanvas.addEventListener('mouseup', handleMouseUp);

const advanceFrame = timestamp => {

  ctx.clearRect(0, 0, 400 * scale, 225 * scale)
  const imageData = [{color: {r: 1, g: 0, b: 0, a: 1}, x: 100, y: 0, w: 100, h: 200}];

  imageData.push(...sidebarPage(cursor,  state));
  if (state.page === 'search') imageData.push(...searchPage(cursor, state));
  if (state.page === 'photo') imageData.push(...photoPage(cursor));

  draw(imageData)
  
  if (cursor.b === 'click') cursor.b = 'up';
  setTimeout(() => window.requestAnimationFrame(advanceFrame), 1000 / 60);
};

window.requestAnimationFrame(advanceFrame);

// drawPlanet(mainCanvas)
// generateTerrain(mainCanvas)
import hexColor from './pages/functions/hexColor.js';
import searchPage from './pages/searchPage.js';
import sidebarPage from './pages/sidebarPage.js';
import photoPage from './pages/photoPage.js';
import atlasPage from './pages/atlasPage.js';
import xorshift from './pages/functions/xorshift.js';
import writeText from './pages/functions/writeText.js';

const mainCanvas = document.getElementById('mainCanvas');
const ctx = mainCanvas.getContext('2d');

const scale = 4;
let lastFrame = 0;
let seed = 104;
const fpsArray = [];

window.state = {
  initialSeed: seed,
  planetSeed: seed + 1,
  page: 'photo',
  cosmos: [],
  chosenObject: 5,
  cameras: [
    {
      id: 1,
      resolution: 17,
      light: 2,
      zoom: 10,
      color: 0
    }
  ]
}

// setInterval(() => window.state.cameras[0].zoom *= 1.05, 100)

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
  if (state.page === 'atlas') imageData.push(...atlasPage(cursor, state));

  const fps = Math.round(100000 / (Date.now() - lastFrame)) / 100;
  lastFrame = Date.now();

  fpsArray.push(fps)

  if (fpsArray.length > 60) fpsArray.shift();

  const averageFps = fpsArray.reduce((acc, ele) => {
    return acc + ele / fpsArray.length;
  }, 0);

  imageData.push(...writeText(averageFps.toString(10), {r: 1, g: 1, b: 1, a: 1}, 4, 216))

  draw(imageData);
  
  if (cursor.b === 'click') cursor.b = 'up';
  setTimeout(() => window.requestAnimationFrame(advanceFrame), 10000);
  // setTimeout(() => advanceFrame(), 1000 / 100);
};

window.requestAnimationFrame(advanceFrame);

// drawPlanet(mainCanvas)
// generateTerrain(mainCanvas)
import generatePlanet from './functions/generatePlanet.js';
import drawPlanet from './pages/functions/drawPlanet.js';
import generateTerrain from './functions/generateTerrain.js';

const mainCanvas = document.getElementById('mainCanvas');

drawPlanet(mainCanvas)
// generateTerrain(mainCanvas)
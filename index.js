import generatePlanet from './functions/generatePlanet.js';
import drawPlanet from './functions/drawPlanet.js';
import generateTerrain from './functions/generateTerrain.js';

const mainCanvas = document.getElementById('mainCanvas');

drawPlanet(mainCanvas)
// generateTerrain(mainCanvas)
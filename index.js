import generatePlanet from './functions/generatePlanet.js';
import drawPlanet from './functions/drawPlanet.js';

const planet = generatePlanet()

console.log(planet)

const mainCanvas = document.getElementById('mainCanvas')

drawPlanet(mainCanvas, planet)
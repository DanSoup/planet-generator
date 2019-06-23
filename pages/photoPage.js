import colors from './functions/resources/colors.js';
import generatePlanet from './functions/generatePlanet.js';
import writeText from './functions/writeText.js';

const photoPage = () => {

  const planet = state.cosmos.find(object => object.id === state.chosenObject);
  const camera = state.cameras[0];

  const image = [];
  const {background, border, sidebar, clear} = colors.default;

  // Background
  image.push({color: border, x: 65, y: 0, w: 335, h: 225});
  image.push({color: background, x: 65, y: 1, w: 334, h: 223});

  // Photo Area
  image.push({color: border, x: 68, y: 4, w: 130, h: 130});
  image.push({color: clear, x: 69, y: 5, w: 128, h: 128});
  
  image.push(...generatePlanet(planet, camera, 69, 5, 128))
  
  return image;
};

export default photoPage;
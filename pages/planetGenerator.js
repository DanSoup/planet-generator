import drawPlanet from './functions/drawPlanet.js';

const inputChange = () => {
  const xRot = document.getElementById('xRot').value;
  const yRot = document.getElementById('yRot').value;
  const zRot = document.getElementById('zRot').value;
  const radius = document.getElementById('radius').value;
  const nColor = document.getElementById('nColor').value;
  const eColor = document.getElementById('eColor').value;
  const sColor = document.getElementById('sColor').value;

  document.getElementById('xRotDis').innerText = xRot;
  document.getElementById('yRotDis').innerText = yRot;
  document.getElementById('zRotDis').innerText = zRot;
  document.getElementById('radiusDis').innerText = radius;
  document.getElementById('nColorDis').innerText = nColor;
  document.getElementById('eColorDis').innerText = eColor;
  document.getElementById('sColorDis').innerText = sColor;
};

inputChange();

const generatePlanet = () => {
  console.log(xRot);
  console.log(yRot);
  console.log(zRot);
  console.log(radius);
  console.log(nColor);
  console.log(eColor);
  console.log(sColor);
  const canvas = document.getElementById('mainCanvas')
  drawPlanet(canvas)
};

// const xRot = document.getElementById('xRot').value;
// const yRot = document.getElementById('yRot').value;
// const zRot = document.getElementById('zRot').value;
// const radius = document.getElementById('radius').value;
// const nColor = document.getElementById('nColor').value;
// const eColor = document.getElementById('eColor').value;
// const sColor = document.getElementById('sColor').value;

// const inputChange = () => {
//   document.getElementById('xRot').innerText = xRot;
// };

const htmlSetup = () => {
  document.getElementById('xRot').addEventListener('change', inputChange);
  document.getElementById('yRot').addEventListener('change', inputChange);
  document.getElementById('zRot').addEventListener('change', inputChange);
  document.getElementById('radius').addEventListener('change', inputChange);
  document.getElementById('nColor').addEventListener('change', inputChange);
  document.getElementById('eColor').addEventListener('change', inputChange);
  document.getElementById('sColor').addEventListener('change', inputChange);
  document.getElementById('generateButton').addEventListener('click', generatePlanet);
}

htmlSetup();
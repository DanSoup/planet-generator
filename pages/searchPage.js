import colors from './functions/resources/colors.js';
import writeText from './functions/writeText.js';

let page = 3;

const searchPage = () => {

  const image = [];
  const {background, border, sidebar, clear, highlight, selected} = colors.default;
  let zoom = state.searchView.length;
  const rightWindowOffsetX = state.searchView.reduce((acc, offset, index) => acc + offset[0] * 2 ** index, 0);
  const rightWindowOffsetY = state.searchView.reduce((acc, offset, index) => acc + offset[1] * 2 ** index, 0);
  const leftWindowOffsetX = state.searchView.slice(1).reduce((acc, offset, index) => acc + offset[0] * 2 ** index, 0);
  const leftWindowOffsetY = state.searchView.slice(1).reduce((acc, offset, index) => acc + offset[1] * 2 ** index, 0);
  const targetWindowOffsetX = state.searchView[0][0]
  const targetWindowOffsetY = state.searchView[0][1]

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
    if (state.searchView.length > 1) state.searchView.shift();
  })

  // Zoom In Button
  button(243, 4, 20, 20, [
    {x: 246, y: 13, w: 14, h: 2},
    {x: 252, y: 7, w: 2, h: 14}
  ], () => {
    state.searchView.unshift([...state.searchView[0]]);
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
    state.searchView[0][1] = Math.max(state.searchView[0][1] - 4, -32);
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
    state.searchView[0][0] = Math.max(state.searchView[0][0] - 4, -32);
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
    state.searchView[0][0] = Math.min(state.searchView[0][0] + 4, 32);
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
    state.searchView[0][1] = Math.min(state.searchView[0][1] + 4, 32);
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

  // Button Symbols

  // image.push({color: border, x: 246, y: 13, w: 14, h: 2});
  // image.push({color: border, x: 252, y: 7, w: 2, h: 14});

  

  







  
  
  

  // Space Objects

  let hoverPlanetId = 0

  // Left cosmos view
  state.cosmos.sort((a, b) => b.distance - a.distance).forEach(sO => {

    const apparentRadius = Math.floor(2 ** (zoom - 1) * sO.diameter / sO.distance) / 2;
    // const apparentRadius = sO.radius;

    const origin = {x: sO.x * 2 ** (zoom - 1) + 64 - 2 ** (5 + zoom) + 69 + apparentRadius % 1 - leftWindowOffsetX * 2, y: sO.y * 2 ** (zoom - 1) + 5 + 64 - 2 ** (5 + zoom) + apparentRadius % 1 - leftWindowOffsetY * 2};

    const chosen = sO.id == state.chosenObject;
    let hover = false;

    if (chosen) {
      for (let x = -1.5 - apparentRadius; x <= apparentRadius + 1; x++) {
        for (let y = -1.5 - apparentRadius; y <= apparentRadius + 1; y++) {
          if (x ** 2 + y ** 2 <= (apparentRadius + 1) ** 2 && x ** 2 + y ** 2 >= (apparentRadius) ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            if (!(pixelX < 69 || pixelX > 69 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              image.push({color: selected, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

    // if (apparentRadius >= 0.5 && sO.distance === 4) {
    if (apparentRadius >= 0.5) {
      for (let x = -0.5 - apparentRadius; x <= apparentRadius; x++) {
        for (let y = -0.5 - apparentRadius; y <= apparentRadius; y++) {
          // console.log(x, y, x ** 2 + y ** 2 <= apparentRadius ** 2)
          if (x ** 2 + y ** 2 <= apparentRadius ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            if (!(pixelX < 69 || pixelX > 69 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              if (!hover && cursor.x === Math.floor(origin.x + x) && cursor.y === Math.floor(origin.y + y)) hover = true;
              image.push({color: sO.color, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

    if (hover && cursor.b === 'click') state.chosenObject = sO.id;

    if (hover) {
      hoverPlanetId = sO.id;
      for (let x = -1.5 - apparentRadius; x <= apparentRadius + 1; x++) {
        for (let y = -1.5 - apparentRadius; y <= apparentRadius + 1; y++) {
          if (x ** 2 + y ** 2 <= (apparentRadius + 1) ** 2 && x ** 2 + y ** 2 >= (apparentRadius) ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            if (!(pixelX < 69 || pixelX > 69 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              image.push({color: highlight, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

  });

  // Right cosmos view
  state.cosmos.sort((a, b) => b.distance - a.distance).forEach(sO => {

    const apparentRadius = Math.floor((2 ** zoom) * sO.diameter / sO.distance) / 2;
    // const apparentRadius = sO.radius;

    const planetAdjustedX = sO.x

    const origin = {x: sO.x * 2 ** zoom + 64 - 2 ** (6 + zoom) + 267 + apparentRadius % 1 - rightWindowOffsetX * 2, y: sO.y * 2 ** zoom + 64 - 2 ** (6 + zoom) + 5 + apparentRadius % 1 - rightWindowOffsetY * 2};

    const chosen = sO.id == state.chosenObject;
    let hover = false;

    if (chosen) {
      for (let x = -1.5 - apparentRadius; x <= apparentRadius + 1; x++) {
        for (let y = -1.5 - apparentRadius; y <= apparentRadius + 1; y++) {
          if (x ** 2 + y ** 2 <= (apparentRadius + 1) ** 2 && x ** 2 + y ** 2 >= (apparentRadius) ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            if (!(pixelX < 267 || pixelX > 267 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              image.push({color: selected, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

    // if (apparentRadius >= 0.5 && sO.distance === 4) {
    if (apparentRadius >= 0.5) {
      for (let x = -0.5 - apparentRadius; x <= apparentRadius; x++) {
        for (let y = -0.5 - apparentRadius; y <= apparentRadius; y++) {
          // console.log(x, y, x ** 2 + y ** 2 <= apparentRadius ** 2)
          if (x ** 2 + y ** 2 <= apparentRadius ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            if (!(pixelX < 267 || pixelX > 267 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              if (!hover && cursor.x === Math.floor(origin.x + x) && cursor.y === Math.floor(origin.y + y)) hover = true;
              image.push({color: sO.color, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

    if (hover && cursor.b === 'click') state.chosenObject = sO.id;

    if (hover) {
      hoverPlanetId = sO.id;
      for (let x = -1.5 - apparentRadius; x <= apparentRadius + 1; x++) {
        for (let y = -1.5 - apparentRadius; y <= apparentRadius + 1; y++) {
          if (x ** 2 + y ** 2 <= (apparentRadius + 1) ** 2 && x ** 2 + y ** 2 >= (apparentRadius) ** 2) {
            const pixelX = Math.floor(origin.x + x);
            const pixelY = Math.floor(origin.y + y);
            if (!(pixelX < 267 || pixelX > 267 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              image.push({color: highlight, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

  });

  // Left Window Target

  image.push({color: highlight, x: 69 + 32 + targetWindowOffsetX, y: 5 + 32 + targetWindowOffsetY, w: 64, h: 1});
  image.push({color: highlight, x: 69 + 32 + targetWindowOffsetX, y: 5 + 32 + targetWindowOffsetY, w: 1, h: 64});
  image.push({color: highlight, x: 69 + 32 + targetWindowOffsetX, y: 132 - 32 + targetWindowOffsetY, w: 64, h: 1});
  image.push({color: highlight, x: 196 - 32 + targetWindowOffsetX, y: 5 + 32 + targetWindowOffsetY, w: 1, h: 64});

  // Forward/ Backwards page

  const leftPageButton = () => {

    let hover = cursor.x > 337 && cursor.x < 337 + 29 && cursor.y > 137 && cursor.y <= 137 + 66; 
    if (cursor.b === 'down') hover = false;
    if (hover && cursor.b === 'click') page = Math.max(page - 1, 1);

    image.push({color: hover ? clear : border, x: 337, y: 137, w: 29, h: 66});
    image.push({color: hover ? border : clear, x: 338, y: 138, w: 27, h: 64});
    image.push({color: hover ? clear : border, x: 340, y: 140, w: 23, h: 60});

  };

  leftPageButton();

  const rightPageButton = () => {

    let hover = cursor.x > 367 && cursor.x < 367 + 29 && cursor.y > 137 && cursor.y <= 137 + 66; 
    if (cursor.b === 'down') hover = false;
    if (hover && cursor.b === 'click') page = Math.min(page + 1, 4);

    image.push({color: hover ? clear : border, x: 367, y: 137, w: 29, h: 66});
    image.push({color: hover ? border : clear, x: 368, y: 138, w: 27, h: 64});
    image.push({color: hover ? clear : border, x: 370, y: 140, w: 23, h: 60});

  };

  rightPageButton();

  image.push(...writeText(`page ${page}/4`, border, 337, 205))


  state.cosmos.sort((a, b) => a.id - b.id).slice((page - 1) * 4, page * 4).forEach((sO, i) => {

    const apparentRadius = Math.floor(sO.diameter / sO.distance) / 2;

    const origin = {x: 101 + (67 * i) + apparentRadius % 1, y: 170 + apparentRadius % 1};
    const mapOriginLeft = {x: sO.x + 69 + apparentRadius % 1, y: sO.y + 5 + apparentRadius % 1};
    const mapOriginRight = {x: sO.x * 2 - 64 + 267 + (apparentRadius * 2) % 1, y: sO.y * 2 - 64 + 5 + (apparentRadius * 2) % 1};
    // const origin = {x: 200, y: 100};

    const hover = cursor.x >= 68 + 67 * i && cursor.x < 68 + 67 * i + 66 && cursor.y >= 137 && cursor.y < 137 + 76 || hoverPlanetId === sO.id;
    const chosen = sO.id == state.chosenObject;
    if (hover && cursor.b === 'click') state.chosenObject = sO.id;

    let bgColor;
    
    if (hover) bgColor = highlight;
    else if (chosen) bgColor = selected;
    else bgColor = border;

    image.push({color: bgColor, x: 68 + 67 * i, y: 137, w: 66, h: 76});
    image.push({color: clear, x: 69 + 67 * i, y: 138, w: 64, h: 64});
    image.push({color: clear, x: 69 + 67 * i, y: 203, w: 64, h: 9});
    image.push(...writeText(sO.id.toString(), border, 70 + 67 * i, 205));

    // if (chosen) {
    //   for (let x = -1.5 - apparentRadius; x <= apparentRadius + 1; x++) {
    //     for (let y = -1.5 - apparentRadius; y <= apparentRadius + 1; y++) {
    //       if (x ** 2 + y ** 2 <= (apparentRadius + 1) ** 2) {
    //         const pixelX = Math.floor(origin.x + x);
    //         const pixelY = Math.floor(origin.y + y);
    //         image.push({color: selected, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
    //       }
    //     };
    //   };
    // }

    if (hover) {
      for (let x = -1.5 - apparentRadius; x <= apparentRadius + 1; x++) {
        for (let y = -1.5 - apparentRadius; y <= apparentRadius + 1; y++) {
          if (x ** 2 + y ** 2 <= (apparentRadius + 1) ** 2 && x ** 2 + y ** 2 >= (apparentRadius) ** 2) {
            const pixelX = Math.floor(mapOriginLeft.x + x);
            const pixelY = Math.floor(mapOriginLeft.y + y);
            if (!(pixelX < 69 || pixelX > 69 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              image.push({color: highlight, x: Math.floor(mapOriginLeft.x + x) , y: Math.floor(mapOriginLeft.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

    if (hover) {
      let apparentRadiusRight = apparentRadius * 2
      for (let x = -1.5 - apparentRadiusRight; x <= apparentRadiusRight + 1; x++) {
        for (let y = -1.5 - apparentRadiusRight; y <= apparentRadiusRight + 1; y++) {
          if (x ** 2 + y ** 2 <= (apparentRadiusRight + 1) ** 2 && x ** 2 + y ** 2 >= (apparentRadiusRight) ** 2) {
            const pixelX = Math.floor(mapOriginRight.x + x);
            const pixelY = Math.floor(mapOriginRight.y + y);
            if (!(pixelX < 267 || pixelX > 267 + 127 || pixelY < 5 || pixelY > 5 + 127)) {
              image.push({color: highlight, x: Math.floor(mapOriginRight.x + x) , y: Math.floor(mapOriginRight.y + y), w: 1, h: 1})
            }
          }
        };
      };
    }

    for (let x = -0.5 - apparentRadius; x <= apparentRadius; x++) {
      for (let y = -0.5 - apparentRadius; y <= apparentRadius; y++) {
        if (x ** 2 + y ** 2 <= apparentRadius ** 2) {
          const pixelX = Math.floor(origin.x + x);
          const pixelY = Math.floor(origin.y + y);
          image.push({color: sO.color, x: Math.floor(origin.x + x) , y: Math.floor(origin.y + y), w: 1, h: 1})
        }
      };
    };

  });

  return image;

};

export default searchPage;
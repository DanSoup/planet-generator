const cellularAutomata = (seed, generations, rules) => {

  const width = seed.length;

  let currentGen = [...seed];

  for (let k = 0; k < generations; k++) {
    const nextGen = [];
    for (let i = 0; i < width; i++) {
      const li = (i - 1 + width) % width;
      const ri = (i + 1) % width;
      const currentRule = [parseInt(currentGen[li], 10), parseInt(currentGen[i], 10), parseInt(currentGen[ri], 10)].join('');
      if (rules.includes(currentRule)) nextGen[i] = 1;
      else {
        nextGen[i] = 0;
      }
    };
    currentGen = [...nextGen];
  };

  return [...currentGen];

};

export default cellularAutomata;
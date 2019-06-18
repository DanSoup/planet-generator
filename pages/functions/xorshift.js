const xorshift = (seed, shifts = 1) => {

  for (let i = 0; i < shifts; i++) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
  }

  return Math.abs(seed & ((2 ** 32) - 1));

}

export default xorshift;
const xorshift = (seed) => {

  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;

  return seed & ((2 ** 32) - 1);

}

export default xorshift;
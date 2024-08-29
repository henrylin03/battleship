// helper to generate random array of coordinates
const generateRandomCoordinates = () => {
  const MIN = 0;
  const MAX = 9;
  let res = [0, 0];

  res[0] = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  res[1] = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  return res;
};

const generateRandomBoolean = () => Math.random() < 0.5;

export { generateRandomCoordinates, generateRandomBoolean };

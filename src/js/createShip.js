const createShip = (length) => {
  let hitCount = 0;

  const hit = () => hitCount++;
  const isSunk = () => hitCount === length;

  const getLength = () => length;

  return { getLength, hit, isSunk };
};

export default createShip;

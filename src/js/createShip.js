const createShip = (length = 1) => {
  let hitCount = 0;

  const hit = () => hitCount++;
  const isSunk = () => hitCount === length;

  return { hit, isSunk };
};

export default createShip;

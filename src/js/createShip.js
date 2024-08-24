const createShip = (length) => {
  let hitCount = 0;

  const hit = () => hitCount++;
  const isSunk = () => hitCount === length;

  return {
    getLength: () => length,
    hit,
    isSunk,
  };
};

export default createShip;

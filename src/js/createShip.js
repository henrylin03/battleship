// helpers
const isOutOfBounds = (coordinates) => coordinates.some((c) => c < 0 || c > 9);

const createShip = (length) => {
  const coordinates = [...Array(length)].map(() => Array(2).fill(0));
  let hitCount = 0;

  const hit = () => hitCount++;
  const isSunk = () => hitCount === length;

  const getLength = () => length;
  const getCoordinates = () => coordinates;

  const setCoordinates = (start, isHorizontal) => {
    if (isOutOfBounds(start))
      throw new Error(
        "The ship has to start between [0, 0] and [9, 9] to be on the board",
      );

    const coordinateUnchanged = isHorizontal ? 1 : 0;
    const coordinateChanged = isHorizontal ? 0 : 1;
    const isDecrementing = () => {
      const maxChangedCoordinate = start[coordinateChanged] + length;
      return maxChangedCoordinate < 0 || maxChangedCoordinate > 9;
    };

    coordinates[0] = start;
    for (let i = 1; i < length; i++) {
      coordinates[i][coordinateUnchanged] = start[coordinateUnchanged];
      coordinates[i][coordinateChanged] = isDecrementing()
        ? coordinates[i - 1][coordinateChanged] - 1
        : coordinates[i - 1][coordinateChanged] + 1;
    }
  };

  return { getCoordinates, getLength, hit, isSunk, setCoordinates };
};

export default createShip;

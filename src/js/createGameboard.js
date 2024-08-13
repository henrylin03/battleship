import createShip from "./createShip";

const createGameboard = () => {
  const ships = {
    carrier: createShip(5),
    battleship: createShip(4),
    destroyer: createShip(3),
    submarine: createShip(3),
    patrolBoat: createShip(2),
  };
  const coordinatesWithShip = {};
  const misses = new Set();

  const getShips = () => ships;
  const getAllCoordinatesWithShip = () => coordinatesWithShip;
  const getMisses = () => misses;

  const placeShip = (shipType, startCoordinates, isHorizontal) => {
    const shipObject = ships[shipType];
    const shipLength = shipObject.getLength();
    const shipCoordinates = new Array(shipLength)
      .fill()
      .map(() => [...startCoordinates]);

    // if placing ship normally means its tail sticks out of the board, we flip it (still keeping its orientation)
    const needToFlipShip = () => {
      // if ship is horizontal, keep row index of coordinates arr (1st elem) steady, only changing column index (2nd elem)
      const indexOfChangingCoordinate = isHorizontal ? 0 : 1;
      const endCoordinatesOfShip = isHorizontal
        ? startCoordinates[indexOfChangingCoordinate] + shipLength
        : startCoordinates[indexOfChangingCoordinate] - shipLength;

      return endCoordinatesOfShip < 0 || endCoordinatesOfShip > 9;
    };

    for (let i = 1; i < shipLength; i++) {
      if (isHorizontal)
        shipCoordinates[i][0] = needToFlipShip()
          ? shipCoordinates[i - 1][0] - 1
          : shipCoordinates[i - 1][0] + 1;
      else
        shipCoordinates[i][1] = needToFlipShip()
          ? shipCoordinates[i - 1][1] + 1
          : shipCoordinates[i - 1][1] - 1;
    }

    shipCoordinates.forEach(
      (coordinates) =>
        (coordinatesWithShip[JSON.stringify(coordinates)] = shipType),
    );
  };

  const receiveAttack = (coordinates) => {
    const coordinatesStr = JSON.stringify(coordinates);

    if (coordinatesStr in coordinatesWithShip) {
      const shipType = coordinatesWithShip[coordinatesStr];
      ships[shipType].hit();
    } else misses.add(coordinatesStr);

    // todo: you cannot attack coordinates that have either been misses or hit
  };

  const allShipsSunk = () => {
    const statuses = [];
    for (const shipType in ships) statuses.push(ships[shipType].isSunk());
    return statuses.every((s) => s);
  };

  return {
    allShipsSunk,
    getAllCoordinatesWithShip,
    getMisses,
    getShips,
    placeShip,
    receiveAttack,
  };
};

export default createGameboard;

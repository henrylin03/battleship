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

  const getCoordinatesWithShip = () => coordinatesWithShip;
  const getMisses = () => misses;

  const placeShip = (shipType, startCoordinates, isHorizontal) => {
    const ship = ships[shipType];
    ship.setCoordinates(startCoordinates, isHorizontal);

    const shipCoordinates = ship.getCoordinates();
    shipCoordinates.forEach((coordinates) => {
      const coordinatesStr = JSON.stringify(coordinates);

      if (coordinatesStr in coordinatesWithShip)
        throw new Error(
          "There is already a ship there. Please place ship in another array of coordinates.",
        );

      coordinatesWithShip[coordinatesStr] = shipType;
    });
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
    getCoordinatesWithShip,
    getMisses,
    placeShip,
    receiveAttack,
  };
};

export default createGameboard;

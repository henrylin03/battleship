import createShip from "./createShip";

const createGameboard = () => {
  const ships = {
    carrier: createShip(5),
    battleship: createShip(4),
    destroyer: createShip(3),
    submarine: createShip(3),
    patrolBoat: createShip(2),
  };
  const coordinatesWithShip = new Set();

  const placeShip = (shipType, startCoordinates, isHorizontal) => {
    const ship = ships[shipType];
    ship.setCoordinates(startCoordinates, isHorizontal);

    const shipCoordinates = ship.getCoordinates();
    shipCoordinates.forEach((coordinates) => {
      if (coordinatesWithShip.has(JSON.stringify(coordinates)))
        throw new Error(
          "There is already a ship there. Please place ship in another array of coordinates.",
        );
      coordinatesWithShip.add(JSON.stringify(coordinates));
    });
  };

  return { placeShip };
};

export default createGameboard;

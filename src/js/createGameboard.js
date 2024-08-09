import createShip from "./createShip";

// helper to check if arrays are the same
const isSame = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

const createGameboard = () => {
  const ships = {
    carrier: createShip(5),
    battleship: createShip(4),
    destroyer: createShip(3),
    submarine: createShip(3),
    patrolBoat: createShip(2),
  };
  const coordinatesWithShip = {};
  const coordinatesMiss = new Set();

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
    // a part of the ship is at attacked coordinates
    if (coordinatesWithShip.has(JSON.stringify(coordinates))) {
      // the specific ship takes a hit - //todo: we need to track which of the ships is in which position... maybe an object would be better rather than just coordinates??
    }

    // todo: you cannot attack coordinates that have either been missed or hit

    // check if attack hit a ship
    // if yes, send .hit() to ship
    // if no, records coordinates of missed shot
  };

  return { placeShip, receiveAttack };
};

export default createGameboard;

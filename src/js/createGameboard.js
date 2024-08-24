import createShip from "./createShip";
import createSquare from "./createSquare";

const createGameboard = () => {
  const ships = {
    carrier: createShip(5),
    battleship: createShip(4),
    destroyer: createShip(3),
    submarine: createShip(3),
    patrolBoat: createShip(2),
  };

  let board = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => createSquare()),
  );

  const reset = () =>
    (board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => createSquare()),
    ));

  const printBoard = () =>
    board.map((row) => row.map((square) => square.view()));

  const placeShip = (shipType, startCoordinates, isHorizontal) => {
    const shipObject = ships[shipType];
    const shipLength = shipObject.getLength();
    const shipCoordinates = new Array(shipLength)
      .fill()
      .map(() => [...startCoordinates]);

    const isClashing = () =>
      shipCoordinates.some((coordinates) => {
        const square = board[coordinates[0]][coordinates[1]];
        return square.shipType() !== null;
      });

    // if placing ship means its tail sticks out of gameboard, we flip it (still keeping its orientation)
    const needToFlipShip = () => {
      // if ship is horizontal, keep row index of coordinates arr (1st elem) steady, only changing column index (2nd elem)
      const indexOfChangingCoordinate = isHorizontal ? 0 : 1;
      const endCoordinatesOfShip = isHorizontal
        ? startCoordinates[indexOfChangingCoordinate] + shipLength
        : startCoordinates[indexOfChangingCoordinate] - shipLength;

      return endCoordinatesOfShip < 0 || endCoordinatesOfShip > 9;
    };

    // 1st coordinate (elem 0) is startCoordinates, already prepopulated
    for (let i = 1; i < shipCoordinates.length; i++) {
      if (isHorizontal)
        shipCoordinates[i][0] = needToFlipShip()
          ? shipCoordinates[i - 1][0] - 1
          : shipCoordinates[i - 1][0] + 1;
      else
        shipCoordinates[i][1] = needToFlipShip()
          ? shipCoordinates[i - 1][1] + 1
          : shipCoordinates[i - 1][1] - 1;
    }

    if (isClashing())
      throw new Error(
        `The current ship, ${shipType}, is colliding with 1+ other ships`,
      );

    shipCoordinates.forEach((coordinates) => {
      const square = board[coordinates[0]][coordinates[1]];
      square.setShipType(shipType);
    });
  };

  // returns true if hit, false if miss
  const receiveAttack = (coordinates) => {
    const square = board[coordinates[0]][coordinates[1]];

    if (square.attacked()) return null;
    square.receiveAttack();

    if (square.shipType()) {
      ships[square.shipType()].hit();
      return true;
    }

    return false;
  };

  const allShipsSunk = () => {
    const statuses = Object.values(ships).map((shipObject) =>
      shipObject.isSunk(),
    );
    return statuses.every((s) => s);
  };

  return {
    allShipsSunk,
    getShips: () => ships,
    placeShip,
    printBoard,
    receiveAttack,
    reset,
  };
};

export default createGameboard;

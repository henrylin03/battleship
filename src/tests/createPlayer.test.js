import createPlayer from "../js/createPlayer";

test("There are no clashes if the total number of gameboard coordinates taken up by computers' ships is 17", () => {
  const EXPECTED_COUNT_OF_SQUARES_WITH_SHIPS = 5 + 4 + 3 + 3 + 2;
  const player = createPlayer(true);
  const boardArray = player.boardObject.printBoard();

  let countOfCoordinatesWithShip = 0;
  boardArray.forEach((row) =>
    row.forEach((square) => {
      if (square.shipType) countOfCoordinatesWithShip++;
    }),
  );

  expect(countOfCoordinatesWithShip).toEqual(
    EXPECTED_COUNT_OF_SQUARES_WITH_SHIPS,
  );
});

test("Only valid ship types are on computer's game board", () => {
  const player = createPlayer(true);
  const boardArray = player.boardObject.printBoard();
  const validShipTypes = Object.keys(player.boardObject.getShips());
  const shipTypesOnBoard = new Set();

  boardArray.forEach((row) =>
    row.forEach((square) => {
      const shipType = square.shipType;
      if (!shipType || shipTypesOnBoard.has(shipType)) return;
      shipTypesOnBoard.add(shipType);
    }),
  );

  shipTypesOnBoard.forEach((shipType) =>
    expect(validShipTypes.includes(shipType)),
  );
});

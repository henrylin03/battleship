import createPlayer from "../js/createPlayer";

describe("The computer's ship have been properly placed", () => {
  test("Total number of coordinates of computers' ships is 17", () => {
    const SQUARES_WITH_SHIP = 5 + 4 + 3 + 3 + 2;
    const player = createPlayer(true);
    const coordinatesWithShipObject = player.board.getAllCoordinatesWithShip();

    expect(Object.keys(coordinatesWithShipObject).length).toBe(
      SQUARES_WITH_SHIP,
    );
  });

  test("Only valid ships are in computer's game board", () => {
    const player = createPlayer(true);
    const coordinatesWithShipObject = player.board.getAllCoordinatesWithShip();

    const validShipNames = Object.keys(player.board.getShips());
    const shipsOnComputersBoard = Object.values(coordinatesWithShipObject);

    shipsOnComputersBoard.forEach((shipType) => {
      expect(validShipNames.includes(shipType));
    });
  });
});

import createGameboard from "../js/createGameboard";

describe("Cannot place ships on the board when there is already a part of the ship there", () => {
  test("An error is thrown when there is a destroyer at [0,0], horizontal already, and you try and add a patrolBoat at [2,0] vertically, as there is a clash at [2,0]", () => {
    const gameboard = createGameboard();
    gameboard.placeShip("destroyer", [0, 0], true);

    expect(() => gameboard.placeShip("patrolBoat", [2, 0], false)).toThrow(
      Error,
    );
  });
});

// todo: write test for missed attacks set (this needs to be exposed)

describe("Check all ships have been sunk", () => {
  const gameboard = createGameboard();
  gameboard.placeShip("carrier", [0, 0], true);
  gameboard.placeShip("battleship", [0, 1], true);
  gameboard.placeShip("destroyer", [0, 2], true);
  gameboard.placeShip("submarine", [0, 3], true);
  gameboard.placeShip("patrolBoat", [0, 4], true);

  test("Initially, ships are not sunk", () => {
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("All ship are sunk after they all got hit", () => {
    const ATTACK_COORDINATES = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [0, 4],
      [1, 4],
    ];

    ATTACK_COORDINATES.forEach((c) => gameboard.receiveAttack(c));

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

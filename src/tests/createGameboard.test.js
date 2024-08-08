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

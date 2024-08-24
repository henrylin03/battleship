import createGameboard from "../js/createGameboard";

describe("Ensure gameboard is properly printed", () => {
  const gameboard = createGameboard();
  gameboard.placeShip("patrolBoat", [0, 4], true);

  test("After placing a patrolBoat (length=2) starting at [0,4], the coordinates [0,4] and [1,4] should have a patrolBoat there", () => {
    const board = gameboard.printBoard();

    expect(board[0][4].shipType).toBe("patrolBoat");
    expect(board[1][4].shipType).toBe("patrolBoat");
    expect(board[9][9].shipType).toBeNull();
  });

  test("After attacking the patrolBoat, stretching across [0,4] and [1,4] coordinates, those coordinates' squares should have .attacked property be true when the board is printed", () => {
    const board = gameboard.printBoard();

    expect(board[0][4].attacked).toBe(false);
    expect(board[1][4].attacked).toBe(false);

    gameboard.receiveAttack([0, 4]);
    gameboard.receiveAttack([1, 4]);

    const attackedBoard = gameboard.printBoard();
    expect(attackedBoard[0][4].attacked).toBe(true);
    expect(attackedBoard[1][4].attacked).toBe(true);
    expect(attackedBoard[9][9].attacked).toBe(false);
  });
});

describe("Cannot place ships on the board when there is already a part of the ship there", () => {
  test("An error is thrown when there is a destroyer at [0,0], horizontal already, and you try and add a patrolBoat at [2,0] vertically, as there is a clash at [2,0]", () => {
    const gameboard = createGameboard();
    gameboard.placeShip("destroyer", [0, 0], true);

    expect(() => gameboard.placeShip("patrolBoat", [2, 0], false)).toThrow(
      "colliding",
    );
  });
});

test("Missed shots are recorded on gameboard", () => {
  const gameboard = createGameboard();
  gameboard.placeShip("patrolBoat", [0, 0], true);

  const COORDINATES = [9, 9];
  gameboard.receiveAttack(COORDINATES);

  const missedSquare = gameboard.printBoard()[COORDINATES[0]][COORDINATES[1]];

  expect(missedSquare.shipType).toBeNull();
  expect(missedSquare.attacked).toBe(true);
});

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

test("Resetting the board causes the board to be blank again", () => {
  const gameboard = createGameboard();

  gameboard.placeShip("destroyer", [0, 0], true);
  let boardArray = gameboard.printBoard();
  expect(boardArray[0][0].shipType).toBe("destroyer");

  gameboard.reset();

  boardArray = gameboard.printBoard;
  for (let rowIndex = 0; rowIndex < boardArray.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < boardArray.length; columnIndex++) {
      const square = boardArray[rowIndex][columnIndex];
      expect(square.shipType).toBeNull();
    }
  }
});

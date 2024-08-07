import createGameboard from "../js/createGameboard";

describe("Gameboard is initialised correctly", () => {
  test("Gameboard is an array", () => {
    const board = createGameboard();
    expect(Array.isArray(board.getBoard())).toBe(true);
  });
  
  test("Gameboard has length 10", () => {
    const board = createGameboard();
    expect(board.getBoard()).toHaveLength(10);
  });

  test("Each of the gameboard's subarrays contain 10 zeroes, representing there is no ship there yet", () => {
    const board = createGameboard().getBoard();
    for (let i = 0; i < board.length; i++) {
      expect(board[i]).toEqual(new Array(10).fill(0));
    }
  });
});

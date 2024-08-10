import createGameboard from "./createGameboard";

const createPlayer = (isComputer = false) => {
  const name = isComputer ? "Computer" : "You";
  const board = createGameboard();

  return { name, board };
};

export default createPlayer;

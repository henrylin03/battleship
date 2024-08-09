import createGameboard from "./createGameboard";

const createPlayer = (name = "PlayerOne", isComputer = false) => {
  name = isComputer ? "Computer" : name;
  const board = createGameboard();

  return { name, board };
};

export default createPlayer;

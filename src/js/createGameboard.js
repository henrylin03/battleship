import createShip from "./createShip";

const createGameboard = () => {
  const board = new Array(10).fill(new Array(10).fill(0));

  const getBoard = () => board;

  return { getBoard };
};

export default createGameboard;

import createGameboard from "./createGameboard";
import { generateRandomBoolean, generateRandomCoordinates } from "./helpers";

const createPlayer = (isComputer = false) => {
  const board = createGameboard();

  const randomlyPlaceShips = () => {
    const ships = board.getShips();

    for (const shipType in ships) {
      let startCoordinates = generateRandomCoordinates();
      let isHorizontal = generateRandomBoolean();

      while (true) {
        try {
          board.placeShip(shipType, startCoordinates, isHorizontal);
          break;
        } catch (error) {
          startCoordinates = generateRandomCoordinates();
          isHorizontal = generateRandomBoolean();
        }
      }
    }
  };

  randomlyPlaceShips();

  return { board, isComputer: () => isComputer };
};

export default createPlayer;

import createGameboard from "./createGameboard";
import { generateRandomBoolean, generateRandomCoordinates } from "./helpers";

const createPlayer = (isComputer = false) => {
  const boardObject = createGameboard();

  const randomlyPlaceShips = () => {
    boardObject.reset();
    const ships = boardObject.getShips();

    for (const shipType in ships) {
      let startCoordinates = generateRandomCoordinates();
      let isHorizontal = generateRandomBoolean();

      while (true) {
        try {
          boardObject.placeShip(shipType, startCoordinates, isHorizontal);
          break;
        } catch (error) {
          startCoordinates = generateRandomCoordinates();
          isHorizontal = generateRandomBoolean();
        }
      }
    }
  };

  randomlyPlaceShips();

  return { boardObject, isComputer: () => isComputer, randomlyPlaceShips };
};

export default createPlayer;

import createGameboard from "./createGameboard";
import { generateRandomBoolean, generateRandomCoordinates } from "./helpers";

const createPlayer = (isComputer = false) => {
  const boardObject = createGameboard();

  const randomlyPlaceShips = () => {
    boardObject.reset();
    const ships = boardObject.getShips();

    for (const shipType in ships) {
      let randomStartCoordinates = generateRandomCoordinates();
      let isHorizontalRandom = generateRandomBoolean();

      while (true) {
        try {
          boardObject.placeShip(
            shipType,
            randomStartCoordinates,
            isHorizontalRandom,
            true,
          );
          break;
        } catch (error) {
          randomStartCoordinates = generateRandomCoordinates();
          isHorizontalRandom = generateRandomBoolean();
        }
      }
    }
  };

  // run
  randomlyPlaceShips();

  return { boardObject, isComputer: () => isComputer, randomlyPlaceShips };
};

export default createPlayer;

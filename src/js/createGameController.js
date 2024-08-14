import createPlayer from "./createPlayer";
import { generateRandomBoolean, generateRandomCoordinates } from "./helpers";

const players = [createPlayer(), createPlayer(true)];

//todo: have a status that then reflects in what is printed at top of DOM, and is updated when player clicks 'start game' (enters play period) and then shows turns. might be an array so it travels through and has an order.

//! opponent's ship should always be hidden - it should be seen in the html because that would just invite cheating

// returns coordinates object of all the ships
const placeHumanPlayersShips = () => {
  const humanPlayerBoard = players[0].board;
  const ships = humanPlayerBoard.getShips();

  // const adjacentSquareHasShip = (coordinates) => {
  //   const coordinatesWithShip = Object.keys(
  //     humanPlayerBoard.getAllCoordinatesWithShip(),
  //   );
  //   const adjacentCoordinatesAsStrings = [];
  //   // as strings to compare with coordinates that have a ship already, which are strings because they are keys of a hashmap

  //   const potentialAdjacentCoordinates = [
  //     [coordinates[0] + 1, coordinates[1]],
  //     [coordinates[0] + 1, coordinates[1] + 1],
  //     [coordinates[0] + 1, coordinates[1] - 1],
  //     [coordinates[0], coordinates[1] + 1],
  //     [coordinates[0], coordinates[1] - 1],
  //     [coordinates[0] - 1, coordinates[1]],
  //     [coordinates[0] - 1, coordinates[1] + 1],
  //     [coordinates[0] - 1, coordinates[1] - 1],
  //   ];

  //   potentialAdjacentCoordinates.forEach((potentialAdjacentCoordinate) => {
  //     if (potentialAdjacentCoordinate.some((c) => c < 0 || c > 9)) return;
  //     adjacentCoordinates.push(c);
  //   });

  //   return coordinatesWithShip.some((c) =>
  //     adjacentCoordinatesAsStrings.includes(c),
  //   );
  // };

  for (const shipType in ships) {
    let startCoordinates = generateRandomCoordinates();
    let isHorizontal = generateRandomBoolean();

    while (true) {
      try {
        humanPlayerBoard.placeShip(shipType, startCoordinates, isHorizontal);
        break;
      } catch (error) {
        startCoordinates = generateRandomCoordinates();
        isHorizontal = generateRandomBoolean();
      }
    }
  }

  return humanPlayerBoard.getAllCoordinatesWithShip();
};

const createGameController = () => {
  const humanShipCoordinatesObject = placeHumanPlayersShips();

  const setup = () => {
    //players to ensure all their ships are set - (both) - computer to just do random shit for now so long as they don't overlap (which is already being checked)
  };

  let activePlayer = players[0];
  let opponent = activePlayer === players[0] ? players[1] : players[0];
  const switchPlayers = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  // play round
  const play = () => {
    const MINIMUM_ROUNDS_TO_WIN = 5 + 4 + 3 + 3 + 2; // length of all the ships summed

    // 1 - set active player as first player
    // 2 - active player to choose a coordinate THAT HAS NOT BEEN CHOSEN YET on opponent's board
    // 3 - if it is hit, manage hit behaviour. otherwise record as being missed. it is still that player's turn until they miss.
    // 4 - change players
    // 5 - accept attack from that player and manage whether hit or not
    // DONT need to check win conditions until the MINIMUM number of shots fired (assuming all hit), but then check winning conditions - this is just the opponent's gameboard.allShipSunk() === true;
  };

  //TODO: set up behaviour of computer (for now, might just randomly attack - we can make it smarter later i guess)

  return { humanShipCoordinatesObject, play };
};

export default createGameController;

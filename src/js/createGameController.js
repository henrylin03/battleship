import createPlayer from "./createPlayer";

const players = [createPlayer(), createPlayer(true)];

//todo: have a status that then reflects in what is printed at top of DOM, and is updated when player clicks 'start game' (enters play period) and then shows turns. might be an array so it travels through and has an order.

//! opponent's ship should always be hidden - it should be seen in the html because that would just invite cheating

// returns coordinates object of all the ships
const placeHumanPlayersShips = () => {
  const humanBoard = players[0].board;

  // copies wireframe
  humanBoard.placeShip("carrier", [0, 9], true);
  humanBoard.placeShip("battleship", [8, 8], false);
  humanBoard.placeShip("destroyer", [2, 7], false);
  humanBoard.placeShip("submarine", [4, 4], true);
  humanBoard.placeShip("patrolBoat", [1, 2], false);

  // for (const shipType in ships) {
  //   const coordinatesWithShip = humanPlayer.board.getCoordinatesWithShip();
  //   let startCoordinates = generateRandomCoordinates();
  //   let isHorizontal = generateRandomBoolean();

  //   while (startCoordinates in coordinatesWithShip)
  //     startCoordinates = generateRandomCoordinates();

  //   humanPlayer.board.placeShip(shipType, startCoordinates, isHorizontal);

  // }
  return players[0].board.getCoordinatesWithShip();
};

const createGameController = () => {
  const humanPlayerShipCoordinates = Object.keys(placeHumanPlayersShips());

  const setup = () => {
    // todo: will eventually need to pass the locations of ships to screenController, which should have a data-attribute to track location of ship
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

  return { humanPlayerShipCoordinates, play, setup };
};

export default createGameController;

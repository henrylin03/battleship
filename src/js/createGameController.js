import createPlayer from "./createPlayer";
import { generateRandomCoordinates } from "./helpers";

const players = [createPlayer(), createPlayer(true)];

const printNewRound = () => players.map((player) => player.board.printBoard());

const createGameController = () => {
  let activePlayer = players[0];
  const nonActivePlayer = activePlayer === players[0] ? players[1] : players[0];
  const switchPlayers = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  //todo: winning conditions
  const activePlayerWins = () => {
    const MIN_ROUNDS_TO_WIN = 5 + 4 + 3 + 3 + 2; // length of all the ships summed

    // DONT need to check win conditions until the MINIMUM number of shots fired (assuming all hit), but then check winning conditions - this is just the opponent's gameboard.allShipSunk() === true;
    return false;
  };

  const playRound = (columnIndex = "", rowIndex = "") => {
    if (activePlayer.isComputer() === false) {
      if (!columnIndex || !rowIndex) return;
    }

    const coordinates = activePlayer.isComputer()
      ? generateRandomCoordinates()
      : [Number(columnIndex), Number(rowIndex)];

    const nonActivePlayerHasBeenHit =
      nonActivePlayer.board.receiveAttack(coordinates);

    switchPlayers();
    console.log(`The current active player is ${activePlayer.name}`);
    printNewRound();
  };

  // if active player is the computer, then randomly throw attacks

  // const playRound = (columnIndex, rowIndex) => {
  //   const coordinates = [Number(columnIndex), Number(rowIndex)];

  //   const isHit = opponentPlayer.board.receiveAttack(coordinates);

  //   // 3 - if it is hit, manage hit behaviour. otherwise record as being missed. it is still that player's turn until they miss.
  //   // 4 - change players
  //   // 5 - accept attack from that player and manage whether hit or not
  //   switchPlayers();
  //   printNewRound();
  // };

  // run on initialisation
  printNewRound();

  return { getPlayers: () => players, playRound };
};

export default createGameController;

import createPlayer from "./createPlayer";

const players = [createPlayer(), createPlayer(true)];

const printNewRound = () => players.map((player) => player.board.printBoard());

const createGameController = () => {
  let activePlayer = players[0];
  const opponentPlayer = activePlayer === players[0] ? players[1] : players[0];
  const changePlayers = () => (activePlayer = opponentPlayer);

  const activePlayerWins = () => {
    const MIN_ROUNDS_TO_WIN = 5 + 4 + 3 + 3 + 2; // length of all the ships summed
  };

  const playRound = (columnIndex, rowIndex) => {
    const coordinates = [Number(columnIndex), Number(rowIndex)];

    opponentPlayer.board.receiveAttack(coordinates);

    // 3 - if it is hit, manage hit behaviour. otherwise record as being missed. it is still that player's turn until they miss.
    // 4 - change players
    // 5 - accept attack from that player and manage whether hit or not
    // DONT need to check win conditions until the MINIMUM number of shots fired (assuming all hit), but then check winning conditions - this is just the opponent's gameboard.allShipSunk() === true;
    printNewRound();
  };

  // run on initialisation
  printNewRound();

  return { getPlayers: () => players, playRound };
};

export default createGameController;

import createPlayer from "./createPlayer";
import { generateRandomCoordinates } from "./helpers";

const players = [createPlayer(), createPlayer(true)];

const printNewRound = () => players.map((player) => player.board.printBoard());

const createGameController = () => {
  let activePlayer = players[0];
  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];

    if (activePlayer.isComputer()) attackByComputer();
  };

  const attackByHumanPlayer = (columnIndex = "", rowIndex = "") => {
    const coordinates = [Number(columnIndex), Number(rowIndex)];
    const computerHasBeenHit = players[1].board.receiveAttack(coordinates);
    if (computerHasBeenHit === false) switchPlayers();
  };

  const attackByComputer = () => {
    while (activePlayer.isComputer()) {
      const randomCoordinates = generateRandomCoordinates();
      const computerHasHitYou =
        players[0].board.receiveAttack(randomCoordinates);

      if (computerHasHitYou === false) switchPlayers();
    }
  };

  // run on initialisation
  printNewRound();

  return {
    attackByHumanPlayer,
    getActivePlayer: () => activePlayer,
    getPlayers: () => players,
  };
};

export default createGameController;

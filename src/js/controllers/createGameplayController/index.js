import createPlayer from "../../factories/createPlayer";
import { generateRandomCoordinates } from "../../helpers";

const players = [createPlayer(), createPlayer(true)];

const createGameplayController = () => {
  let activePlayer = players[0];
  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];

    if (activePlayer.isComputer()) attackByComputer();
  };

  const activePlayerWins = () => {
    const otherPlayer = activePlayer === players[0] ? players[1] : players[0];
    return otherPlayer.boardObject.allShipsSunk();
  };

  const attackByHumanPlayer = (columnIndex = "", rowIndex = "") => {
    const coordinates = [Number(columnIndex), Number(rowIndex)];
    const computerHasBeenHit =
      players[1].boardObject.receiveAttack(coordinates);
    if (computerHasBeenHit === false) switchPlayers();
  };

  const attackByComputer = () => {
    while (activePlayer.isComputer()) {
      const randomCoordinates = generateRandomCoordinates();
      const computerHasHitYou =
        players[0].boardObject.receiveAttack(randomCoordinates);

      if (computerHasHitYou === false) switchPlayers();
    }
  };

  return {
    activePlayerWins,
    attackByHumanPlayer,
    getActivePlayer: () => activePlayer,
    players,
  };
};

export default createGameplayController;

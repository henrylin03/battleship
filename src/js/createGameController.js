import createPlayer from "./createPlayer";

const createGameController = () => {
  let round = 1;
  const players = [createPlayer(), createPlayer(_, true)];

  let activePlayer = players[0];
  let opponent = activePlayer === players[0] ? players[1] : players[0];
  const switchPlayers = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const setupRound = () => {};

  // set up
  // 1 - players to ensure all their ships are set - (both) - computer to just do random shit for now so long as they don't overlap (which is already being checked)

  // play round
  const playRound = () => {
    const MINIMUM_ROUNDS_TO_WIN = 5 + 4 + 3 + 3 + 2; // length of all the ships summed

    // 1 - set active player as first player
    // 2 - active player to choose a coordinate THAT HAS NOT BEEN CHOSEN YET on opponent's board
    // 3 - if it is hit, manage hit behaviour. otherwise record as being missed.
    // 4 - change players
    // 5 - accept attack from that player and manage whether hit or not
    // DONT need to check win conditions until the MINIMUM number of shots fired (assuming all hit), but then check winning conditions - this is just the opponent's gameboard.allShipSunk() === true;
  };

  //TODO: set up behaviour of computer (for now, might just randomly attack - we can make it smarter later i guess)
  return;
};

export default createGameController;

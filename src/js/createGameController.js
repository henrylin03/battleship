import createPlayer from "./createPlayer";

const players = [createPlayer(), createPlayer(true)];

//todo: have a status that then reflects in what is printed at top of DOM, and is updated when player clicks 'start game' (enters play period) and then shows turns. might be an array so it travels through and has an order.

const getHumanShipCoordinatesObject = () =>
  players[0].board.getAllCoordinatesWithShip();

const createGameController = () => {
  const setup = () => {
    //players to ensure all their ships are set - (both) - computer to just do random shit for now so long as they don't overlap (which is already being checked)
  };

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

  return { getHumanShipCoordinatesObject, play };
};

export default createGameController;

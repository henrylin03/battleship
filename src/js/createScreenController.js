import createGameController from "./createGameController";

const createGrid = () => {};

const createScreenController = () => {
  const game = createGameController();

  // method: update the screen after every turn
  const updateScreen = () => {
    // if opponent is computer, then their screen is always hidden, other than white pins (misses) vs red pins (hit)
    // on your own screen, you can see your ships' locations once game begins
  };

  return;
};

export default createScreenController;

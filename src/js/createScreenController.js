import createGameController from "./createGameController";

const createGrids = () => {
  const SQUARES_PER_SIDE = 10;
  const grids = document.querySelectorAll(".grid");

  Array.from(grids).forEach((container) => {
    // delete existing grid, if any
    container.replaceChildren();

    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    let squaresCount = 1;
    while (squaresCount <= SQUARES_PER_SIDE) {
      const square = document.createElement("div");
      square.classList.add("square");
      row.appendChild(square);
      squaresCount++;
    }

    let rowCount = 1;
    while (rowCount + 1 <= SQUARES_PER_SIDE) {
      const rowClone = row.cloneNode(true);
      container.appendChild(rowClone);
      rowCount++;
    }
  });
};

const createScreenController = () => {
  const game = createGameController();

  // method: update the screen after every turn
  const updateScreen = () => {
    // if opponent is computer, then their screen is always hidden, other than white pins (misses) vs red pins (hit)
    // on your own screen, you can see your ships' locations once game begins
    return;
  };

  createGrids();
};

export default createScreenController;

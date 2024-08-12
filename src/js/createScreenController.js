import createGameController from "./createGameController";

const game = createGameController();

const createGrids = () => {
  const SQUARES_PER_SIDE = 10;
  const grids = document.querySelectorAll(".grid");

  [...grids].forEach((container) => {
    // delete existing grid, if any
    container.replaceChildren();

    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    let columnIndex = 0;
    let rowIndex = 0;

    // build columns
    while (columnIndex <= SQUARES_PER_SIDE - 1) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("data-row", rowIndex);
      square.setAttribute("data-column", columnIndex);

      row.appendChild(square);
      columnIndex++;
    }

    // build rows
    rowIndex = 1;
    while (rowIndex <= SQUARES_PER_SIDE - 1) {
      const rowClone = row.cloneNode(true);
      [...rowClone.children].forEach(
        (square) => (square.dataset.row = rowIndex),
      );

      container.prepend(rowClone);
      rowIndex++;
    }
  });
};

const displayHumanPlayersShips = () => {
  const humanPlayerShipCoordinates = game.humanPlayerShipCoordinates;
  const humanPlayerGridSquaresArray = [
    ...document.querySelectorAll("#your-grid .square"),
  ];

  humanPlayerShipCoordinates.forEach((coordinatesStr) => {
    const coordinates = JSON.parse(coordinatesStr);
    const targetSquare = humanPlayerGridSquaresArray.find((squareDiv) => {
      return (
        squareDiv.dataset.column == coordinates[0] &&
        squareDiv.dataset.row == coordinates[1]
      );
    });
    targetSquare.classList.add("ship");
  });
};

const createScreenController = () => {
  const startGameBtn = document.querySelector("#start-btn");

  // method: update the screen after every turn
  const updateScreen = () => {
    // if opponent is computer, then their screen is always hidden, other than white pins (misses) vs red pins (hit)
    // on your own screen, you can see your ships' locations once game begins
    return;
  };

  createGrids(); // todo? can we merge with display human players ships or is that not good idea despite efficiency??
  displayHumanPlayersShips();
  startGameBtn.addEventListener("mousedown", game.play());
};

export default createScreenController;

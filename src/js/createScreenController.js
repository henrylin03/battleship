import createGameController from "./createGameController";

const game = createGameController();

const handleClickOnOpponentsSquares = (e) => {
  if (game.getActivePlayer().isComputer()) return;

  const square = e.currentTarget;
  game.attackByHumanPlayer(square.dataset.column, square.dataset.row);

  updateScreen();
};

const createGrids = () => {
  const SQUARES_PER_SIDE = 10;
  const grids = document.querySelectorAll(".grid");
  const isOpponentsGrid = (gridElement) => gridElement.id === "opponent-grid";

  [...grids].forEach((container) => {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    let columnIndex = 0;
    let rowIndex = 0;

    // build columns
    while (columnIndex <= SQUARES_PER_SIDE - 1) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("data-column", columnIndex);
      square.setAttribute("data-row", rowIndex);

      if (isOpponentsGrid(container)) {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("grid-button");
        button.disabled = true;

        square.appendChild(button);
      }

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

function updateScreen() {
  const opponentGridButtons = document.querySelectorAll(".grid-button");
  const opponentGridSquares = document.querySelectorAll(
    "#opponent-grid .square",
  );

  const updateGrid = (printedBoard, gridElement) => {
    const squaresDomElements = [...gridElement.querySelectorAll(".square")];
    const isPlayerGrid = () => gridElement.id === "your-grid";

    for (let rowIndex = 0; rowIndex < printedBoard.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < printedBoard[rowIndex].length;
        columnIndex++
      ) {
        const squareObject = printedBoard[columnIndex][rowIndex];

        const squareDomElement = squaresDomElements.find(
          (s) => s.dataset.column == columnIndex && s.dataset.row == rowIndex,
        );

        // display ships
        if (isPlayerGrid() && squareObject.shipType) {
          squareDomElement.classList.add("ship");
          squareDomElement.setAttribute("data-ship", squareObject.shipType);
        }

        // display hits and misses
        if (!squareObject.attacked) continue;
        if (squareObject.shipType) squareDomElement.classList.add("hit");
        else squareDomElement.classList.add("miss");
      }
    }
  };

  const updateGrids = () => {
    // index in this array matches players array from gameController
    const gridElements = [
      document.querySelector("#your-grid"),
      document.querySelector("#opponent-grid"),
    ];
    const players = game.getPlayers();

    players.forEach((player, i) =>
      updateGrid(player.board.printBoard(), gridElements[i]),
    );
  };

  const disableClicksOnOpponentsBoard = () => {
    [...opponentGridButtons].forEach((button) => (button.disabled = true));
    [...opponentGridSquares].forEach((square) =>
      square.removeEventListener("mousedown", handleClickOnOpponentsSquares),
    );
  };

  // run
  updateGrids();

  if (game.activePlayerWins()) {
    disableClicksOnOpponentsBoard();

    const activePlayer = game.getActivePlayer();
    const alertText = activePlayer.isComputer() ? "Computer wins" : "You win";

    return alert(alertText);
  }
}

const createScreenController = () => {
  /* SETUP */
  createGrids();
  updateScreen();

  const opponentGridSquares = document.querySelectorAll(
    "#opponent-grid .square",
  );
  const opponentGridButtons = document.querySelectorAll(
    "#opponent-grid .grid-button",
  );
  const startGameButton = document.querySelector("#start-button");

  [...opponentGridSquares].forEach((square) =>
    square.addEventListener("mousedown", handleClickOnOpponentsSquares),
  );

  startGameButton.addEventListener(
    "mousedown",
    (e) => {
      opponentGridButtons.forEach((button) => (button.disabled = false));
      e.target.disabled = true;
    },
    { once: true },
  );
};

export default createScreenController;

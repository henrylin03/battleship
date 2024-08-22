import createGameController from "./createGameController";

const game = createGameController();

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
        // button.disabled = true;

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

const updateScreen = () => {
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

  const updateActivePlayer = () => {
    const statusElement = document.querySelector("#status");
    const activePlayer = game.getActivePlayer();

    statusElement.textContent = activePlayer.isComputer()
      ? "Computer's turn to attack"
      : "Your turn to attack!";
  };

  updateGrids();
  updateActivePlayer();
};

const createScreenController = () => {
  /* SETUP */
  createGrids();
  updateScreen();

  const opponentGridSquares = document.querySelectorAll(
    "#opponent-grid .square",
  );
  const opponentGridButtons = document.querySelectorAll(".grid-button");
  const startGameButton = document.querySelector("#start-button");

  /* EVENT HANDLERS */
  const handleStartGame = () =>
    // opponent's squares become clickable
    [...opponentGridButtons].forEach((button) => (button.disabled = false));

  const handleClickOnOpponentsSquares = (e) => {
    if (game.getActivePlayer().isComputer()) return;

    const square = e.currentTarget;
    game.attackByHumanPlayer(square.dataset.column, square.dataset.row);
    updateScreen();
  };

  /* EVENT LISTENERS */
  startGameButton.addEventListener("mousedown", handleStartGame, {
    once: true,
  });

  [...opponentGridSquares].forEach((square) =>
    square.addEventListener("mousedown", handleClickOnOpponentsSquares),
  );
};

export default createScreenController;

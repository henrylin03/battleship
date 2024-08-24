import createGameController from "./createGameController";

// objects
const game = createGameController();
const players = game.players;

// event handler that also needs removal which is why it is here and not in createScreenController scope
const handleClickOnOpponentsSquares = (e) => {
  if (game.getActivePlayer().isComputer()) return;

  const square = e.currentTarget;
  game.attackByHumanPlayer(square.dataset.column, square.dataset.row);

  updateScreen();
};

// helper functions
const createGrids = () => {
  const SQUARES_PER_SIDE = 10;
  const grids = document.querySelectorAll(".grid");
  const isOpponentsGrid = (gridElement) => gridElement.id === "opponent-grid";

  [...grids].forEach((container) => {
    // clear existing grid
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
      square.setAttribute("data-column", columnIndex);
      square.setAttribute("data-row", rowIndex);

      if (isOpponentsGrid(container)) {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("grid-button");

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

const disableClicksOnOpponentsBoard = () => {
  const opponentGridButtons = document.querySelectorAll(".grid-button");
  const opponentGridSquares = document.querySelectorAll(
    "#opponent-grid .square",
  );

  [...opponentGridButtons].forEach((button) => (button.disabled = true));
  [...opponentGridSquares].forEach((square) =>
    square.removeEventListener("mousedown", handleClickOnOpponentsSquares),
  );
};

function updateScreen() {
  const updateGrid = (printedBoard, gridElement) => {
    const squaresDomElements = [...gridElement.querySelectorAll(".square")];
    const isPlayerGrid = () => gridElement.id === "your-grid";

    for (let rowIndex = 0; rowIndex < printedBoard.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < printedBoard[rowIndex].length;
        columnIndex++
      ) {
        const square = printedBoard[columnIndex][rowIndex];

        const squareDomElement = squaresDomElements.find(
          (s) => s.dataset.column == columnIndex && s.dataset.row == rowIndex,
        );

        // display ships
        if (isPlayerGrid() && square.shipType) {
          squareDomElement.classList.add("ship");
          squareDomElement.setAttribute("data-ship", square.shipType);
        }

        // attach event listener to opponent's board
        if (!isPlayerGrid()) {
          squareDomElement.addEventListener(
            "mousedown",
            handleClickOnOpponentsSquares,
          );
        }

        // display hits and misses
        if (!square.attacked) continue;
        if (square.shipType) squareDomElement.classList.add("hit");
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

    players.forEach((player, i) =>
      updateGrid(player.boardObject.printBoard(), gridElements[i]),
    );
  };

  // run
  createGrids();
  updateGrids();

  if (game.activePlayerWins()) {
    disableClicksOnOpponentsBoard();

    const activePlayer = game.getActivePlayer();
    const alertText = activePlayer.isComputer() ? "Computer wins" : "You win";

    return alert(alertText);
  }
}

const createScreenController = () => {
  // DOM elements
  const startGameButton = document.querySelector("#start-button");
  const randomiseShipsButton = document.querySelector(
    "#randomise-ships-button",
  );

  // event handlers
  const handleClickOnRandomShipPlacement = () => {
    players[0].randomlyPlaceShips();
    updateScreen();
  };

  randomiseShipsButton.addEventListener(
    "mousedown",
    handleClickOnRandomShipPlacement,
  );

  // event handlers
  const handleClickOnStartGameButton = (e) => {
    const opponentGridButtons = document.querySelectorAll(
      "#opponent-grid .grid-button",
    );

    e.target.disabled = true;
    opponentGridButtons.forEach((button) => (button.disabled = false));
    randomiseShipsButton.disabled = true;
  };

  // event listeners
  startGameButton.addEventListener("mousedown", handleClickOnStartGameButton, {
    once: true,
  });

  // run
  disableClicksOnOpponentsBoard();
  updateScreen();
};

export default createScreenController;

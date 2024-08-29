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

export default createGrids;

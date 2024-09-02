export default function generateShipsWaitingSection() {
  const SHIP_TYPES = [
    "carrier",
    "battleship",
    "destroyer",
    "submarine",
    "patrolBoat",
  ];

  const section = document.createElement("section");
  section.id = "ships-waiting";

  const flexContainers = [
    document.createElement("div"),
    document.createElement("div"),
  ];

  SHIP_TYPES.forEach((shipType, idx) => {
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-container");

    const shipDiv = document.createElement("div");
    shipDiv.classList.add(shipType);
    shipDiv.classList.add("ship");
    shipDiv.draggable = true;

    shipContainer.appendChild(shipDiv);
    if (idx < 3) flexContainers[0].appendChild(shipContainer);
    else flexContainers[1].appendChild(shipContainer);
  });

  flexContainers.forEach((container) => {
    container.classList.add("flex-container");
    section.appendChild(container);
  });

  return section;
}

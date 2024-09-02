import "../../../assets/styles/placeShips.css";
import generateShipsWaitingSection from "../../components/generateShipsWaitingSection";
import generateAdjustShipButtonsSection from "../../components/generateAdjustShipButtonsSection";
import generateStartGameSection from "../../components/generateStartGameSection";

const createPlaceShipScreenController = () => {
  const main = document.querySelector("main");
  const sections = [
    generateShipsWaitingSection(),
    generateAdjustShipButtonsSection(),
    generateStartGameSection(),
  ];

  // run
  sections.forEach((section) => main.appendChild(section));
};

export default createPlaceShipScreenController;

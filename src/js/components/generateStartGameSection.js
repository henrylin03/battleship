const generateStartGameSection = () => {
  const section = document.createElement("section");
  section.id = "start-game";

  const button = document.createElement("button");
  button.type = "button";
  button.id = "start-button";
  button.disabled = true;
  button.textContent = "Start game";

  section.appendChild(button);

  return section;
};

export default generateStartGameSection;

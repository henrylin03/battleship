const createSquare = () => {
  let shipType = null;
  let attacked = false;
  const VALID_SHIP_TYPES = [
    "carrier",
    "battleship",
    "destroyer",
    "submarine",
    "patrolBoat",
  ];

  const view = () => ({
    shipType,
    attacked,
  });

  const setShipType = (newShipType) => {
    if (!VALID_SHIP_TYPES.includes(newShipType))
      throw new Error(
        `"${newShipType}" is not a valid ship type. Please select one of the following:

${JSON.stringify(VALID_SHIP_TYPES)}
`,
      );

    shipType = newShipType;
  };

  const receiveAttack = () => (attacked = true);

  return {
    attacked: () => attacked,
    receiveAttack,
    setShipType,
    shipType: () => shipType,
    view,
  };
};

export default createSquare;

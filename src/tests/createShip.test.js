import createShip from "../js/createShip";

describe("Check ship-sinking behaviour", () => {
  test("a carrier (length=5) is not sunk after being hit once", () => {
    const carrier = createShip(5);
    carrier.hit();
    expect(carrier.isSunk()).toBeFalsy();
  });

  test("a patrol ship (length=2) is sunk after being hit twice", () => {
    const patrolShip = createShip(2);
    patrolShip.hit();
    patrolShip.hit();
    expect(patrolShip.isSunk()).toBeTruthy();
  });
});

describe("Check ship's coordinates are properly set", () => {
  test("A destroyer (length=3), starting at [0, 0] and is horizontal, has coordinates: [ [0, 0], [1, 0], [2, 0] ]", () => {
    const destroyer = createShip(3);
    destroyer.setCoordinates([0, 0], true);
    expect(destroyer.getCoordinates()).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test("A destroyer (length=3), starting at [9, 9] and is vertical, has coordinates: [[9,9], [9,8], [9,7]]", () => {
    const destroyer = createShip(3);
    destroyer.setCoordinates([9, 9], false);
    expect(destroyer.getCoordinates()).toEqual([
      [9, 9],
      [9, 8],
      [9, 7],
    ]);
  });
});

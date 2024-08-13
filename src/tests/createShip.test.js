import createShip from "../js/createShip";

describe("Check ship-sinking behaviour", () => {
  test("a carrier (length=5) is not sunk after being hit once", () => {
    const carrier = createShip(5);
    carrier.hit();
    expect(carrier.isSunk()).toBe(false);
  });

  test("a patrol ship (length=2) is sunk after being hit twice", () => {
    const patrolShip = createShip(2);
    patrolShip.hit();
    patrolShip.hit();
    expect(patrolShip.isSunk()).toBe(true);
  });
});

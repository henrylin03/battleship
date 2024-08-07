import createShip from "../js/createShip";

test("a carrier (ship with length=5) is not sunk after being hit once", () => {
  const carrier = createShip(5);
  carrier.hit();
  expect(carrier.isSunk()).toBeFalsy();
});

test("a destroyer (ship with length=2) is sunk after being hit twice", () => {
  const destroyer = createShip(2);
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.isSunk()).toBeTruthy();
});

import createShip from "../js/createShip";

test("createShip factory returns true boolean", () => {
  expect(createShip()).toBe(true);
});

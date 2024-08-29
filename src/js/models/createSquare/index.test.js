import createSquare from "./index";

test("After receiving an attack, the square's 'attacked' property is true", () => {
  const square = createSquare();
  expect(square.attacked()).toBe(false);

  square.receiveAttack();
  expect(square.attacked()).toBe(true);
});

test("Trying to set the ship type in the square as an invalid ship type would throw an error", () => {
  const square = createSquare();
  expect(() => square.setShipType("some gibberish")).toThrow(
    "not a valid ship",
  );
});

const Ship = require('../modules/ship');

test('update hit array after hit() call', () => {
  const ship = Ship(3);

  ship.hit(0);
  expect(ship.getHitArray()).toContain(0);

  ship.hit(2);
  expect(ship.getHitArray()).toContain(0, 2);

  expect(ship.getHitArray()).not.toContain(1);
});

test('ship isSunk is true after hit on all positions', () => {
  const ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit(0);
  expect(ship.isSunk()).toBe(false);
  ship.hit(1);
  expect(ship.isSunk()).toBe(true);
});

const Ship = require('../modules/ship');

test('update hit array position after hit() call', () => {
  const ship = Ship(3);
  ship.hit(0);

  expect(ship.getHitArray()).toContain(0);
});

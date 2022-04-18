const Ship = require('../modules/ship');

test('update hit array after hit() call', () => {
  const ship = Ship(3);

  ship.hit(0);
  expect(ship.getHitArray()).toContain(0);

  ship.hit(2);
  expect(ship.getHitArray()).toContain(2);
});

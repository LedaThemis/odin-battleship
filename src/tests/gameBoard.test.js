const GameBoard = require('../modules/gameBoard');
const Ship = require('../modules/ship');

test('record missed shot', () => {
  const gameBoard = GameBoard();

  gameBoard.attack(1);

  expect(gameBoard.getMissedArray()).toContain(1);
  expect(gameBoard.getMissedArray()).not.toContain(2);
});

test('report all ships have sunk', () => {
  const gameBoard = GameBoard();
  const ship2 = Ship(2);
  const ship3 = Ship(3);
  gameBoard.placeShip(ship2, [0, 1]);
  gameBoard.placeShip(ship3, [4, 5, 6]);

  gameBoard.attack(0);
  expect(gameBoard.areSunk()).toBe(false);
  gameBoard.attack(1);
  expect(gameBoard.areSunk()).toBe(false);
  gameBoard.attack(4);
  gameBoard.attack(5);
  gameBoard.attack(6);
  expect(gameBoard.areSunk()).toBe(true);
});

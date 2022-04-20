const GameBoard = require('../modules/gameBoard');
const Ship = require('../modules/ship');

test('record missed shot', () => {
  const gameBoard = GameBoard();

  gameBoard.attack(1);

  expect(gameBoard.getMissedArray()).toContain(1);
  expect(gameBoard.getMissedArray()).not.toContain(2);
});

test('check that gameBoard calls Ship with length argument', () => {
  const gameBoard = GameBoard();

  const shipFactoryMock = jest.fn((length) => length);

  gameBoard.placeShip(shipFactoryMock, 2, [0, 1]);

  expect(shipFactoryMock.mock.calls.length).toBe(1);
  expect(shipFactoryMock.mock.calls[0][0]).toBe(2); // first call, first argument
});

test('report all ships have sunk', () => {
  const gameBoard = GameBoard();

  gameBoard.placeShip(Ship, 2, [0, 1]);
  gameBoard.placeShip(Ship, 3, [4, 5, 6]);

  gameBoard.attack(0);
  expect(gameBoard.areSunk()).toBe(false);
  gameBoard.attack(1);
  expect(gameBoard.areSunk()).toBe(false);
  gameBoard.attack(4);
  gameBoard.attack(5);
  gameBoard.attack(6);
  expect(gameBoard.areSunk()).toBe(true);
});

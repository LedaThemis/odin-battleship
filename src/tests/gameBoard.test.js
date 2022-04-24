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

test('check if gameBoard stores ships correctly', () => {
  const gameBoard = GameBoard();

  gameBoard.placeShip(Ship, 2, [0, 1]);
  gameBoard.placeShip(Ship, 3, [95, 96, 97]);

  expect(gameBoard.getShips().length).toBe(2);
  expect(gameBoard.getShips()[0].indices).toEqual([0, 1]);
  expect(gameBoard.getShips()[1].indices).toEqual([95, 96, 97]);
});

test('test ship moving functionality', () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip(Ship, 2, [24, 25]);
  expect(gameBoard.getShips()[0]['indices']).toEqual([24, 25]);
  gameBoard.moveShip(24, [98, 99]);
  expect(gameBoard.getShips()[0]['indices']).toEqual([98, 99]);
});

test('clear board on clear method call', () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip(Ship, 2, [1, 2]);
  gameBoard.attack(2);
  gameBoard.attack(5);
  gameBoard.attack(7);
  gameBoard.clear();
  expect(gameBoard.getMissedArray()).toEqual([]);
  expect(gameBoard.getShips()).toEqual([]);
});

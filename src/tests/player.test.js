const GameBoard = require('../modules/gameBoard');
const Player = require('../modules/player');
const Ship = require('../modules/ship');

const attackMock = jest.fn((index) => index);

test('check that player calls enemyGameBoard.attack() with given index', () => {
  const enemyGameBoardMock = { attack: attackMock, getMissedArray: () => [] };
  const player = Player('Name', enemyGameBoardMock);
  player.play(2);

  expect(enemyGameBoardMock.attack.mock.calls.length).toBe(1);
  expect(enemyGameBoardMock.attack.mock.calls[0][0]).toBe(2); // first call, first argument
});

test('check getName functionality', () => {
  const player = Player('Player', null);
  expect(player.getName()).toBe('Player');
});

test('check that turn is false by default', () => {
  const player = Player('Player', null);

  expect(player.getTurn()).toBe(false);
});

test('check that setTurn updates turn', () => {
  const player = Player('Player', null);

  expect(player.getTurn()).toBe(false);
  player.setTurn(true);
  expect(player.getTurn()).toBe(true);
});

test('turn should stay true after ship hit', () => {
  const enemyGameBoard = GameBoard();

  const player = Player('Player', enemyGameBoard);

  enemyGameBoard.placeShip(Ship, 2, [0, 1]);

  player.setTurn(true);
  expect(player.getTurn()).toBe(true);

  player.play(1);
  expect(player.getTurn()).toBe(true);
});

test('turn should change after miss', () => {
  const enemyGameBoard = GameBoard();

  const player = Player('Player', enemyGameBoard);

  enemyGameBoard.placeShip(Ship, 2, [0, 1]);

  player.setTurn(true);
  expect(player.getTurn()).toBe(true);

  player.play(4);
  expect(player.getTurn()).toBe(false);
});

test('computer should play adjacent slots after hit', () => {
  const enemyGameBoard = GameBoard();
  const player = Player('Player', enemyGameBoard);

  enemyGameBoard.placeShip(Ship, 2, [1, 2]);

  player.play(1);
  player.computerPlay();
  expect(enemyGameBoard.areSunk()).toBe(true);
  player.computerPlay();
  player.computerPlay();
  expect(enemyGameBoard.getMissedArray()).toEqual([0, 11]);
  player.computerPlay();
  player.computerPlay();
  expect(enemyGameBoard.getMissedArray()).toContain(0, 11, 3, 12);
});

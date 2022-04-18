const GameBoard = require('../modules/gameBoard');

test('record missed shot', () => {
  const gameBoard = GameBoard();

  gameBoard.attack(1);

  expect(gameBoard.getMissedArray()).toContain(1);
  expect(gameBoard.getMissedArray()).not.toContain(2);
});

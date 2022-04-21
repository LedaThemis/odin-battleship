const Player = require('../modules/player');

const attackMock = jest.fn((index) => index);

test('check that player calls enemyGameBoard.attack() with given index', () => {
  const enemyGameBoardMock = { attack: attackMock };
  const player = Player('Name', enemyGameBoardMock);
  player.play(2);

  expect(enemyGameBoardMock.attack.mock.calls.length).toBe(1);
  expect(enemyGameBoardMock.attack.mock.calls[0][0]).toBe(2); // first call, first argument
});

test('check getName functionality', () => {
  const player = Player('Player', null);
  expect(player.getName()).toBe('Player');
});

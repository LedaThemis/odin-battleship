const Player = (name, enemyGameBoard) => {
  let _name = name;
  let _playedPositions = [];

  const _enemyGameBoard = enemyGameBoard;

  const play = (index) => {
    _playedPositions.push(index);
    _enemyGameBoard.attack(index);
  };

  return {
    play,
  };
};

module.exports = Player;

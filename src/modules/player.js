const Player = (name, enemyGameBoard) => {
  let _name = name;
  let _playedPositions = [];

  const _enemyGameBoard = enemyGameBoard;

  const play = (index) => {
    _playedPositions.push(index);
    _enemyGameBoard.attack(index);
  };

  const computerPlay = (enemyGameBoard) => {
    const randomIndex = generateRandomIndex();
    _playedPositions.push(randomIndex);

    enemyGameBoard.attack(randomIndex);
  };

  const generateRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 100);
    } while (_playedPositions.includes(randomIndex));

    return randomIndex;
  };

  return {
    play,
    computerPlay,
  };
};

module.exports = Player;

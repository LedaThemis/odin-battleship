const Player = (name, enemyGameBoard) => {
  let _name = name;
  let _playedPositions = [];
  let _turn = false;

  const _enemyGameBoard = enemyGameBoard;

  const getName = () => {
    return _name;
  };

  const setTurn = (newState) => {
    _turn = !!newState; // convert non-boolean values
  };

  const getTurn = () => _turn;

  const play = (index) => {
    _playedPositions.push(index);
    _enemyGameBoard.attack(index);

    if (_enemyGameBoard.getMissedArray().includes(index)) {
      setTurn(false);
    } else {
      setTurn(true);
    }
  };

  const computerPlay = () => {
    const randomIndex = generateRandomIndex();
    _playedPositions.push(randomIndex);

    _enemyGameBoard.attack(randomIndex);

    if (_enemyGameBoard.getMissedArray().includes(randomIndex)) {
      setTurn(false);
    } else {
      setTurn(true);
    }
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
    getName,
    getTurn,
    setTurn,
  };
};

module.exports = Player;

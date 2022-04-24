const Player = (name, enemyGameBoard) => {
  let _name = name;
  let _playedPositions = [];
  let _turn = false;
  let _nextMoves = [];

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
      _nextMoves = _nextMoves.concat(getNextMoves(index));
    }
  };

  const getNextMoves = (index) => {
    let nextMoves = [];
    if ((index + 1) % 10 !== 0) {
      // not last in row
      nextMoves.push(index + 1);
    }
    if (index % 10 !== 0) {
      // not first in row
      nextMoves.push(index - 1);
    }
    if (index - 10 >= 0) {
      nextMoves.push(index - 10);
    }
    if (index + 10 <= 99) {
      nextMoves.push(index + 10);
    }

    nextMoves = nextMoves.filter((v) => !_playedPositions.includes(v));
    return nextMoves;
  };

  const computerPlay = () => {
    let selectedIndex;
    if (_nextMoves.length < 1) {
      selectedIndex = generateRandomIndex();
    } else {
      selectedIndex = _nextMoves.shift();
    }

    _playedPositions.push(selectedIndex);

    _enemyGameBoard.attack(selectedIndex);

    if (_enemyGameBoard.getMissedArray().includes(selectedIndex)) {
      setTurn(false);
    } else {
      setTurn(true);
      _nextMoves = _nextMoves.concat(getNextMoves(selectedIndex));
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

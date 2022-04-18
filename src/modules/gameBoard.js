const gameBoard = () => {
  //  0: empty
  // -1: missed
  //  1: ship
  let _board = Array(100).fill(0);
  let _ships = [];

  const placeShip = (ship, indices) => {
    _ships.push({ ship, indices });

    for (let index of indices) {
      _board = _board.map((v, i) => (index === i ? 1 : v));
    }
  };

  const getShipAtIndex = (index) => {
    _ships.forEach(({ ship, indices }) => {
      if (indices.includes(index)) {
        return { ship: ship, relativePosition: indices.indexOf(index) };
      }

  const isMiss = (index, board) => {
    return board[index] === 0;
  };

  const markMissed = (index, board) => {
    return board.map((v, i) => (i === index ? -1 : v));
  };

  const isShip = (index, board) => {
    return board[index] === 1;
  };

  const attackShipAtIndex = (index) => {
    const { ship, relativePosition } = getShipAtIndex(index);
    ship.hit(relativePosition);
  };

  const attack = (index) => {
    if (isMiss(index, _board)) {
      _board = markMissed(index, _board);
    } else if (isShip(index, _board)) {
      attackShipAtIndex(index);
    }
  };

  const getMissedArray = () => {
    const missedIndicesArray = [];
    _board.filter((v, i) => (v === -1 ? missedIndicesArray.push(i) : null));
    return missedIndicesArray;
  };

  return {
    getMissedArray,
    attack,
  };
};

module.exports = gameBoard;

const Ship = require('./ship');

const gameBoard = () => {
  //  0: empty
  // -1: missed
  //  1: ship
  let _board = Array(100).fill(0);
  let _ships = [];

  const placeShip = (shipFactory, shipLength, indices) => {
    const ship = shipFactory(shipLength);
    _ships.push({ ship, indices });

    for (let index of indices) {
      _board = _board.map((v, i) => (index === i ? 1 : v));
    }
  };

  const clearBoardAtIndices = (indices) => {
    _board = _board.map((v, i) => {
      if (indices.includes(i)) {
        return 0;
      } else {
        return v;
      }
    });
  };

  const removeShipAtIndex = (index) => {
    _ships = _ships.filter(({ _, indices }) => {
      if (indices.includes(index)) {
        clearBoardAtIndices(indices);
        return false;
      } else {
        return true;
      }
    });
  };

  const moveShip = (currentShipIndex, newShipIndices) => {
    removeShipAtIndex(currentShipIndex);
    placeShip(Ship, 2, newShipIndices);
    return _ships;
  };

  const areSunk = () => {
    return _ships.every(({ ship, _ }) => ship.isSunk() === true);
  };

  const getShipAtIndex = (index) => {
    for ({ ship, indices } of _ships) {
      if (indices.includes(index)) {
        return { ship: ship, relativePosition: indices.indexOf(index) };
      }
    }
  };

  const getShips = () => {
    return _ships;
  };

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
    placeShip,
    areSunk,
    getShips,
    moveShip,
  };
};

module.exports = gameBoard;

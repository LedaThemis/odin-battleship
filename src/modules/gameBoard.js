const gameBoard = () => {
  //  0: empty
  // -1: missed
  //  1: ship
  let _board = Array(100).fill(0);
  let _ships = [];

  const getShipAtIndex = (index) => {
    _ships.forEach(({ ship, indices }) => {
      if (indices.includes(index)) {
        return { ship: ship, relativePosition: indices.indexOf(index) };
      }
    });
  };

  const attack = (index) => {
    _board = _board.map((v, i) => {
      if (i === index) {
        switch (v) {
          case -1:
            break;
          case 0:
            return -1;
          case 1:
            const { ship, relativePosition } = getShipAtIndex(index);
            ship.hit(relativePosition);
            break;
        }
      }
    });
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

const getCorrectShots = (gameBoard) => {
  const correctShots = [];

  const gameBoardShips = gameBoard.getShips();

  gameBoardShips.forEach(({ ship, indices }) => {
    const shipHitArray = ship.getHitArray();
    shipHitArray.forEach((hitIndex) => correctShots.push(indices[hitIndex]));
  });

  return correctShots;
};

export default getCorrectShots;

import getCorrectShots from './getCorrectShots';

const plotBoard = (boardDiv, gameBoard, visibleShips) => {
  const correctShots = getCorrectShots(gameBoard);
  const missedShots = gameBoard.getMissedArray();

  missedShots.forEach((index) => {
    boardDiv.children[index].classList.add('missed-shot');
    boardDiv.children[index].textContent = '';
  });

  correctShots.forEach((index) => {
    boardDiv.children[index].classList.add('correct-shot');
    boardDiv.children[index].textContent = '';
  });

  if (visibleShips) {
    const ships = gameBoard.getShips();

    ships.forEach(({ ship, indices }) => {
      indices.forEach((i) => boardDiv.children[i].classList.add('shown'));
    });
  }
};

export default plotBoard;

import getCorrectShots from './getCorrectShots';

const plotBoard = (boardDiv, gameBoard) => {
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
};

export default plotBoard;

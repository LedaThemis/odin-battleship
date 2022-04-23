import computeBoardBlockDimensions from './computeBoardBlockDimensions';

const createBoardBlockDiv = (id, height, width, callback, isHuman) => {
  const div = document.createElement('div');
  div.dataset.key = id;
  div.classList.add('board-block');
  div.innerText = id + 1;

  div.style.height = `${height}px`;
  div.style.width = `${width}px`;

  if (isHuman) {
    div.addEventListener('click', callback, { once: true });
  }

  return div;
};

const populateBoard = (boardDiv, boardBlocksCount, enemyPlayer, isHuman, handleBoardBlockClick) => {
  boardDiv.replaceChildren();
  const { height, width } = computeBoardBlockDimensions(boardDiv.clientHeight, boardBlocksCount);
  for (let i = 0; i < boardBlocksCount; i++) {
    const div = createBoardBlockDiv(i, height, width, () => handleBoardBlockClick(enemyPlayer, i), isHuman);
    boardDiv.appendChild(div);
  }
};

export default populateBoard;

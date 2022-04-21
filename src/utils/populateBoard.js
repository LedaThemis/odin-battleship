const createBoardBlockDiv = (id, height, width) => {
  const div = document.createElement('div');
  div.dataset.key = id;
  div.classList.add('board-block');
  div.innerText = id + 1;

  div.style.height = `${height}px`;
  div.style.width = `${width}px`;

  return div;
};

const computeBoardBlockDimensions = (boardSize, boardBlocksCount) => {
  return { height: boardSize / Math.sqrt(boardBlocksCount), width: boardSize / Math.sqrt(boardBlocksCount) };
};

const populateBoard = (boardDiv, boardBlocksCount) => {
  const { height, width } = computeBoardBlockDimensions(boardDiv.clientHeight, boardBlocksCount);
  for (let i = 0; i < boardBlocksCount; i++) {
    const div = createBoardBlockDiv(i, height, width);
    boardDiv.appendChild(div);
  }
};

export default populateBoard;

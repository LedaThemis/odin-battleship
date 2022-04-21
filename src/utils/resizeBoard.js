import computeBoardBlockDimensions from './computeBoardBlockDimensions';

const resizeBoard = (boardDiv, boardBlocksCount) => {
  const { height, width } = computeBoardBlockDimensions(boardDiv.clientHeight, boardBlocksCount);

  Array.from(boardDiv.children).forEach((blockDiv) => resizeDiv(blockDiv, height, width));
};

const resizeDiv = (div, newHeight, newWidth) => {
  div.style.height = `${newHeight}px`;
  div.style.width = `${newWidth}px`;
};

export default resizeBoard;

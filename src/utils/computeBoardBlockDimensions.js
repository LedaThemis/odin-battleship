const computeBoardBlockDimensions = (boardSize, boardBlocksCount) => {
  return { height: boardSize / Math.sqrt(boardBlocksCount), width: boardSize / Math.sqrt(boardBlocksCount) };
};

export default computeBoardBlockDimensions;

import areLegalIndices from './areLegalIndices';
import checkIfOccupied from './checkIfOccupied';

const SHIP_POSITIONS = {
  2: [-1, -1],
  '3a': [-1, -1, -1],
  '3b': [-1, -1, -1],
  4: [-1, -1, -1, -1],
  5: [-1, -1, -1, -1, -1],
};

const shipInPosition = (indices, key, shipPositions) => {
  try {
    checkIfOccupied(indices, key, shipPositions);
  } catch (errorTxt) {
    return true;
  }

  return false;
};
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getFunction = (rotation) => {
  if (rotation === 0) {
    return (firstIndex, length) => [...Array(length).keys()].map((i) => i + firstIndex);
  } else {
    return (firstIndex, length) => [...Array(length).keys()].map((i) => i * 10 + firstIndex);
  }
};

const generateIndices = (length) => {
  const generatorFunction = getFunction(Math.round(Math.random()));

  let currentIndex, firstIndex;
  do {
    firstIndex = randomNumber(0, 99 - length);
    currentIndex = generatorFunction(firstIndex, length);
  } while (!areLegalIndices(currentIndex) || currentIndex.some((v) => v < 0 || v > 99));

  return currentIndex;
};

const generateComputerPositions = () => {
  for (let key of Object.keys(SHIP_POSITIONS)) {
    const currentLength = SHIP_POSITIONS[key].length;

    let indices;
    do {
      indices = generateIndices(currentLength);
    } while (shipInPosition(indices, key, SHIP_POSITIONS));

    SHIP_POSITIONS[key] = indices;
  }
  return SHIP_POSITIONS;
};

export default generateComputerPositions;

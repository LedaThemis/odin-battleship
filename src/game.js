import GameBoard from './modules/gameBoard';
import Player from './modules/player';

import initializeGameBoard from './utils/initializeGameBoard';
import plotBoard from './utils/plotBoard';
import populateBoard from './utils/populateBoard';
import resizeBoard from './utils/resizeBoard';

import handleWin from './utils/handleWin';

import arrayEqual from './utils/arrayEqual';
import gameBoard from './modules/gameBoard';

let SHIP_POSITIONS = {
  2: [0, 1],
  '3a': [20, 21, 22],
  '3b': [40, 50, 60],
  4: [44, 45, 46, 47],
  5: [95, 96, 97, 98, 99],
};

const handleBoardBlockClick = (player, i) => {
  if (determineWinner(players)) return; // game done

  player.play(i);
  plotBoards();

  checkIfWin(players);

  if (player.getTurn()) return; // if correct shot

  computer.setTurn(true);

  while (computer.getTurn()) {
    computer.computerPlay();
    checkIfWin(players);
  }
  plotBoards();

  player.setTurn(true);
};

const areLegalIndices = (indices) => {
  const firstIndex = indices[0];
  const overflow = Math.ceil((firstIndex + 1) / 10) * 10;
  if (firstIndex + indices.length > overflow) return false;

  const horizontal = [...Array(indices.length).keys()].map((i) => i + firstIndex);
  const vertical = [...Array(indices.length).keys()].map((i) => i * 10 + firstIndex);

  return arrayEqual(indices, horizontal) || arrayEqual(indices, vertical);
};

const checkIfOccupied = (newIndices, shipKey) => {
  for (const k in SHIP_POSITIONS) {
    if (`${k}` === shipKey) {
      continue;
    } else if (SHIP_POSITIONS[k].some((v) => newIndices.includes(v))) {
      throw 'There is a ship there already';
    }
  }
};

const processPositionInput = (inputString, desiredLength) => {
  const inputArray = inputString.split(',').map((s) => parseInt(s));
  if (inputArray.includes(NaN)) {
    throw 'Wrong Input';
  } else if (inputArray.length !== parseInt(desiredLength)) {
    throw `There should be ${desiredLength} indices`;
  } else if (!inputArray.every((i) => i >= 1 && i <= 100)) {
    throw `Indices should be between 1-100`;
  } else if (!areLegalIndices(inputArray.map((i) => i - 1))) {
    throw `Indices should be continuous, in ascending order`;
  } else {
    return inputArray.map((i) => i - 1);
  }
};

const handlePositionButtonSubmit = (e, key, desiredLength) => {
  e.preventDefault();
  const input = document.querySelector(`#ship-length-${key}`);
  const value = input.value;
  const processedInput = processPositionInput(value, desiredLength);

  const oldIndices = SHIP_POSITIONS[key];

  checkIfOccupied(processedInput, key);

  SHIP_POSITIONS[key] = processedInput;

  playerBoard.moveShip(oldIndices[0], SHIP_POSITIONS[key]);

  populateBoard(playerBoardDiv, 100, computer, false, handleBoardBlockClick);
  plotBoards();
};

const positionButtons = document.querySelectorAll('.submit-position-button');

positionButtons.forEach((positionButton) => {
  positionButton.addEventListener('click', (e) =>
    handlePositionButtonSubmit(e, positionButton.dataset.key, positionButton.dataset.length)
  );
});

const playerBoard = GameBoard();
const computerBoard = GameBoard();

const playerBoardDiv = document.querySelector('#board-1');
const computerBoardDiv = document.querySelector('#board-2');

const player = Player('You', computerBoard);
const computer = Player('Computer', playerBoard);

player.setTurn(true);
computer.setTurn(false);

populateBoard(playerBoardDiv, 100, computer, false, handleBoardBlockClick);
populateBoard(computerBoardDiv, 100, player, true, handleBoardBlockClick);

const players = [
  { player: player, enemyGameBoard: computerBoard },
  { player: computer, enemyGameBoard: playerBoard },
];

const determineWinner = (players) => {
  for (let i = 0; i < players.length; i++) {
    const { player, enemyGameBoard } = players[i];
    if (enemyGameBoard.areSunk()) {
      return player;
    }
  }
  return false;
};

const checkIfWin = (players) => {
  if (determineWinner(players)) {
    const winner = determineWinner(players);
    handleWin(winner);
  }
};

const run = () => {
  initializeGameBoard(playerBoard, SHIP_POSITIONS);
  initializeGameBoard(computerBoard, SHIP_POSITIONS);

  plotBoards();
};

const plotBoards = () => {
  plotBoard(computerBoardDiv, computerBoard, false);
  plotBoard(playerBoardDiv, playerBoard, true);
};

const resizeBoards = () => {
  resizeBoard(computerBoardDiv, 100);
  resizeBoard(playerBoardDiv, 100);
};

window.addEventListener('resize', () => {
  resizeBoards();
  plotBoards();
});

export default { run, plotBoards };

import GameBoard from './modules/gameBoard';
import Player from './modules/player';

import initializeGameBoard from './utils/initializeGameBoard';
import plotBoard from './utils/plotBoard';
import populateBoard from './utils/populateBoard';
import resizeBoard from './utils/resizeBoard';

import areLegalIndices from './utils/areLegalIndices';
import checkIfOccupied from './utils/checkIfOccupied';

import handleWin from './utils/handleWin';
import clearWinnerText from './utils/clearWinnerText';

import displayError from './utils/displayError';
import hideError from './utils/hideError';

import updateStatus from './utils/updateStatus';

import showPositionForm from './utils/showPositionForm';
import hidePositionForm from './utils/hidePositionForm';

import generateComputerPositions from './utils/generateComputerPositions';

let SHIP_POSITIONS = {
  2: [0, 1],
  '3a': [20, 21, 22],
  '3b': [40, 50, 60],
  4: [44, 45, 46, 47],
  5: [95, 96, 97, 98, 99],
};

let COMPUTER_POSITIONS = generateComputerPositions();

let GAME_NOT_STARTED = true;

const handleStartButtonClick = () => {
  updateStatus('STARTED');
  hidePositionForm();

  GAME_NOT_STARTED = false;
  populateBoard(playerBoardDiv, 100, computer, false, handleBoardBlockClick);
  populateBoard(computerBoardDiv, 100, player, true, handleBoardBlockClick);
  plotBoards();
};

const handleRestartButtonClick = () => {
  updateStatus('STOPPED');
  clearWinnerText();

  showPositionForm();

  GAME_NOT_STARTED = true;

  COMPUTER_POSITIONS = generateComputerPositions();

  playerBoard.clear();
  computerBoard.clear();

  populateBoard(playerBoardDiv, 100, computer, false, handleBoardBlockClick);
  populateBoard(computerBoardDiv, 100, player, true, handleBoardBlockClick);
  run();
};

const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
startButton.addEventListener('click', handleStartButtonClick);
restartButton.addEventListener('click', handleRestartButtonClick);

const handleBoardBlockClick = (player, i) => {
  if (GAME_NOT_STARTED) return;
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

  let processedInput;

  try {
    processedInput = processPositionInput(value, desiredLength);
    checkIfOccupied(processedInput, key, SHIP_POSITIONS);
  } catch (errorTxt) {
    displayError(errorTxt, key);
    return;
  }
  const oldIndices = SHIP_POSITIONS[key];

  SHIP_POSITIONS[key] = processedInput;

  playerBoard.moveShip(oldIndices[0], SHIP_POSITIONS[key]);

  populateBoard(playerBoardDiv, 100, computer, false, handleBoardBlockClick);
  plotBoards();

  hideError(key);
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
  initializeGameBoard(computerBoard, COMPUTER_POSITIONS);

  plotBoards();
};

const plotBoards = () => {
  plotBoard(computerBoardDiv, computerBoard, true);
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

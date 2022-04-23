import GameBoard from './modules/gameBoard';
import Player from './modules/player';

import initializeGameBoard from './utils/initializeGameBoard';
import plotBoard from './utils/plotBoard';
import populateBoard from './utils/populateBoard';
import resizeBoard from './utils/resizeBoard';

import handleWin from './utils/handleWin';

let SHIP_POSITIONS = {
  2: [0, 1],
  '3a': [20, 21, 22],
  '3b': [40, 41, 42],
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

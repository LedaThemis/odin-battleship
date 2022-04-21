import GameBoard from './modules/gameBoard';
import Player from './modules/player';

import initializeGameBoard from './utils/initializeGameBoard';
import plotBoard from './utils/plotBoard';
import populateBoard from './utils/populateBoard';
import resizeBoard from './utils/resizeBoard';

const handleBoardBlockClick = (player, i) => {
  player.play(i);
  plotBoards();

  if (determineWinner(players)) {
    const winner = determineWinner(players);
    alert(`${winner.getName()} won!`);
  }
  computer.computerPlay();

  if (determineWinner(players)) {
    const winner = determineWinner(players);
    alert(`${winner.getName()} won!`);
  }

  plotBoards();
};

const playerBoard = GameBoard();
const computerBoard = GameBoard();

const playerBoardDiv = document.querySelector('#board-1');
const computerBoardDiv = document.querySelector('#board-2');

const player = Player('Player', computerBoard);
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

const run = () => {
  initializeGameBoard(playerBoard);
  initializeGameBoard(computerBoard);

  plotBoards();
};

const plotBoards = () => {
  plotBoard(computerBoardDiv, computerBoard);
  plotBoard(playerBoardDiv, playerBoard);
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

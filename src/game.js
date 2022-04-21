import GameBoard from './modules/gameBoard';
import Player from './modules/player';

import initializeGameBoard from './utils/initializeGameBoard';
import plotBoard from './utils/plotBoard';
import populateBoard from './utils/populateBoard';

const playerBoard = GameBoard();
const computerBoard = GameBoard();

const playerBoardDiv = document.querySelector('#board-1');
const computerBoardDiv = document.querySelector('#board-2');

populateBoard(playerBoardDiv, 100);
populateBoard(computerBoardDiv, 100);

const determineWinner = (players) => {
  for (let i = 0; i < players.length; i++) {
    const { player, gameBoard } = players[i];
    if (gameBoard.areSunk()) {
      return player;
    }
  }
  return false;
};

const run = () => {
  initializeGameBoard(playerBoard);
  initializeGameBoard(computerBoard);

  const player = Player('Player', computerBoard);
  const computer = Player('Computer', playerBoard);

  let computerWon = playerBoard.areSunk();
  let playerWon = computerBoard.areSunk();

  const players = [
    { player: player, gameBoard: playerBoard },
    { player: computer, gameBoard: computerBoard },
  ];

  const interval = setInterval(() => {
    if (determineWinner(players)) {
      clearInterval(interval);

      const winner = determineWinner(players);
      console.log(winner.getName());

      return;
    } else {
      player.computerPlay();
      computer.computerPlay();
      plotBoards();
    }

    computerWon = playerBoard.areSunk();
    playerWon = computerBoard.areSunk();
  }, 10);

  plotBoards();
};

const plotBoards = () => {
  plotBoard(computerBoardDiv, computerBoard);
  plotBoard(playerBoardDiv, playerBoard);
};

window.addEventListener('resize', () => {
  playerBoardDiv.replaceChildren();
  computerBoardDiv.replaceChildren();

  populateBoard(playerBoardDiv, 100);
  populateBoard(computerBoardDiv, 100);

  plotBoards();
});

export default { run };

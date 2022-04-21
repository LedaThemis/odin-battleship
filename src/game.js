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

const whoseTurn = (players) => {
  for (let i = 0; i < players.length; i++) {
    const { player, _ } = players[i];
    if (player.getTurn()) {
      return player;
    }
  }
  if (players[0].player.getTurn() === players[0].player.getTurn()) {
    players[0].player.setTurn(!players[0].player.getTurn());
  }

  return players[0].player; // defaults to first player provided
};

const inverseTurns = (players) => {
  for (let i = 0; i < players.length; i++) {
    const { player, _ } = players[i];
    player.setTurn(!player.getTurn());
  }
};

const run = () => {
  initializeGameBoard(playerBoard);
  initializeGameBoard(computerBoard);

  const player = Player('Player', computerBoard);
  player.setTurn(true);
  const computer = Player('Computer', playerBoard);
  computer.setTurn(false);

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
      const currentPlayer = whoseTurn(players);
      currentPlayer.computerPlay();
      inverseTurns(players);

      plotBoards();
    }
  }, 1000);

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

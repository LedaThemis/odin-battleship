import Ship from '../modules/ship.js';

const initializeGameBoard = (gameBoard, shipPositions) => {
  gameBoard.placeShip(Ship, 2, shipPositions['2']);
  gameBoard.placeShip(Ship, 3, shipPositions['3a']);
  gameBoard.placeShip(Ship, 3, shipPositions['3b']);
  gameBoard.placeShip(Ship, 4, shipPositions['4']);
  gameBoard.placeShip(Ship, 5, shipPositions['5']);
};

export default initializeGameBoard;

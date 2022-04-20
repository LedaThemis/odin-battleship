import Ship from '../modules/ship.js';

const initializeGameBoard = (gameBoard) => {
  gameBoard.placeShip(Ship, 2, [0, 1]);
  gameBoard.placeShip(Ship, 3, [20, 21, 22]);
  gameBoard.placeShip(Ship, 3, [40, 41, 42]);
  gameBoard.placeShip(Ship, 4, [44, 45, 46, 47]);
  gameBoard.placeShip(Ship, 5, [95, 96, 97, 98, 99]);
};

export default initializeGameBoard;

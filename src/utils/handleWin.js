import displayWinner from './displayWinner';

const handleWin = (winner) => {
  displayWinner(`${winner.getName()} won!`);
};

export default handleWin;

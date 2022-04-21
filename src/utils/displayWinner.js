const displayWinner = (text) => {
  const p = document.querySelector('#winner-status');

  p.textContent = text;
};

export default displayWinner;

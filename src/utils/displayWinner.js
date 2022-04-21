const displayWinner = (text) => {
  const p = document.querySelector('#winner-status');

  p.style = '';
  p.textContent = text;
};

export default displayWinner;

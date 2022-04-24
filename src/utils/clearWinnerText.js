const clearWinnerText = () => {
  const p = document.querySelector('#winner-status');

  p.style.opacity = 0;
  p.textContent = '';
};

export default clearWinnerText;

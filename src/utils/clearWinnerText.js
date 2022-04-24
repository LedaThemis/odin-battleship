const clearWinnerText = () => {
  const p = document.querySelector('#winner-status');

  p.style.display = 'none';
  p.textContent = '';
};

export default clearWinnerText;

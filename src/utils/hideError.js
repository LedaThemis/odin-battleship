const hideError = (key) => {
  const span = document.querySelector(`.position-input-error[data-key="${key}"]`);
  span.textContent = '';
  span.style.display = 'none';
};

const displayError = (message, key) => {
  const span = document.querySelector(`.position-input-error[data-key="${key}"]`);
  span.textContent = message;
  span.style.display = '';
};

export default displayError;

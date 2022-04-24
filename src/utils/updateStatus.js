const updateStatus = (text) => {
  const statusSpan = document.querySelector('#status-span');
  statusSpan.textContent = text;
};

export default updateStatus;

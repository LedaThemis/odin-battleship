const checkIfOccupied = (newIndices, shipKey, currentShipPositions) => {
  for (const k in currentShipPositions) {
    if (`${k}` === shipKey) {
      continue;
    } else if (currentShipPositions[k].some((v) => newIndices.includes(v))) {
      throw 'There is a ship there already';
    }
  }
};

export default checkIfOccupied;

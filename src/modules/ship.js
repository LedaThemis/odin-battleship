const Ship = (length) => {
  let _hitArray = Array(length).fill(false);

  const hit = (index) => {
    _hitArray = _hitArray.map((v, i) => (index === i ? true : v));
  };

  const getHitArray = () => {
    const hitIndicesArray = [];
    _hitArray.filter((v, i) => (v === true ? hitIndicesArray.push(i) : null));
    return hitIndicesArray;
  };

  const isSunk = () => {
    return _hitArray.every((v) => v === true);
  };

  return {
    getHitArray,
    hit,
    isSunk,
  };
};

module.exports = Ship;

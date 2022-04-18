const Ship = (length) => {
  let _hitArray = Array(length).fill(false);

  const hit = (index) => {
    _hitArray = _hitArray.map((v, i) => (index === i ? true : v));
  };

  const getHitArray = () => {
    const hitIndicesArray = [];
    _hitArray.filter((_, i) => hitIndicesArray.push(i));
    return hitIndicesArray;
  };

  return {
    getHitArray,
    hit,
  };
};

module.exports = Ship;

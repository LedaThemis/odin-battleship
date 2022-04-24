import arrayEqual from './arrayEqual';

const areLegalIndices = (indices) => {
  const firstIndex = indices[0];
  const overflow = Math.ceil((firstIndex + 1) / 10) * 10;
  if (firstIndex + indices.length > overflow) return false;

  const horizontal = [...Array(indices.length).keys()].map((i) => i + firstIndex);
  const vertical = [...Array(indices.length).keys()].map((i) => i * 10 + firstIndex);

  return arrayEqual(indices, horizontal) || arrayEqual(indices, vertical);
};

export default areLegalIndices;

const getOddVertices = (mst) => {
  let oddVertices = [];

  for (let i = 0; i < mst.length; i++) {
    let row = mst[i];
    let zeroCount = row.reduce(function (count, currentValue) {
      if (currentValue !== 0) {
        return count + 1;
      }
      return count;
    }, 0);
    if (zeroCount % 2 !== 0) {
      oddVertices.push(i);
    }
  }

  return oddVertices;
};

module.exports = getOddVertices;

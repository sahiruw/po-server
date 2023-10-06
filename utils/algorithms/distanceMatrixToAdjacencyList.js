function distanceMatrixToAdjacencyList(distanceMatrix) {
  const adjacencyList = [];

  for (let i = 0; i < distanceMatrix.length; i++) {
    const neighbors = [];

    for (let j = 0; j < distanceMatrix[i].length; j++) {
      if (i !== j && distanceMatrix[i][j] !== 0) {
        neighbors.push({ node: j, distance: distanceMatrix[i][j] });
      }
    }

    adjacencyList.push(neighbors);
  }

  return adjacencyList;
}

module.exports = distanceMatrixToAdjacencyList;
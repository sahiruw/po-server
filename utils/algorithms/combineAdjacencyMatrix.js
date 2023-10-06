const combineAdjacencyMatrix = (minCostConnections, adjacencyList) => {
  for (let i = 0; i < minCostConnections.length; i++) {
    let connection = minCostConnections[i];
    adjacencyList[connection.nodeA].push({
      node: connection.nodeB,
      distance: connection.distance,
    });
    adjacencyList[connection.nodeB].push({
      node: connection.nodeA,
      distance: connection.distance,
    });
  }
  return adjacencyList;
};

module.exports = combineAdjacencyMatrix;
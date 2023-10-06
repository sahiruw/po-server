function connectNodesWithMinCost(distanceMatrix, nodes) {
    const n = nodes.length;
    if (n % 2 !== 0) {
      throw new Error("The number of nodes must be even to form pairs.");
    }
  
    // Sort the nodes based on their total distance to all other nodes
    nodes.sort((a, b) => {
      const sumA = nodes.reduce((sum, node) => sum + distanceMatrix[a][node], 0);
      const sumB = nodes.reduce((sum, node) => sum + distanceMatrix[b][node], 0);
      return sumA - sumB;
    });
  
    const result = [];
    const paired = new Set();
  
    // Connect nodes in pairs with minimum distance
    for (let i = 0; i < n; i += 2) {
      const nodeA = nodes[i];
      let nodeB = nodes[i + 1];
      while (paired.has(nodeA) || paired.has(nodeB)) {
        nodeB = nodes[(nodes.indexOf(nodeB) + 1) % n];
      }
      paired.add(nodeA);
      paired.add(nodeB);
      result.push({ nodeA, nodeB, distance: distanceMatrix[nodeA][nodeB] });
    }
  
    return result;
  }

module.exports = connectNodesWithMinCost;
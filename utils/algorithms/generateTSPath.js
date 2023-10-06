function findEulerianTour(adjacencyList) {
  const eulerianTour = [];

  function dfs(node) {
    while (adjacencyList[node].length > 0) {
      const edge = adjacencyList[node].shift();
      if (!edge.visited) {
        edge.visited = true;
        dfs(edge.node);
      }
    }
    eulerianTour.push(node);
  }

  // Start the tour from the first node (assuming it exists)
  if (adjacencyList.length > 0) {
    dfs(0);
  }

  // Check if all edges have been visited
  for (const neighbors of adjacencyList) {
    for (const edge of neighbors) {
      if (!edge.visited) {
        return null; // Graph has an Eulerian path, not a tour
      }
    }
  } 

  return eulerianTour.reverse(); // Reverse the tour to get the correct order
}



const generateTSPath = (adjacencyList, N) => {

  let tsppath = [0];
  let eupath = findEulerianTour(adjacencyList);
  for (let node of eupath){
    if (!tsppath.includes(node)){
      tsppath.push(node);
    }
  }
  tsppath.push(0);
  return tsppath;
};


module.exports = generateTSPath;
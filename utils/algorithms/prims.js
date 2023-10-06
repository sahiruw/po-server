function primMST(distanceMatrix) {
    const n = distanceMatrix.length;
    const parent = new Array(n).fill(-1); // Initialize an array to track parent nodes.
    const key = new Array(n).fill(Number.MAX_VALUE); // Initialize an array to track key values (minimum edge weights).
    const mstSet = new Array(n).fill(false); // Initialize an array to track whether vertices are included in MST.
  
    key[0] = 0; // Start with the first vertex as the root.
  
    for (let count = 0; count < n - 1; count++) {
      const minKeyIndex = findMinKeyIndex(key, mstSet);
      mstSet[minKeyIndex] = true;
  
      for (let v = 0; v < n; v++) {
        if (distanceMatrix[minKeyIndex][v] > 0 && !mstSet[v] && distanceMatrix[minKeyIndex][v] < key[v]) {
          parent[v] = minKeyIndex;
          key[v] = distanceMatrix[minKeyIndex][v];
        }
      }
    }
  
    // Create the MST distance matrix.
    const mstMatrix = [];
    for (let i = 0; i < n; i++) {
      mstMatrix.push([]);
      for (let j = 0; j < n; j++) {
        mstMatrix[i][j] = 0; // Initialize all distances to 0.
      }
    }
  
    for (let i = 1; i < n; i++) {
      mstMatrix[parent[i]][i] = distanceMatrix[i][parent[i]] = key[i];
      mstMatrix[i][parent[i]] = distanceMatrix[i][parent[i]] = key[i];
    }
  
    return mstMatrix;
  }
  
  function findMinKeyIndex(key, mstSet) {
    const n = key.length;
    let min = Number.MAX_VALUE;
    let minIndex = -1;
  
    for (let v = 0; v < n; v++) {
      if (!mstSet[v] && key[v] < min) {
        min = key[v];
        minIndex = v;
      }
    }
  
    return minIndex;
  }


  module.exports = primMST;
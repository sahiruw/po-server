const primMST = require("./prims.js");
const connectNodesWithMinCost = require("./connectNodesWithMinCost.js");
const getOddVertices = require("./getOddVertices.js");
const distanceMatrixToAdjacencyList = require("./distanceMatrixToAdjacencyList.js");
const combineAdjacencyMatrix = require("./combineAdjacencyMatrix.js");
const generateTSPath = require("./generateTSPath.js");




const christofides = (distanceMatrix) => {
  let mst = primMST(distanceMatrix);
  let oddVertices = getOddVertices(mst);
  let adjacencyList = distanceMatrixToAdjacencyList(mst);
    
  let minCostConnections = connectNodesWithMinCost(distanceMatrix, oddVertices);
  adjacencyList = combineAdjacencyMatrix(minCostConnections, adjacencyList);

  let tspPath = generateTSPath(adjacencyList, distanceMatrix.length);
  return tspPath;
};

module.exports = christofides;

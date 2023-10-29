const primMST = require("./prims.js");
const connectNodesWithMinCost = require("./connectNodesWithMinCost.js");
const getOddVertices = require("./getOddVertices.js");
const distanceMatrixToAdjacencyList = require("./distanceMatrixToAdjacencyList.js");
const combineAdjacencyMatrix = require("./combineAdjacencyMatrix.js");
const generateTSPath = require("./generateTSPath.js");




const christofides = (distanceMatrix) => {
  // console.log("distanceMatrix", distanceMatrix);
  let mst = primMST(distanceMatrix);
  // console.log("mst", mst);
  let oddVertices = getOddVertices(mst);
  // console.log("oddVertices", oddVertices);
  let adjacencyList = distanceMatrixToAdjacencyList(mst);
  // console.log("adjacencyList", adjacencyList);
  let minCostConnections = connectNodesWithMinCost(distanceMatrix, oddVertices);
  adjacencyList = combineAdjacencyMatrix(minCostConnections, adjacencyList);

  let tspPath = generateTSPath(adjacencyList, distanceMatrix.length);
  return tspPath;
};

module.exports = christofides;

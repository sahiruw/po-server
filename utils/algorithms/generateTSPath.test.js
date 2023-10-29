const generateTSPath = require('./generateTSPath'); // Import the function to be tested

describe('generateTSPath', () => {
  it('should return the path for a simple graph', () => {
    const adjacencyList = [[{ node: 1, visited: false }], [{ node: 0, visited: false }]];
    const result = generateTSPath(adjacencyList, 2);
    expect(result).toEqual([0, 1, 0]);
  });

  it('should return the path for a larger graph', () => {
    const adjacencyList = [
      [{ node: 1, visited: false }, { node: 2, visited: false }],
      [{ node: 0, visited: false }, { node: 2, visited: false }],
      [{ node: 0, visited: false }, { node: 1, visited: false }],
    ];
    const result = generateTSPath(adjacencyList, 3);
    expect(result).toEqual([0, 1, 2, 0]);
  });

  it('should handle graphs without a tour', () => {
    const adjacencyList = [
      [{ node: 1, visited: false }],
      [{ node: 0, visited: false }],
      [{ node: 4, visited: false }],
      [{ node: 2, visited: false }],
    ];
    const result = generateTSPath(adjacencyList, 4);
    expect(result).toBe(null);
  });

  it('should return the path for a self-loop graph', () => {
    const adjacencyList = [[{ node: 0, visited: false }]];
    const result = generateTSPath(adjacencyList, 1);
    expect(result).toEqual([0, 0]);
  });
});

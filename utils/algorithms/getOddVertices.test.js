const getOddVertices = require('./getOddVertices'); // Import the function to be tested

describe('getOddVertices', () => {
  it('should return an empty array for an empty input', () => {
    expect(getOddVertices([])).toEqual([]);
  });

  it('should return an empty array for a single-vertex graph', () => {
    expect(getOddVertices([[0]])).toEqual([]);
  });

  it('should return vertices with an odd number of edges', () => {
    const graph = [
      [0, 1, 1, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 0],
    ];
    const result = getOddVertices(graph);
    expect(result).toEqual([ 1 , 3 ]);
  });

  it('should handle a graph with no odd-degree vertices', () => {
    const graph = [
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 0, 1],
      [1, 1, 1, 0],
    ];
    const result = getOddVertices(graph);
    expect(result).toEqual([]);
  });
});

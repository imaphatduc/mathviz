import { Vector } from 'p5';
import { Organism } from './Organism';

const getNeighborhood = (
  cell: Vector,
  organism: Organism,
  xUnits: number,
  yUnits: number
) => {
  const { x, y } = cell;

  const neighborhood: Organism = Array(3)
    .fill([])
    .map(() => Array(3).fill(0));

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // exclude the current cell
      if (i !== 0 || j !== 0) {
        if (x > 0 && x < xUnits - 1 && y > 0 && y < yUnits - 1) {
          neighborhood[i + 1][j + 1] = organism[x + i][y + j];
        }
      }
    }
  }

  return neighborhood;
};

export const liveOrDie = (
  cell: Vector,
  alive: boolean,
  organism: Organism,
  xUnits: number,
  yUnits: number
) => {
  const neighborhood = getNeighborhood(cell, organism, xUnits, yUnits);

  const numLiveNeighbors = neighborhood
    .flat()
    .filter((neighbor) => neighbor === 1).length;

  if (alive) {
    return numLiveNeighbors === 2 || numLiveNeighbors === 3;
  }

  return numLiveNeighbors === 3;
};

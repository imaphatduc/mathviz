import { P5CanvasInstance } from '@p5-wrapper/react';
import { Vector } from 'p5';
import { Organism } from './Organism';
import { liveOrDie } from './cells';
import { parser } from './parser';

export const sketch = (
  p: P5CanvasInstance<{
    patternEncoded: string;
    offset: number;
    unit: number;
    setUnit: (state: number) => void;
  }>
) => {
  const GRAY = p.color('#918a6d');
  const BROWN = p.color('#6f4e37');
  const ORANGE = p.color('#ff8546');

  let organism: Organism;
  let xUnits: number;
  let yUnits: number;
  let unit: number;

  p.setup = () => {
    p.createCanvas(0, 0);
    p.frameRate(10);
  };

  p.updateWithProps = (props) => {
    if (props.patternEncoded) {
      organism = parser(props.patternEncoded, props.offset);
      xUnits = organism.length;
      yUnits = organism[0].length;

      let boundedXUnit = props.unit;
      if (xUnits * props.unit > p.windowHeight - 5) {
        boundedXUnit = Math.floor((p.windowHeight - 5) / xUnits);
      }

      let boundedYUnit = props.unit;
      if (yUnits * props.unit > p.windowWidth - 5) {
        boundedYUnit = Math.floor((p.windowWidth - 5) / yUnits);
      }

      unit = Math.min(boundedXUnit, boundedYUnit);
      props.setUnit(unit);
      const Width = xUnits * unit;
      const Height = yUnits * unit;
      p.resizeCanvas(Height, Width);
    }
  };

  p.draw = () => {
    p.background(0);
    p.stroke(BROWN);
    p.strokeWeight(0.1);

    organism = organism.map((row, i) =>
      row.map((bin, j) => {
        const cell = new Vector(i, j);

        const destiny = liveOrDie(cell, bin === 1, organism, xUnits, yUnits);
        // const destiny = bin === 1;

        if (destiny) {
          p.fill(ORANGE);
        } else {
          GRAY.setAlpha(12);
          p.fill(GRAY);
        }

        p.square(cell.y * unit, cell.x * unit, unit);

        return destiny ? 1 : 0;
      })
    );
  };
};

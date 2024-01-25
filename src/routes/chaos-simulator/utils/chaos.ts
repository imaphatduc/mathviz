import { Vector3 } from 'cubecubed';

type ChaosEquation = (params: number[]) => (v: Vector3, t?: number) => Vector3;

export const chaos: ChaosEquation =
  (params) =>
  ({ x, y }, t = 1) => {
    const xx = x * x;
    const xy = x * y;
    const yy = y * y;

    // prettier-ignore
    const nx = params[0] * t + params[1] * x * t + params[2] * xx + params[3] * xy + params[4] * y * t + params[5] * yy;
    // prettier-ignore
    const ny = params[6] * t + params[7] * x * t + params[8] * xx + params[9] * xy + params[10] * y * t + params[11] * yy;
    const nz = 0;

    return new Vector3(nx, ny, nz);
  };

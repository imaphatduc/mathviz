// @ts-nocheck
import {
  CanvasGroup,
  Flow,
  Group,
  MathTex,
  Particle,
  Scene,
  Vector2,
  Vector3,
} from 'cubecubed';
import { chaos } from './chaos';
import { equationGen } from './equationGen';
import { str2params } from './str2params';

export const scene = (
  stringParams: string,
  tRange: [number, number],
  dt: number
) => {
  const scene = new Scene('chaotic-particles-scene');

  const params = str2params(stringParams);

  (() => {
    const group = new CanvasGroup('chaotic-particles', scene, {
      postprocessing: {
        afterimage: true,
      },
    });

    let position = new Vector3(0.01, 0.01, 0.01);

    const particles = [...Array(5000)].map(() => {
      const particle = new Particle({
        group,
        position,
        radius: 0.5,
        scaleFactor: 5,
        CONFIG: {
          fillColor: '#c8d3f5',
        },
      }).render();

      position = chaos(params)(position, tRange[0]);

      return particle;
    });

    const flowAnimations = particles.map((particle) => {
      return new Flow({
        cubicon: particle,
        functionDef: chaos(params),
        tRange,
        dt,
      });
    });

    group.play(flowAnimations);
  })();

  (() => {
    const group = new Group('chaos-equation', scene);

    const xPos = -16;

    new MathTex({
      group,
      position: new Vector2(xPos, 7.5),
      text: equationGen(params.slice(0, 6), 'x'),
      CONFIG: {
        color: '#fff',
      },
    }).render();

    new MathTex({
      group,
      position: new Vector2(xPos, 6.5),
      text: equationGen(params.slice(6), 'y'),
      CONFIG: {
        color: '#fff',
      },
    }).render();
  })();
};

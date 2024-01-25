import dat from 'dat.gui';
import { useEffect, useState } from 'react';
import GithubCorneredLayout from '../../layouts/GithubCorneredLayout';
import { scene } from './utils/scene';

// const stringParams = "FIRCDERRPVLD"; // cool
// const stringParams = 'MDVAIDOYHYEA'; // cool
// const stringParams = 'GIIETPIQRRUL'; // hmmm

export default function ChaosSimulator() {
  const [stringParams, setStringParams] = useState('MDVAIDOYHYEA');
  const [numParticles, setNumParticles] = useState(5000);
  const [t0, set_t0] = useState(0.85);
  const [t1, set_t1] = useState(2);
  const [dt, set_dt] = useState(0.0005);

  useEffect(() => {
    const gui = new dat.GUI();

    const gui_code = gui.add({ stringParams }, 'stringParams').name('code');
    const gui_numParticles = gui
      .add({ numParticles }, 'numParticles')
      .name('num_particles');
    const gui_t0 = gui.add({ t0 }, 't0').name('t_start');
    const gui_t1 = gui.add({ t1 }, 't1').name('t_end');
    const gui_dt = gui.add({ dt }, 'dt').name('dt');

    gui_code.onChange((value) => {
      setStringParams(value);
    });

    gui_numParticles.onChange((value) => {
      setNumParticles(value);
    });

    gui_t0.onChange((value) => {
      set_t0(value);
    });

    gui_t1.onChange((value) => {
      set_t1(value);
    });

    gui_dt.onChange((value) => {
      set_dt(value);
    });
  }, []);

  useEffect(() => {
    document.getElementById('cubecubed')!.innerHTML = '';
    scene(stringParams, numParticles, [t0, t1], dt);
  }, [stringParams, t0, dt]);

  return (
    <GithubCorneredLayout>
      <div
        id="cubecubed"
        style={{
          backgroundColor: '#000',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </GithubCorneredLayout>
  );
}

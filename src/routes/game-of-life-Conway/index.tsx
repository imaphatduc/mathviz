import { ReactP5Wrapper } from '@p5-wrapper/react';
import dat from 'dat.gui';
import { useEffect, useState } from 'react';
import GithubCorneredLayout from '../../layouts/GithubCorneredLayout';
import { Organism } from './utils/Organism';
import { sketch } from './utils/sketch';

export default function GameOfLife() {
  const [patterns, setPatterns] = useState<string[] | null>(null);
  const [searchedPatterns, setSearchedPatterns] = useState<string[]>([]);
  const [currentPattern, setCurrentPattern] = useState('pulsar');
  const [currentPatternEncoded, setCurrentPatternEncoded] = useState<
    string | null
  >(null);
  const [offset, setOffset] = useState(2);
  const [organism, setOrganism] = useState<Organism>([]);
  const [xUnits, setXUnits] = useState(0);
  const [yUnits, setYUnits] = useState(0);

  useEffect(() => {
    import('./utils/patterns.txt?raw').then((file) => {
      const parsedPatterns = file.default
        .split('\n')
        .map((pattern) => pattern.replace('.cells', ''));
      setPatterns(parsedPatterns);
      setSearchedPatterns(parsedPatterns);

      const gui = new dat.GUI();

      const gui_pattern = gui
        .add({ currentPattern }, 'currentPattern')
        .name('pattern');
      gui_pattern.onChange((value) => setCurrentPattern(value));

      const gui_offset = gui.add({ offset }, 'offset').name('offset');
      gui_offset.onChange((value) => setOffset(value));
    });
  }, []);

  useEffect(() => {
    if (patterns) {
      import(`./raw/${currentPattern}.cells?raw`).then(
        ({ default: patternEncoded }: typeof import('*?raw')) => {
          setCurrentPatternEncoded(patternEncoded);
        }
      );
    }
  }, [patterns, currentPattern, offset]);

  return (
    <GithubCorneredLayout>
      <div
        style={{
          backgroundColor: 'black',
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
        }}
      >
        <div
          style={{
            color: 'white',
            backgroundColor: '#111',
            overflowX: 'hidden',
            overflowY: 'scroll',
            paddingTop: '6rem',
          }}
        >
          {patterns && (
            <div
              style={{
                margin: '0 2rem',
              }}
            >
              <input
                placeholder="Search pattern"
                style={{
                  height: '1.8rem',
                  marginBottom: '1rem',
                  padding: '3px 8px',
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: '1rem',
                  border: '1px solid #555',
                }}
                onChange={(e) =>
                  setSearchedPatterns(
                    e.target.value.length > 0
                      ? patterns.filter((pattern) =>
                          pattern.includes(e.target.value)
                        )
                      : patterns
                  )
                }
              />
              {searchedPatterns.map((pattern, i) => (
                <a
                  href={`https://www.conwaylife.com/patterns/${pattern}.cells`}
                  target="_blank"
                  key={i}
                >
                  <p
                    style={{
                      margin: '10px 0',
                    }}
                  >
                    {pattern}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {currentPatternEncoded && (
            <ReactP5Wrapper
              sketch={sketch}
              patternEncoded={currentPatternEncoded}
              offset={offset}
            />
          )}
        </div>
      </div>
    </GithubCorneredLayout>
  );
}

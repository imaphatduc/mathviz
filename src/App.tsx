import { Route } from 'wouter';
import ChaosSimulator from './routes/chaos-simulator';
import GameOfLife from './routes/game-of-life-Conway';

export default function App() {
  const base = '/mathviz/#';

  return (
    <div>
      <Route path={`${base}/chaos-simulator`}>
        <ChaosSimulator />
      </Route>
      <Route path={`${base}/game-of-life-Conway`}>
        <GameOfLife />
      </Route>
    </div>
  );
}

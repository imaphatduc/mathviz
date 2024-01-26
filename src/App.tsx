import { Route } from 'wouter';
import ChaosSimulator from './routes/chaos-simulator';
import GameOfLife from './routes/game-of-life-Conway';

export default function App() {
  return (
    <>
      <Route path="/chaos-simulator">
        <ChaosSimulator />
      </Route>
      <Route path="/game-of-life-Conway">
        <GameOfLife />
      </Route>
    </>
  );
}

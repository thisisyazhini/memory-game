import {
  TCanvasConfettiInstance,
  TConductorInstance,
} from 'react-canvas-confetti/dist/types';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

interface params {
  confetti: TCanvasConfettiInstance;
  conductor: TConductorInstance;
}

export function Confetti() {
  function handleInit({ conductor }: params) {
    conductor.run({ speed: 2, duration: 3000 });
  }

  return <Fireworks onInit={handleInit} />;
}

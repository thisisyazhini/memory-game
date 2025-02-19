import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

export function Confetti() {
  const handleInit = ({ conductor }) => {
    // Use conductor methods to control the animation
    conductor.run({ speed: 2, duration: 3000 });
  };

  return <Fireworks onInit={handleInit} />;
}

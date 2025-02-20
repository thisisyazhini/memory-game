import { formatTime } from '../utils/helper';
import { useState, useEffect, useRef, Ref } from 'react';

interface props {
  isGameStarted: boolean;
  isGameEnded: boolean;
  onElapsedTime(timer: number): void;
}

const Timer: React.FC<props> = ({
  isGameStarted,
  isGameEnded,
  onElapsedTime,
}) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef: Ref<number | null> = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
    setTimer(0);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onElapsedTime(timer);
    console.log(`Elapsed time: ${timer} seconds`);
  };

  useEffect(() => {
    if (isGameStarted && !isGameEnded) {
      startTimer();
    }
    if (isGameEnded) {
      stopTimer();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isGameStarted, isGameEnded]);

  return <div>{formatTime(timer)}</div>;
};

export default Timer;

import { formatTime } from '../utils/helper';
import { useState, useEffect, useRef, Ref, useCallback } from 'react';
import PauseScreen from './PauseScreen';

interface props {
  isGameStarted: boolean;
  isGameEnded: boolean;
  onElapsedTime(timer: number): void;
  onResetGame(): void;
}

const Timer: React.FC<props> = ({
  isGameStarted,
  isGameEnded,
  onElapsedTime,
  onResetGame,
}) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef: Ref<number | null> = useRef(null);
  const [showPauseScreen, setShowPauseScreen] = useState(false);

  const startTimer = useCallback((reset: boolean) => {
    setIsRunning(true);
    if (reset) setTimer(0);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onElapsedTime(timer);
    console.log(`Elapsed time: ${timer} seconds`);
  }, [timer, onElapsedTime]);

  const pauseTimer = useCallback(() => {
    setIsRunning(!isRunning);
    // Pause timer
    setShowPauseScreen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const onContinue = () => {
    setShowPauseScreen(false);
    startTimer(false);
  };

  const onReset = () => {
    setShowPauseScreen(false);
    startTimer(true);
    onResetGame();
  };

  useEffect(() => {
    if (isGameStarted && !isGameEnded) {
      // reset game
      startTimer(true);
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

  return (
    <>
      <div className="flex gap-8 items-center">
        <button
          className="btn btn-neutral flex items-center justify-between border border-dashed border-neutral p-3 rounded-2xl cursor-pointer w-30"
          onClick={pauseTimer}
        >
          {isRunning ? (
            <>
              Pause
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
                />
              </svg>
            </>
          ) : (
            <>
              Play
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#d32a79"
                  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                />
              </svg>
            </>
          )}
        </button>
        <p className="text-2xl text-standard">{formatTime(timer)}</p>
      </div>
      {showPauseScreen && (
        <PauseScreen
          gameTime={timer}
          isOpen={showPauseScreen}
          onReset={onReset}
          onContinue={onContinue}
        ></PauseScreen>
      )}
    </>
  );
};

export default Timer;

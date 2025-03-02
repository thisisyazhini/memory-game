import React from 'react';
import Timer from './Timer';

interface props {
  isGameOn: boolean;
  isGameOver: boolean;
  onResetGame(): void;
  onElapsedTime(timer: number): void;
}
const Header: React.FC<props> = ({
  isGameOn,
  isGameOver,
  onResetGame,
  onElapsedTime,
}) => {
  return (
    <div className="bg-color-base-100 text-2xl flex justify-around items-center px-4 h-20 flex-col md:flex-row space-y-4 md:justify-between">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-color-base-content">
        Memory, it is!
      </h1>
      <div className="flex items-center gap-4">
        <button
          className="btn btn-neutral btn-md md:btn-lg lg:btn-xl rounded-full"
          onClick={onResetGame}
        >
          Replay
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3 md:size-5"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z"
            />
          </svg>
        </button>
        <Timer
          onResetGame={onResetGame}
          isGameStarted={isGameOn}
          isGameEnded={isGameOver}
          onElapsedTime={onElapsedTime}
        />
      </div>
    </div>
  );
};

export default Header;

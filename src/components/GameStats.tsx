import { formatTime } from '../utils/helper';
import React, { useEffect, useRef } from 'react';

interface props {
  isOpen: boolean;
  gameTime: number;
  onClose(): void;
  onResetGame(): void;
}

const GameStats: React.FC<props> = ({
  gameTime,
  isOpen,
  onClose,
  onResetGame,
}) => {
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);
  return (
    <div ref={divRef} tabIndex={-1}>
      {isOpen && (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-1000">
          <div
            className="absolute bg-neutral w-full h-full flex"
            onClick={onClose}
          >
            <div className="absolute top-4 right-4 text-lg md:text-xl lg:text-2xl border border-error text-error border-dashed p-2 rounded-4xl cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 md:size-7"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-neutral-content text-4xl md:text-5xl lg:text-6xl mt-20">
                Level Complete!
              </h2>
              <div className="grid grid-cols-2 gap-4 p-4 text-info text-lg my-10 border border-dashed border-info rounded-2xl">
                <p>Personal Best</p>
                <span>{formatTime(gameTime)}</span>
                <p>Game time</p>
                <span>{formatTime(gameTime)}</span>
              </div>
              <div
                className="border border-success border-dashed rounded-2xl p-4 text-xl cursor-pointer"
                onClick={onResetGame}
              >
                <span className="text-success">Play again</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;

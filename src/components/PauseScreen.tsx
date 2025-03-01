import { formatTime } from '../utils/helper';
import React from 'react';

interface props {
  gameTime: number;
  isOpen: boolean;
  onReset(): void;
  onContinue(): void;
}

const PauseScreen: React.FC<props> = ({
  gameTime,
  isOpen,
  onReset,
  onContinue,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-1000">
          <div className="absolute bg-neutral w-full h-full flex flex-col items-center justify-center gap-10 cursor-pointer">
            <h2 className="text-8xl text-base-content">We are on a break!</h2>
            <p className="text-6xl text-neutral-content">
              {formatTime(gameTime)}
            </p>
            <div className="flex items-center gap-20">
              <button
                className="btn btn-error btn-dash btn-xl"
                onClick={onReset}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  width="40"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z"
                  />
                </svg>
              </button>
              <button
                className="btn btn-success btn-dash btn-xl"
                onClick={onContinue}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  width="40"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default PauseScreen;

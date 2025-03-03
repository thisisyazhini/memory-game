import React, { useEffect, useRef } from 'react';

interface props {
  onRetry(): void;
}
const ErrorNotification: React.FC<props> = ({ onRetry }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.focus();
  }, []);
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center gap-10 bg-color-base-100"
      ref={divRef}
      tabIndex={-1}
    >
      <h2 className="text-5xl md:text-6xl lg:text-8xl text-center">
        😬Something seems broken!🙈
      </h2>
      <p className="text-4xl md:text-5xl lg:text-6xl text-center">
        Lets try to see if your magic touch fixes it.
      </p>
      <button
        className="btn btn-info btn-md md:btn-lg lg:btn-xl btn-dash rounded-full"
        onClick={onRetry}
      >
        Retry
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 md:size-6 lg:size-10"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ErrorNotification;

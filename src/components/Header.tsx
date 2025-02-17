import React from 'react';

const Header = () => {
  return (
    <div className="bg-rose-200 text-2xl flex justify-between items-center px-4 h-20">
      <h1 className="text-6xl">Memory, it is!</h1>
      <div className="flex items-center gap-8">
        <button className="flex items-center gap-2">
          Reset
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 512 512"
          >
            <path
              fill="#d32a79"
              d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"
            />
          </svg>
        </button>
        <button className="flex items-center gap-2">
          Replay
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 512 512"
          >
            <path
              fill="#d32a79"
              d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;

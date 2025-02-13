const Start = ({ onStartClick }) => {
  return (
    <div className="flex flex-col space-y-10 justify-center h-screen">
      <h1 className="inline-block text-standard text-9xl mx-auto  border-b-hot-pink border-b-[12px] max-w-fit">
        Memory, it is!
      </h1>
      <div className="flex justify-center ">
        <button
          className="btn btn-dash text-7xl text-standard h-20"
          onClick={onStartClick}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default Start;

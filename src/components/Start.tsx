interface startProps {
  onStartClick(): void;
}

const Start: React.FC<startProps> = ({ onStartClick }) => {
  return (
    <div className="flex flex-col space-y-10 justify-center h-screen">
      <h1 className="inline-block text-standard text-9xl mx-auto  border-b-hot-pink border-b-[12px] max-w-fit">
        Memory, it is!
      </h1>
      <div className="flex justify-center ">
        <button
          className="text-7xl border border-dashed border-hot-pink p-3 rounded-2xl cursor-pointer w-50"
          onClick={onStartClick}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default Start;

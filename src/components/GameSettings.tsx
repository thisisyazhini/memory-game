import { Categories } from '@/models/categories';
import { fetchEmojiCategories } from '../utils/service';
import { useEffect, useState } from 'react';
import { difficultyLevels } from '../utils/constants';

interface gameProps {
  onStartClick(): void;
  onDifficultySet(noOfCards: number): void;
}

const GameSettings: React.FC<gameProps> = ({
  onDifficultySet,
  onStartClick,
}) => {
  const [gameCategories, setGameCategories] = useState<Categories[]>([]);
  useEffect(() => {
    async function fetchCategory() {
      const categories = await fetchEmojiCategories();
      setGameCategories(categories);
    }
    fetchCategory();
  }, []);
  const setDifficulty = (noOfCards: number) => {
    document.activeElement?.blur();
    onDifficultySet(noOfCards);
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-20 h-screen">
      <h1 className="inline-block text-color-base-content text-9xl mx-auto border-b-neutral border-b-[12px] max-w-fit">
        Memory, it is!
      </h1>

      <form className="flex items-center justify-center gap-40">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-xl btn-accent btn-outline m-1"
          >
            Emoji Category
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <>
              {gameCategories.map((category, index) => (
                <li key={index} value={category.slug}>
                  <button>{category.slug}</button>
                </li>
              ))}
            </>
          </ul>
        </div>
        {/* {gameCategories.map((category, index) => (
                <option key={index} value={category.slug}>
                  {category.slug}
                </option>
              ))} */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-xl btn-accent btn-outline m-1"
          >
            Difficulty Level
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {difficultyLevels.map((level, index) => (
              <li key={index} value={level.name}>
                <button onClick={() => setDifficulty(level.value)}>
                  {level.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
      <button
        onClick={onStartClick}
        className="btn btn-success btn-outline btn-xl rounded-full min-w-[200px]"
      >
        START
      </button>
    </div>
  );
};

export default GameSettings;

import { Categories } from '@/models/categories';
import { fetchEmojiCategories } from '../utils/service';
import { useCallback, useEffect, useState } from 'react';
import { difficultyLevels } from '../utils/constants';

interface gameProps {
  onStartClick(): void;
}

interface DifficultyLevels {
  name: string;
  value: number;
}

const GameSettings: React.FC<gameProps> = ({ onStartClick }) => {
  const [gameCategories, setGameCategories] = useState<Categories[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyLevels[]>([]);
  // setDifficulty(difficultyLevels);
  useEffect(() => {
    async function fetchCategory() {
      const categories = await fetchEmojiCategories();
      setGameCategories(categories);
    }
    fetchCategory();
  }, []);
  return (
    <div className="flex flex-col space-y-20 h-screen">
      <h1 className="inline-block text-color-base-content text-9xl mx-auto border-b-neutral border-b-[12px] max-w-fit">
        Memory, it is!
      </h1>
      <div className="flex justify-center">
        <form>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">
              Emoji Category
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <>
                {gameCategories.map((category, index) => {
                  <li key={index} value={category.slug}>
                    <a>{category.slug}</a>
                  </li>;
                })}
              </>
            </ul>
          </div>
          {/* {gameCategories.map((category, index) => (
                <option key={index} value={category.slug}>
                  {category.slug}
                </option>
              ))} */}
          <div>
            <p className="text-3xl">Difficulty Level</p>
            <select className="">
              {/* {difficulty.map((level, index) => (
                <option key={index} value={level.name}>
                  {level.name}
                </option>
              ))} */}
            </select>
          </div>
        </form>
        <button
          onClick={onStartClick}
          className="btn btn-primary text-7xl border border-dashed border-hot-pink p-3 rounded-2xl cursor-pointer w-50"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default GameSettings;

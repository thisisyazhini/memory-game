import { fetchEmojiCategories } from '../utils/service';
import { useEffect, useState } from 'react';
import { difficultyLevels } from '../utils/constants';
import { DifficultyLevels } from '@/models/difficulty-levels';
import { Categories } from '@/models/categories';

interface gameProps {
  onStartClick(): void;
  onDifficultySet(difficultyLevel: DifficultyLevels): void;
  onEmojiCategorySet(category: Categories): void;
}

const GameSettings: React.FC<gameProps> = ({
  onDifficultySet,
  onEmojiCategorySet,
  onStartClick,
}) => {
  const [gameCategories, setGameCategories] = useState<Categories[]>([]);

  useEffect(() => {
    async function fetchCategory() {
      const categories = await fetchEmojiCategories();
      categories.map(
        (category) =>
          (category.categoryName = category.slug.split('-').join(' '))
      );
      setGameCategories(categories);
    }
    fetchCategory();
  }, []);

  const setDifficulty = (difficultyLevel: DifficultyLevels) => {
    document.activeElement?.blur();
    onDifficultySet(difficultyLevel);
  };
  const setEmojiCategory = (category: Categories) => {
    document.activeElement?.blur();
    onEmojiCategorySet(category);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-20 h-screen">
      <h1 className="inline-block text-color-base-content text-6xl md:text-7xl lg:text-9xl mx-auto border-b-neutral border-b-[12px] max-w-fit">
        Memory, it is!
      </h1>

      <form className="flex flex-col">
        <div className="flex items-center justify-center gap-10 md:gap-20 lg:gap-40">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-md md:btn-lg lg:btn-xl btn-dash btn-info rounded-full m-1"
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
                    <button
                      type="button"
                      className="capitalize"
                      onClick={() => setEmojiCategory(category)}
                    >
                      {category.categoryName}
                    </button>
                  </li>
                ))}
              </>
            </ul>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-md md:btn-lg lg:btn-xl btn-dash btn-info rounded-full m-1"
            >
              Difficulty Level
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {difficultyLevels.map((level, index) => (
                <li key={index} value={level.name}>
                  <button type="button" onClick={() => setDifficulty(level)}>
                    {level.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={onStartClick}
          className="btn btn-success btn-dash btn-md md:btn-lg lg:btn-xl mt-10 rounded-full min-w-[100px]"
        >
          START
        </button>
      </form>
    </div>
  );
};

export default GameSettings;

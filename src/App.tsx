import { useEffect, useState } from 'react';
import MemoryCard from './components/MemoryCard';
import { fetchAndRandomizeEmoji } from './utils/helper';
import { EmojiData } from './models/emoji-data';
import { Emoji } from './models/emoji';
import Footer from './components/Footer';
import Header from './components/Header';
import { Confetti } from './components/Confetti';
import GameStats from './components/GameStats';
import AssistiveTechInfo from './components/AssistiveTechInfo';
import ErrorNotification from './components/ErrorNotification';
import GameSettings from './components/GameSettings';
import { defaultGameSettings } from './utils/constants';
import { DifficultyLevels, GameSetting } from './models/difficulty-levels';
import { Categories } from './models/categories';

function App() {
  const [gameSettings, setGameSettings] =
    useState<GameSetting>(defaultGameSettings);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState<EmojiData[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Emoji[]>([]);
  const [matchedCharacters, setMatchedCharacters] = useState<Emoji[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [showStats, setshowStats] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (
      selectedCharacters.length === 2 &&
      selectedCharacters[0].unicodeCharacter ===
        selectedCharacters[1].unicodeCharacter
    ) {
      setMatchedCharacters([...matchedCharacters, ...selectedCharacters]);
    }
  }, [selectedCharacters]);

  useEffect(() => {
    if (emojiData.length && matchedCharacters.length === emojiData.length) {
      setIsGameOver(true);
      setshowStats(true);
    }
  }, [matchedCharacters]);

  const startGame = async () => {
    try {
      const emoji = await fetchAndRandomizeEmoji(
        gameSettings.category,
        gameSettings.difficultyLevel.value
      );
      setEmojiData(emoji);
      setIsGameOn(true);
    } catch (e) {
      setIsError(true);
      console.error(e);
    }
  };

  const resetError = () => {
    setIsError(!isError);
  };

  const cardClicked = (selectedEmoji: Emoji) => {
    if (selectedCharacters.length < 2) {
      // add the entry if there are less than 2 cards selected
      setSelectedCharacters((prevSelectedCharacters) => [
        ...prevSelectedCharacters,
        selectedEmoji,
      ]);
    } else if (selectedCharacters.length === 2) {
      // discard if there are no matches
      setSelectedCharacters([selectedEmoji]);
    }
  };

  const resetGame = async () => {
    setIsGameOver(false);
    setSelectedCharacters([]);
    setMatchedCharacters([]);
    const emoji = await fetchAndRandomizeEmoji();
    setEmojiData(emoji);
  };

  const onElapsedTime = (timer: number) => {
    setGameTime(timer);
  };

  const onClose = () => {
    setshowStats(false);
  };

  const setGameLevelSetting = (difficultyLevel: DifficultyLevels) => {
    setGameSettings({ category: gameSettings.category, difficultyLevel });
  };

  const setGameCategorySetting = (category: Categories) => {
    setGameSettings({
      category: category.slug,
      difficultyLevel: gameSettings.difficultyLevel,
    });
  };

  return (
    <>
      <main className="min-h-screen flex flex-col bg-color-base-100 text-color-base-content font-display relative">
        {!isGameOn && !isError && (
          <GameSettings
            onStartClick={startGame}
            onDifficultySet={setGameLevelSetting}
            onEmojiCategorySet={setGameCategorySetting}
          />
        )}
        {isGameOn && (
          <>
            <Header
              isGameOn={isGameOn}
              isGameOver={isGameOver}
              onResetGame={resetGame}
              onElapsedTime={onElapsedTime}
            ></Header>
            <MemoryCard
              onCardClick={cardClicked}
              emojiData={emojiData}
              selectedCharacters={selectedCharacters}
              matchedCharacters={matchedCharacters}
            />
            <Footer></Footer>
          </>
        )}
        {isGameOn && !isGameOver && (
          <>
            <AssistiveTechInfo
              emojisData={emojiData}
              matchedCards={matchedCharacters}
            ></AssistiveTechInfo>
          </>
        )}
        {isGameOver && (
          <>
            <div className="z-2000">
              <Confetti></Confetti>
            </div>
            <GameStats
              isOpen={showStats}
              gameTime={gameTime}
              onResetGame={resetGame}
              onClose={onClose}
            ></GameStats>
          </>
        )}
        {isError && <ErrorNotification onRetry={resetError} />}
      </main>
    </>
  );
}

export default App;

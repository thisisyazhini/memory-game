import { useEffect, useState } from 'react';
import Start from './components/Start';
import MemoryCard from './components/MemoryCard';
import { fetchAndRandomizeEmoji } from './utils/helper';
import { EmojiData } from './models/emoji-data';
import { Emoji } from './models/emoji';
import Footer from './components/Footer';
import Header from './components/Header';
import { Confetti } from './components/Confetti';
import GameStats from './components/GameStats';

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState<EmojiData[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Emoji[]>([]);
  const [matchedCharacters, setMatchedCharacters] = useState<Emoji[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [showStats, setshowStats] = useState(false);

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
      const emoji = await fetchAndRandomizeEmoji();
      setEmojiData(emoji);
      setIsGameOn(true);
    } catch (e) {
      console.error(e);
    }
  };

  const cardClicked = (selectedEmoji: Emoji) => {
    const isCardAlreadyPresent = selectedCharacters.find(
      (entry) => entry.index === selectedEmoji.index
    );
    if (!isCardAlreadyPresent && selectedCharacters.length < 2) {
      // add the entry if its not already present and if there are less than 2 cards selected
      setSelectedCharacters((prevSelectedCharacters) => [
        ...prevSelectedCharacters,
        selectedEmoji,
      ]);
    } else if (!isCardAlreadyPresent && selectedCharacters.length === 2) {
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

  return (
    <>
      <main className="min-h-screen flex flex-col bg-zinc-100 text-black font-display relative">
        {!isGameOn && <Start onStartClick={startGame} />}
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
      </main>
    </>
  );
}

export default App;

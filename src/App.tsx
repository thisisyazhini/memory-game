import { useEffect, useState } from 'react';
import Start from './components/Start';
import MemoryCard from './components/MemoryCard';
import { fetchAndRandomizeEmoji } from './utils/helper';
import { EmojiData } from './models/emoji-data';
import { Emoji } from './models/emoji';
import { useReward } from 'react-rewards';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState<EmojiData[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Emoji[]>([]);
  const [matchedCharacters, setMatchedCharacters] = useState<Emoji[]>([]);
  const { reward: balloonsReward } = useReward('balloonsReward', 'balloons', {
    lifetime: 600,
    startVelocity: 20,
    elementCount: 100,
    spread: 360,
    colors: [
      '#ABD3DB',
      '#C2E6DF',
      '#D1EBD8',
      '#E5F5DC',
      '#FFFFE1',
      '#A9B5D9',
      '#F2A477',
      '#F29472',
      '#F2C4C4',
      '#F2F2F2',
    ],
  });

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
      balloonsReward();
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
    console.log(selectedCharacters);
  };

  const resetGame = async () => {
    setSelectedCharacters([]);
    setMatchedCharacters([]);
    const emoji = await fetchAndRandomizeEmoji();
    setEmojiData(emoji);
  };

  return (
    <>
      <main className="min-h-screen flex flex-col bg-zinc-100 text-black font-display relative">
        {!isGameOn && <Start onStartClick={startGame} />}
        <Header onResetGame={resetGame}></Header>
        {isGameOn && (
          <MemoryCard
            onCardClick={cardClicked}
            emojiData={emojiData}
            selectedCharacters={selectedCharacters}
            matchedCharacters={matchedCharacters}
          />
        )}
        <span id="balloonsReward" className="absolute bottom-0 left-[50%]" />
        <Footer></Footer>
      </main>
    </>
  );
}

export default App;

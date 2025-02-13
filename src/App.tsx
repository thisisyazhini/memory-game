import { useState } from 'react';
import Start from './components/Start';
import MemoryCard from './components/MemoryCard';
import { emojiAPIBaseURL, shuffleArray } from './utils/constants';
import { Emoji } from './models/emoji';

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState<Emoji[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<
    { unicodeCharacter: string; index: number }[]
  >([]);

  const startGame = async () => {
    try {
      const response = await fetch(`${emojiAPIBaseURL}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Could not fetch data from API');
      }
      const data = await response.json();
      const emojis = randomizeCharacters(shuffleArray(data).slice(0, 5));
      setEmojiData(emojis);
      setIsGameOn(true);
    } catch (e) {
      console.error(e);
    }
  };

  const randomizeCharacters = (characters: Emoji[]) => {
    const duplicateCharacters: Emoji[] = [];
    characters.map((char) => {
      duplicateCharacters.push(char, char);
    });
    return shuffleArray(duplicateCharacters);
  };

  const cardClicked = (unicodeCharacter: string, index: number) => {
    const selected = { unicodeCharacter, index };
    setSelectedCharacters([...selectedCharacters, selected]);
    console.log(selectedCharacters);
  };
  return (
    <>
      <main className="min-h-screen bg-zinc-100 text-black font-display">
        {!isGameOn && <Start onStartClick={startGame} />}
        {isGameOn && (
          <MemoryCard onCardClick={cardClicked} emojiData={emojiData} />
        )}
      </main>
    </>
  );
}

export default App;

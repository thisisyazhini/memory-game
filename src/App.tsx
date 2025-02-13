import { useEffect, useState } from 'react';
import Start from './components/Start';
import MemoryCard from './components/MemoryCard';
import { emojiAPIBaseURL, shuffleArray } from './utils/constants';
import { EmojiData } from './models/emoji-data';
import { Emoji } from './models/emoji';

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [emojiData, setEmojiData] = useState<EmojiData[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Emoji[]>([]);
  const [matchedCharacters, setMatchedCharacters] = useState<Emoji[]>([]);

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
    }
  }, [matchedCharacters]);

  const startGame = async (e) => {
    e.preventDefault();
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

  const randomizeCharacters = (characters: EmojiData[]) => {
    const duplicateCharacters: EmojiData[] = [];
    characters.map((char) => {
      duplicateCharacters.push(char, char);
    });
    return shuffleArray(duplicateCharacters);
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

  return (
    <>
      <main className="min-h-screen bg-zinc-100 text-black font-display">
        {!isGameOn && <Start onStartClick={startGame} />}
        {isGameOn && (
          <MemoryCard
            onCardClick={cardClicked}
            emojiData={emojiData}
            selectedCharacters={selectedCharacters}
            matchedCharacters={matchedCharacters}
          />
        )}
      </main>
    </>
  );
}

export default App;

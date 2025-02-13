import { useState } from 'react';
import Start from './components/Start';
import MemoryCard from './components/MemoryCard';
import { emojiAPIBaseURL } from './utils/constants';
import { Emoji } from './models/emoji';

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState<Emoji[]>([]);
  const startGame = async () => {
    try {
      const response = await fetch(`${emojiAPIBaseURL}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Could not fetch data from API');
      }
      const data = await response.json();
      setEmojiData(data);
      setIsGameOn(true);
    } catch (e) {
      console.error(e);
    }
  };
  const cardClicked = (index: number) => {
    console.log(`${index} is clicked`);
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

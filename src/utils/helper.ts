import { EmojiData } from '@/models/emoji-data';
import { emojiAPIBaseURL } from './constants';

export function shuffleArray(array: EmojiData[]) {
  // shuffle the array using Fisher Yates algorithm
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function fetchEmojiData(): Promise<EmojiData[]> {
  const response = await fetch(`${emojiAPIBaseURL}`);
  console.log(response);
  if (!response.ok) {
    throw new Error('Could not fetch data from API');
  }
  return await response.json();
}

const doubleCharacters = (characters: EmojiData[]) => {
  const duplicateCharacters: EmojiData[] = [];
  characters.map((char) => {
    duplicateCharacters.push(char, char);
  });
  return shuffleArray(duplicateCharacters);
};

export function pickAndShuffleRandomCharacters(data: EmojiData[]) {
  const pickedCharacters = shuffleArray(data).slice(0, 1);
  return doubleCharacters(pickedCharacters);
}

export async function fetchAndRandomizeEmoji() {
  const emojiData = await fetchEmojiData();
  return pickAndShuffleRandomCharacters(emojiData);
}

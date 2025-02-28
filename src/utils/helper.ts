import { EmojiData } from '@/models/emoji-data';
import { fetchEmojiData } from './service';

export function shuffleArray(array: EmojiData[]) {
  // shuffle the array using Fisher Yates algorithm
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const doubleCharacters = (characters: EmojiData[]) => {
  const duplicateCharacters: EmojiData[] = [];
  characters.map((char) => {
    duplicateCharacters.push(char, char);
  });
  return shuffleArray(duplicateCharacters);
};

export function pickAndShuffleRandomCharacters(
  data: EmojiData[],
  noOfCards: number
) {
  const pickedCharacters = shuffleArray(data).slice(0, noOfCards / 2);
  return doubleCharacters(pickedCharacters);
}

export async function fetchAndRandomizeEmoji(
  categoryName: string,
  noOfCards: number
) {
  const emojiData = await fetchEmojiData(categoryName);
  return pickAndShuffleRandomCharacters(emojiData, noOfCards);
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

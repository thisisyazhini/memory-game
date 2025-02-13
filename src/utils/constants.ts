import { Emoji } from '@/models/emoji';

export const emojiAPIBaseURL =
  'https://emoji-api.com/categories/animals-nature?access_key=45c5c74efa900124aaec1da2064ca304cf13dc03';

export function shuffleArray(array: Emoji[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

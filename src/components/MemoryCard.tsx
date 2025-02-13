import { EmojiData } from '@/models/emoji-data';
import React from 'react';
import EmojiButton from './EmojiButton';
import { Emoji } from '@/models/emoji';

interface props {
  emojiData: EmojiData[];
  matchedCharacters: Emoji[];
  selectedCharacters: Emoji[];
  onCardClick(emoji: Emoji): void;
}
const MemoryCard: React.FC<props> = ({
  onCardClick,
  emojiData,
  selectedCharacters,
  matchedCharacters,
}) => {
  const emojiCards = emojiData.map((emoji, index) => {
    const selectedCharacterEntry = selectedCharacters.find(
      (entry) => entry.index === index
    );
    const matchedCharacterEntry = matchedCharacters.find(
      (entry) => entry.index === index
    );
    return (
      <li
        className="grid bg-teal-400 place-items-center inset-shadow-2xs ring-4 rounded-2xl ring-teal-500"
        key={index}
      >
        <EmojiButton
          emoji={emoji}
          selectedCharacterEntry={selectedCharacterEntry}
          matchedCharacterEntry={matchedCharacterEntry}
          onCardClick={() =>
            onCardClick({ unicodeCharacter: emoji.unicodeName, index })
          }
        ></EmojiButton>
      </li>
    );
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <ul className="grid grid-cols-5 gap-12">{emojiCards}</ul>
    </div>
  );
};

export default MemoryCard;

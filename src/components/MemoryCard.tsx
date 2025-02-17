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
      <li className={`grid w-42 h-42 group [perspective:1000px]`} key={index}>
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
    <div className="flex flex-1 items-center justify-center">
      <ul className="grid grid-cols-5 gap-12">{emojiCards}</ul>
    </div>
  );
};

export default MemoryCard;

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
        className={`grid w-20 h-20 sm:w-30 sm:h-30 lg:w-40 lg:h-40 group [perspective:1000px]`}
        key={index}
      >
        <EmojiButton
          index={index + 1}
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
      <ul className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 grid-flow-row-dense gap-4">
        {emojiCards}
      </ul>
    </div>
  );
};

export default MemoryCard;

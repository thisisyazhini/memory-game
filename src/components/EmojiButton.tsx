import { Emoji } from '@/models/emoji';
import { EmojiData } from '@/models/emoji-data';
import React from 'react';
interface props {
  emoji: EmojiData;
  selectedCharacterEntry: Emoji | undefined;
  matchedCharacterEntry: Emoji | undefined;
  onCardClick(): void;
}
const EmojiButton: React.FC<props> = ({
  emoji,
  selectedCharacterEntry,
  matchedCharacterEntry,
  onCardClick,
}) => {
  const showEmoji = selectedCharacterEntry || matchedCharacterEntry;
  return (
    <button
      className={`text-8xl relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
        !showEmoji ? '' : '[transform:rotateY(180deg)]'
      }`}
      onClick={onCardClick}
    >
      <div className="flex items-center justify-center absolute inset-0 h-full w-full rounded-xl bg-rose-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        {emoji.character}
      </div>
      <div className="flex items-center justify-center absolute inset-0 h-full w-full rounded-xl bg-white [backface-visibility:hidden] cursor-pointer">
        ?
      </div>
    </button>
  );
};

export default EmojiButton;

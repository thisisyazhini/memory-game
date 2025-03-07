import { Emoji } from '@/models/emoji';
import { EmojiData } from '@/models/emoji-data';
import React from 'react';
interface props {
  index: number;
  emoji: EmojiData;
  selectedCharacterEntry: Emoji | undefined;
  matchedCharacterEntry: Emoji | undefined;
  onCardClick(): void;
}
const EmojiButton: React.FC<props> = ({
  index,
  emoji,
  selectedCharacterEntry,
  matchedCharacterEntry,
  onCardClick,
}) => {
  const showEmoji = selectedCharacterEntry || matchedCharacterEntry;
  const btnAria = matchedCharacterEntry
    ? `${emoji.character}. Matched.`
    : selectedCharacterEntry
    ? `${emoji.character}. Not matched yet.`
    : `'Card is face down'.`;
  return (
    <button
      disabled={matchedCharacterEntry?.unicodeCharacter === emoji.unicodeName}
      className={`btn btn-neutral text-6xl md:text-7xl lg:text-8xl relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
        !showEmoji ? '' : '[transform:rotateY(180deg)]'
      }`}
      // to disallow the same card from being selected twice
      onClick={
        selectedCharacterEntry?.unicodeCharacter === emoji.unicodeName
          ? undefined
          : onCardClick
      }
      aria-live="polite"
      aria-label={`Position ${index}: ${btnAria}`}
    >
      <div className="bg-accent flex items-center justify-center absolute inset-0 h-full w-full rounded-xl  [transform:rotateY(180deg)] [backface-visibility:hidden]">
        {emoji.character}
      </div>
      <div className="bg-secondary flex items-center justify-center absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] cursor-pointer">
        ?
      </div>
    </button>
  );
};

export default EmojiButton;

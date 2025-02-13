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
    <button className="text-8xl p-8" onClick={onCardClick}>
      {showEmoji ? emoji.character : '?'}
    </button>
  );
};

export default EmojiButton;

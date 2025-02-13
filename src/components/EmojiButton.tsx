import { Emoji } from '@/models/emoji';
import { EmojiData } from '@/models/emoji-data';
import React from 'react';
interface props {
  emoji: EmojiData;
  selectedCharacterEntry: Emoji;
  matchedCharacterEntry: Emoji;
  onCardClick(): void;
}
const EmojiButton: React.FC<props> = ({
  emoji,
  selectedCharacterEntry,
  matchedCharacterEntry,
  onCardClick,
}) => {
  return (
    <button className="text-8xl p-8" onClick={onCardClick}>
      {emoji.character}
    </button>
  );
};

export default EmojiButton;

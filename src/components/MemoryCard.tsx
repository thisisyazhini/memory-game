import { Emoji } from '@/models/emoji';
import React from 'react';

interface props {
  emojiData: Emoji[];
  onCardClick(index: number): void;
}
const MemoryCard: React.FC<props> = ({ onCardClick, emojiData }) => {
  function renderEmojis() {
    const emojiElement = [];
    if (emojiData) {
      emojiData.map((val, index) => {
        emojiElement.push(
          <li
            className="grid bg-teal-400 w-40 h-40 place-items-center inset-shadow-2xs ring-4 rounded-2xl ring-teal-500"
            key={index}
          >
            <button className="text-8xl" onClick={() => onCardClick(index)}>
              {val.character}
            </button>
          </li>
        );
      });
    }
    return emojiElement;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <ul className="grid grid-cols-5 gap-12">{renderEmojis()}</ul>
    </div>
  );
};

export default MemoryCard;

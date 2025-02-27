import { Emoji } from '@/models/emoji';
import { EmojiData } from '@/models/emoji-data';

interface props {
  emojisData: EmojiData[];
  matchedCards: Emoji[] | undefined;
}
const AssistiveTechInfo: React.FC<props> = ({ emojisData, matchedCards }) => {
  return (
    <div className="sr-only" aria-atomic="true" aria-live="polite">
      <h2>Game Status</h2>
      <p>
        Number of matched pairs :{' '}
        {(matchedCards && matchedCards.length / 2) || 0}
      </p>
      <p>
        Number of cards left to match:{' '}
        {emojisData.length - ((matchedCards && matchedCards.length) || 0)}
      </p>
    </div>
  );
};

export default AssistiveTechInfo;

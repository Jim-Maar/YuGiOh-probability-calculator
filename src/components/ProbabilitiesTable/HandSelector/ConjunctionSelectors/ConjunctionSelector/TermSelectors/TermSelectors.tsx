import { Card } from 'types/card';
import { Conjunction } from 'types/dnf';
import { TermSelector } from './TermSelector/TermSelector';

type TermSelectorsProps = {
  conjunction: Conjunction,
  cards: Card[],
  handIndex: number,
  conjunctionIndex: number
}

/**
 * Term Selectors Component - A list of Terms connected with AND, in other words a conjunction e.g. (Card A AND NOT Card B).
 * 
 * This component is part of the Conjunction Selector component, which also includes interactivity (adding and removing cards)).
 * 
 * @param {Conjunction} conjunction - The conjunction of terms (cards) to be displayed.
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {number} handIndex - Index of the hand in the overall hands array.
 * @param {number} conjunctionIndex - Index of the conjunction within the hand.
 */
export const TermSelectors: React.FC<TermSelectorsProps> = ({ conjunction, cards, handIndex, conjunctionIndex }) => {
  return <div>
    {'('}{conjunction.map((term, index) => (
      <span key={index}>
        {index > 0 && <span style={{margin: '0 4px'}}>AND</span>}
        <TermSelector term={term} cards={cards} handIndex={handIndex} conjunctionIndex={conjunctionIndex} termIndex={index}></TermSelector>
      </span>
    ))}
    {')'}
  </div>
}
import React from 'react'
import Popup from 'reactjs-popup'
import { Term } from 'types/dnf.ts'
import { Card } from 'types/card.ts'
import { useHandContext } from "context/HandContext";

type TermSelectorProbs = {
  term: Term,
  cards: Card[],
  handIndex: number,
  conjunctionIndex: number,
  termIndex: number,
}

/**
 * Term Selector Component - A term (e.g. Card A, Not Card A), a single card that the user wants or doesn't want to draw in a combination of other cards.
 * 
 * Together, single Terms form a Conjunction (e.g. (Card A AND Card B)) and those together form a DNF (e.g. (Card A AND Card B) OR (NOT Card C)).
 * Negation is a boolean which indicates whether the user wants to draw this card or not (e.g. Card A / NOT Card A).
 * Clicking on a Term opens a Popup menu, in which the user can either negate the card or delete it.
 * 
 * @param {Term} term - The term representing a card and its negation status.
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {number} handIndex - Index of the hand in the overall hands array.
 * @param {number} conjunctionIndex - Index of the conjunction within the hand.
 * @param {number} termIndex - Index of the term within the conjunction.
 */
export const TermSelector : React.FC<TermSelectorProbs> = ( {term, cards, handIndex, conjunctionIndex, termIndex} : TermSelectorProbs) => {
  const { onDeleteTerm, onNegateTerm } = useHandContext();
  const [negation, cardIndex] = term;
  return <Popup
    trigger={
      <button className="button">
        {negation && 'NOT '}
        {cards[cardIndex].name}
      </button>
      }
    position={
      'right center'
    }
    >
      <div style={{display:'flex', flexDirection:'column'}}>
        <button className='highlighted-button' onClick={() => onDeleteTerm(handIndex, conjunctionIndex, termIndex)}>Remove Card</button>
        <button className='highlighted-button' onClick={() => onNegateTerm(handIndex, conjunctionIndex, termIndex)}>Negate Card</button>
      </div>
  </Popup>
}
import React, { useState } from 'react';
import { Card } from 'types/card';
import { Conjunction } from 'types/dnf';
import { useHandContext } from "context/HandContext";
import { TermSelectors } from './TermSelectors/TermSelectors';
import { AddCardButton } from './AddCardButton/AddCardButton';
import Popup from 'reactjs-popup';

type ConjunctionSelectorProps = {
  conjunction: Conjunction,
  cards: Card[],
  handIndex: number,
  conjunctionIndex: number
}

/**
 * Conjunction Selector Component - A conjunction e.g (Card A AND Card B) of cards the user wants to draw.
 * 
 * Hovering over it shows an Add Card button.
 * Clicking on it let's you delete the conjunction.
 * 
 * @param {Conjunction} conjunction - The conjunction of terms (cards) to be displayed.
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {number} handIndex - Index of the hand in the overall hands array.
 * @param {number} conjunctionIndex - Index of the conjunction within the hand.
 */
export const ConjunctionSelector: React.FC<ConjunctionSelectorProps> = ({ conjunction, cards, handIndex, conjunctionIndex }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { onAddTerm, onDeleteConjunction } = useHandContext();
  return <Popup
    trigger= {
      <div
      className="button"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{display: 'flex'}}
    >
      <TermSelectors
        conjunction={conjunction}
        cards={cards}
        handIndex={handIndex}
        conjunctionIndex={conjunctionIndex}>
      </TermSelectors>
      {isHovering && 
        <AddCardButton
          cards={cards}
          handIndex={handIndex}
          conjunctionIndex={conjunctionIndex}
          onAddTerm={onAddTerm}
        />
      }
    </div>}
    position = "center center"
    >
      <button className='highlighted-button' onClick={() => onDeleteConjunction(handIndex, conjunctionIndex)} >Remove Conjunction</button>
    </Popup>
}
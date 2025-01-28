import React from 'react';
import { Card } from 'types/card';
import Popup from 'reactjs-popup';

type AddCardButtonProps = {
  cards: Card[];
  handIndex: number;
  conjunctionIndex: number;
  onAddTerm: (handIndex: number, conjunctionIndex: number, cardIndex: number) => void;
}

/**
 * Add Card Button Component - Button to add a card to a conjunction (e.g (Card A AND Card B) <Add Card>).
 * 
 * Clicking on it shows a popup menu in which the user can select any of the cards that were put into the DeckTable.
 * 
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {number} handIndex - Index of the hand in the overall hands array.
 * @param {number} conjunctionIndex - Index of the conjunction within the hand.
 * @param {function} onAddTerm - Callback function to add a term to the conjunction.
 */
export const AddCardButton: React.FC<AddCardButtonProps> = ({ cards, handIndex, conjunctionIndex, onAddTerm }) => {
  return (
    <Popup
      trigger={<button className="add-card-button highlighted-button">Add Card</button>}
      position='right center'
    >
      <div style={{display:'flex', flexDirection:'column'}}>
        {cards.map((card, index) => (
          <button
            className='highlighted-button'
            key={index} 
            onClick={() => onAddTerm(handIndex, conjunctionIndex, index)}
          >
            {card.name}
          </button>
        ))}
      </div>
    </Popup>
  );
} 
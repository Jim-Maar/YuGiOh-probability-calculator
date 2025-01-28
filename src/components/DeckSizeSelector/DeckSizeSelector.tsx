import React from 'react';

type DeckSizeSelectorProps = {
  deckSize: number;
  onDeckSizeChange: (size: number) => void;
}

/**
 * Deck Size Selector Component - Allows the user to input the Decksize (number of cards in the deck).
 * 
 * @param {number} deckSize - The current size of the deck.
 * @param {function} onHandSizeChange - Callback function to update the deck size.
 */
export const DeckSizeSelector: React.FC<DeckSizeSelectorProps> = ({ deckSize, onDeckSizeChange }) => {
  return (
    <div className='deck-size-selector'>
      <p>Decksize: </p>
      <input 
        type="number" 
        value={deckSize} 
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            onDeckSizeChange(value);
          }
        }}
      />
    </div>
  );
};
  
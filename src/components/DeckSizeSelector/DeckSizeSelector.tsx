import React, { useState, useEffect } from 'react';

type DeckSizeSelectorProps = {
  deckSize: number;
  onDeckSizeChange: (size: number) => boolean;
}

/**
 * Deck Size Selector Component - Allows the user to input the Decksize (number of cards in the deck).
 *
 * @param {number} deckSize - The current size of the deck.
 * @param {function} onHandSizeChange - Callback function to update the deck size.
 */
export const DeckSizeSelector: React.FC<DeckSizeSelectorProps> = ({ deckSize, onDeckSizeChange }) => {
  const [localValue, setLocalValue] = useState(deckSize.toString());

  // Sync local value when prop changes from outside
  useEffect(() => {
    setLocalValue(deckSize.toString());
  }, [deckSize]);

  const commitValue = () => {
    const value = parseInt(localValue);
    if (!isNaN(value) && value > 0) {
      const success = onDeckSizeChange(value);
      if (!success) {
        // Validation failed, revert to current valid value
        setLocalValue(deckSize.toString());
      }
    } else {
      // Revert to current valid value if input is invalid
      setLocalValue(deckSize.toString());
    }
  };

  return (
    <div className='deck-size-selector'>
      <p>Decksize: </p>
      <input
        type="number"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commitValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
    </div>
  );
};
  
import React, { useState, useEffect } from 'react';

type HandSizeSelectorProps = {
  handSize: number;
  onHandSizeChange: (size: number) => void;
}

/**
 * Hand Size Selector Component - Allows the user to input the Handsize (number of cards drawn).
 *
 * @param {number} handSize - The current size of the hand.
 * @param {function} onHandSizeChange - Callback function to update the hand size.
 */
export const HandSizeSelector: React.FC<HandSizeSelectorProps> = ({ handSize, onHandSizeChange }) => {
  const [localValue, setLocalValue] = useState(handSize.toString());

  // Sync local value when prop changes from outside
  useEffect(() => {
    setLocalValue(handSize.toString());
  }, [handSize]);

  const commitValue = () => {
    const value = parseInt(localValue);
    if (!isNaN(value) && value > 0) {
      onHandSizeChange(value);
    } else {
      // Revert to current valid value if input is invalid
      setLocalValue(handSize.toString());
    }
  };

  return (
    <div className='hand-size-selector'>
      <p>Handsize: </p>
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
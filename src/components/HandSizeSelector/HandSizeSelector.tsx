import React from 'react';

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
  return (
    <div className='hand-size-selector'>
      <p>Handsize: </p>
      <input 
        type="number" 
        value={handSize} 
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            onHandSizeChange(value);
          }
        }}
      />
    </div>
  );
};
import React from 'react';
import { DNF } from 'types/dnf';
import { Card } from 'types/card';
import { HandContextProvider } from 'context/HandContext.tsx';
import { HandSelector } from './HandSelector/HandSelector';
import { Probability } from './Probability/Probability';

type ProbabilitiesTableProps = {
  hands: DNF[];
  cards: Card[];
  deckSize: number,
  handSize: number,
  onChangeHands: (hands: DNF[]) => void;
}

/**
 * Probabilities Table Component - Table in which the user can input the combination of cards they want to draw.
 * 
 * The probabilities are automatically calculated.
 * 
 * @param {DNF[]} hands - The hand (combination of cards the user wants to draw)in Disjunctive Normal Form.
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {function} onChangeHands - Callback function to update the hands array.
 */
export const ProbabilitiesTable: React.FC<ProbabilitiesTableProps> = ({ hands, cards, deckSize, handSize, onChangeHands }) => {
  const handleAddHand = () => {
    const newHand: DNF = [[]];
    onChangeHands([...hands, newHand]);
  };

  return <div className='table-section probabilities-table'>
    <h2>Probabilities</h2>
    <table style={{width: '100%'}}>
      <thead>
        <tr className="table-row">
          <th className='first-column'>Hand</th>
          <th className='regular-column'>Probability</th>
        </tr>
      </thead>
      <tbody>
        {hands.map((hand, index) => (
          <tr className="table-row" key={index}>
            <td className='first-column'>
              <HandContextProvider hands={hands} onChangeHands={onChangeHands}>
                <HandSelector hand={hand} cards={cards} handIndex={index} ></HandSelector>
              </HandContextProvider>
            </td>
            <td className='regular-column'>
              <Probability cards={cards} hand={hand} deckSize={deckSize} handSize={handSize}></Probability>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>
            <button 
              className="add-hand-button"
              onClick={handleAddHand}
            >
              Add Hand
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
};
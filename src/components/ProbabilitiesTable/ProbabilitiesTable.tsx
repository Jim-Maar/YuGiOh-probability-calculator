import React from 'react';
import { DNF } from 'types/dnf';
import { Card } from 'types/card';
import { HandContextProvider } from 'context/HandContext.tsx';
import { HandSelector } from './HandSelector/HandSelector';
import { getProbability } from 'utils/probability';

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

  return <div>
    <h2>Probabilities</h2>
    <table style={{width: '800px', borderCollapse: 'collapse'}}>
      <thead>
        <tr>
          <th style={{ width: '80%' }}>Hand</th>
          <th style={{ width: '20%' }}>Probability</th>
        </tr>
      </thead>
      <tbody>
        {hands.map((hand, index) => (
          <tr key={index}>
            <td style={{ width: '80%' , padding: 0}}>
              <HandContextProvider hands={hands} onChangeHands={onChangeHands}>
                <div style={{ width: '100%'}}>
                  <HandSelector hand={hand} cards={cards} handIndex={index} ></HandSelector>
                </div>
              </HandContextProvider>
            </td>
            <td style={{ width: '20%'}}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {getProbability(cards, hand, deckSize, handSize)}%
              </div>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>
            <button 
              className="addHandButton"
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
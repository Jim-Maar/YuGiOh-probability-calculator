import React from 'react';
import { Card } from 'types/card';
import { DNF } from 'types/dnf';
import { ConjunctionSelector } from './ConjunctionSelector/ConjunctionSelector';

/** 
 * ConjunctionSelectors Component - A list of conjunctions (connected with OR (e.g. (Card A AND Card B) OR (Card C))).
 * 
 * Displayed inside a Handselector.
 * 
 * @param {DNF} hand - The hand (combination of cards the user wants to draw) in Disjunctive Normal Form.
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {number} handIndex - Index of the hand in the overall hands array.
 */
type ConjunctionSelectorsProps = {
  hand: DNF;
  cards: Card[];
  handIndex: number;
};

export const ConjunctionSelectors: React.FC<ConjunctionSelectorsProps> = ({ hand, cards, handIndex }) => {
  return (
    <div>
      {hand.map((conjunction, index) => (
        <div className='conjunction-selectors' key={index}>
          <div>{index > 0 && <span style={{ margin: '0 4px' }}>OR</span>}</div>
          <div>
            <ConjunctionSelector
              conjunction={conjunction}
              cards={cards}
              handIndex={handIndex}
              conjunctionIndex={index}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
import { useState} from "react";
import { Card } from "types/card";
import { DNF } from "types/dnf";
import { ConjunctionSelectors } from "./ConjunctionSelectors/ConjunctionSelectors.tsx";
import { useHandContext } from "context/HandContext";
import Popup from 'reactjs-popup';

/**
 * Props for the HandSelector component
 * @property {DNF} hand - The hand configuration in Disjunctive Normal Form
 * @property {Card[]} cards - Array of available cards to select from
 * @property {number} handIndex - Index of this hand in the overall hands array
 */
type HandSelectorProps = {
  hand: DNF,
  cards: Card[],
  handIndex: number,
}

/**
 * HandSelector Component - Area in which the user can add a combination of cards, for which they want to get the probability.
 * 
 * One hand is of type DNF (Disjunctive Normal Form), meaning that it consists of multiple Conjunctions of cards (e.g. Card A AND Card B) that you want to draw.
 * with the final probability being the probability of fulfilling any of the Conjunctions of cards (e.g. (Card A AND Card B) OR (Card C)).
 * Hovering over the Handselector, shows an Add Conjunction button.
 * Clicking on the Handselector opens up a popup menu, which allows you to delete it.
 * 
 * @param {DNF} hand - The hand (combination of cards the user wants to draw)in Disjunctive Normal Form.
 * @param {Card[]} cards - Array of available cards to select from.
 * @param {number} handIndex - Index of this hand in the overall hands array.
 */
export const HandSelector : React.FC<HandSelectorProps> = ( {hand, cards, handIndex} : HandSelectorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const { onAddConjunction, onDeleteHand } = useHandContext();

  return <Popup
    trigger = {
      <div 
        className="button handSelector"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ConjunctionSelectors hand={hand} cards={cards} handIndex={handIndex} />
        {isHovering && <button onClick={() => onAddConjunction(handIndex)}>Add Conjunction</button>}
      </div>
    }
    position='right center'
  >
    <button onClick={() => onDeleteHand(handIndex)}>Remove Hand</button>
  </Popup>
}
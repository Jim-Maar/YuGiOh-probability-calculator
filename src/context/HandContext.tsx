import React, { createContext, useContext } from 'react';
import { DNF, Term, Conjunction } from '../types/dnf';

type HandContextProviderProps = {
  children: React.ReactNode;
  hands: DNF[];
  onChangeHands: (hands: DNF[]) => void;
}

export type HandContextType = {
  hands: DNF[];
  setHands: (hands: DNF[]) => void;
  onDeleteHand: (handIndex: number) => void;
  onAddConjunction: (handIndex: number) => void;
  onDeleteConjunction: (handIndex: number, conjunctionIndex: number) => void;
  onAddTerm: (handIndex: number, conjunctionIndex: number, cardIndex: number) => void;
  onDeleteTerm: (handIndex: number, conjunctionIndex: number, termIndex: number) => void;
  onNegateTerm: (handIndex: number, conjunctionIndex: number, termIndex: number) => void;
};

export const HandContext = createContext<HandContextType | undefined>(undefined);

/**
 * useHandContext function - Provides various functions used by components in the handselector,
 * which are used to configure the DNF (Disjunctive Normal Form) of cards the user wants to draw (e.g. (Card A AND Card B) OR (Card C)).
 * 
 * Functions provided:
 * 
 * @param {DNF[]} hands - The current hands in DNF format.
 * @param {function} setHands - Function to update the hands.
 * @param {function} onDeleteHand - Function to delete a hand by its index.
 * @param {function} onAddConjunction - Function to add a conjunction to a hand by its index.
 * @param {function} onDeleteConjunction - Function to delete a conjunction from a hand by its index.
 * @param {function} onAddTerm - Function to add a term to a conjunction in a hand by their indices.
 * @param {function} onDeleteTerm - Function to delete a term from a conjunction in a hand by their indices.
 * @param {function} onNegateTerm - Function to negate a term in a conjunction in a hand by their indices.
 */
export const useHandContext = () => {
    const context = useContext(HandContext);
    if (context === undefined) {
        throw new Error('useHandContext must be used within a HandContext.Provider');
    }
    return context;
};

export const HandContextProvider: React.FC<HandContextProviderProps> = ({ children, hands, onChangeHands }) => {
  const handleAddConjunction = (handIndex: number): void => {
    const newHands = hands.map((hand, hIndex) => {
      if (hIndex !== handIndex) return hand;
      const newConjunction: Conjunction = [];
      return [...hand, newConjunction];
    });
    onChangeHands(newHands);
  };

  const handleAddTerm = (handIndex: number, conjunctionIndex: number, cardIndex: number): void => {
    const newHands = hands.map((hand, hIndex) => {
      if (hIndex !== handIndex) return hand;
      return hand.map((conjunction, cIndex) => {
        if (cIndex !== conjunctionIndex) return conjunction;
        const newTerm: Term = [false, cardIndex];
        return [...conjunction, newTerm];
      });
    });
    onChangeHands(newHands);
  };

  const handleDeleteHand = (handIndex : number) => {
    const newHands = [...hands];
    newHands.splice(handIndex);
    onChangeHands(newHands);
  };

  const handleDeleteConjunction = (handIndex: number, conjunctionIndex: number): void => {
    const newHands = hands.map((hand, hIndex) => {
      if (hIndex !== handIndex) return hand;
      const newHand =  [...hand];
      newHand.splice(conjunctionIndex, 1);
      return newHand;
    });
    onChangeHands(newHands);
  };

  const handleDeleteTerm = (handIndex: number, conjunctionIndex: number, termIndex: number): void => {
    const newHands = hands.map((hand, hIndex) => {
      if (hIndex !== handIndex) return hand;
      return hand.map((conjunction, cIndex) => {
        if (cIndex !== conjunctionIndex) return conjunction;
        const newConjunction = [...conjunction];
        newConjunction.splice(termIndex, 1);
        return newConjunction;
      });
    });
    onChangeHands(newHands);
  };

  const handleNegateTerm = (handIndex: number, conjunctionIndex: number, termIndex: number): void => {
    const newHands = hands.map((hand, hIndex) => {
      if (hIndex !== handIndex) return hand;
      return hand.map((conjunction, cIndex) => {
        if (cIndex !== conjunctionIndex) return conjunction;
        return conjunction.map((term, tIndex) => {
          if (tIndex !== termIndex) return term;
          return [!term[0], term[1]] as Term;
        });
      });
    });
    onChangeHands(newHands);
  };

  const value = {
    hands: hands,
    setHands: onChangeHands,
    onDeleteHand: handleDeleteHand,
    onAddConjunction: handleAddConjunction,
    onDeleteConjunction: handleDeleteConjunction,
    onAddTerm: handleAddTerm,
    onDeleteTerm: handleDeleteTerm,
    onNegateTerm: handleNegateTerm
  };

  return (
    <HandContext.Provider value={value}>
      {children}
    </HandContext.Provider>
  );
};

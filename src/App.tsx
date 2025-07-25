import { useState } from 'react'
import { Card } from 'types/card'
import { DNF, Term } from 'types/dnf'
import { Tutorial } from './components/Tutorial/Tutorial'
import { DeckSizeSelector } from './components/DeckSizeSelector/DeckSizeSelector'
import { HandSizeSelector } from './components/HandSizeSelector/HandSizeSelector'
import { DeckTable } from './components/DeckTable/DeckTable'
import { ProbabilitiesTable } from './components/ProbabilitiesTable/ProbabilitiesTable'
import { DECKSIZE, HANDSIZE } from './constants/defaultCards'

import assert from 'assert';

/**
 * YuGiOh Probability Calculator - A React application for calculating probabilities of drawing various combinations of cards.
 * 
 * The App component contains a Tutorial button, the table to select cards (DeckTable) and the table to select the combinations of cards to draw and see their probabilites (ProbabilitesTable).
 * Adding and removing cards to the card table is handled in this component as this leads to a rerender of both the Deck Table and Probabilites Table.
 */
function App() {
  const [deckSize, setDeckSize] = useState(DECKSIZE);
  const [handSize, setHandSize] = useState(HANDSIZE);
  const [cards, setCards] = useState<Card[]>([]);
  const [hands, setHands] = useState<DNF[]>([]);

  function isDeckFull(newCards: Card[], newDeckSize: number): boolean {
    const numCardsInDeck = newCards.map(card => card.numInDeck).reduce((acc, curr) => acc + curr, 0);
    if (numCardsInDeck > newDeckSize) {
      alert("Warning: Number of cards in deck is higher then the decksize");
      return true;
    }
    return false;
  }

  function onDeckSizeChange(newDeckSize: number) {
    const deckFull = isDeckFull(cards, newDeckSize);
    if (deckFull) {
      return;
    }
    setDeckSize(newDeckSize);
  }

  function onHandSizeChange(newHandSize: number) {
    if (newHandSize > deckSize) {
      alert("Warning: Handsize is bigger then decksize");
    }
    setHandSize(newHandSize);
  }

  function onHandleAddCard(card: Card) {
    const newCards = [...cards, card];
    const deckFull = isDeckFull(newCards, deckSize);
    if (deckFull) {
      return;
    }
    setCards(newCards);
  }

  function onHandleEditCard(cardIdx: number, variableName: string, value: string) {
    if (value === "") {
      return;
    }
    const newCards = [...cards];
    switch (variableName) {
      case "name":
        newCards[cardIdx].name = value;
        break;
      case "numInDeck":
        newCards[cardIdx].numInDeck = parseInt(value);
        const deckFull = isDeckFull(newCards, deckSize);
        if (deckFull) {
          return;
        }
        break;
      case "minToDraw":
        newCards[cardIdx].minToDraw = parseInt(value);
        break;
      case "maxToDraw":
        newCards[cardIdx].maxToDraw = parseInt(value);
        break;
      default:
        throw `variableName ${variableName} does not exist`
    }
    setCards(newCards);
  }
  function onHandleRemoveCard(i: number) {
    const newCards = [...cards];
    newCards.splice(i, 1);
    // Update all hands to maintain consistency after card removal
    const newHands = hands.map(hand =>
      hand.map(conjunction => {
        const newConjunction = conjunction.filter(([_, cardIndex]) => cardIndex !== i);
        return newConjunction.map(([negation, cardIndex]): Term =>
          [negation, cardIndex > i ? cardIndex - 1 : cardIndex])
      })
    )
    setCards(newCards);
    setHands(newHands);
  }

  return (
    <div className="app">
      <h1>YuGiOh Probability Calculator</h1>
      <Tutorial></Tutorial>
      <DeckSizeSelector deckSize={deckSize} onDeckSizeChange={onDeckSizeChange}></DeckSizeSelector>
      <HandSizeSelector handSize={handSize} onHandSizeChange={onHandSizeChange}></HandSizeSelector>
      <DeckTable cards={cards} onAddCard={onHandleAddCard} onRemoveCard={onHandleRemoveCard} onEditCard={onHandleEditCard}></DeckTable>
      <ProbabilitiesTable hands={hands} cards={cards} deckSize={deckSize} handSize={handSize} onChangeHands={setHands}></ProbabilitiesTable>
      <div style={{ height: '100px' }}></div>
    </div>
  )
}

export default App

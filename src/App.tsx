import { useState } from 'react'
import { Card } from 'types/card'
import { Term } from 'types/dnf'
import { Tutorial } from './components/Tutorial/Tutorial'
import { DeckSizeSelector } from './components/DeckSizeSelector/DeckSizeSelector'
import { HandSizeSelector } from './components/HandSizeSelector/HandSizeSelector'
import { DeckTable } from './components/DeckTable/DeckTable'
import { ProbabilitiesTable } from './components/ProbabilitiesTable/ProbabilitiesTable'
import { DECKSIZE, HANDSIZE, CARDS, HANDS } from './constants/defaultCards'

/**
 * YuGiOh Probability Calculator - A React application for calculating probabilities of drawing various combinations of cards.
 * 
 * The App component contains a Tutorial button, the table to select cards (DeckTable) and the table to select the combinations of cards to draw and see their probabilites (ProbabilitesTable).
 * Adding and removing cards to the card table is handled in this component as this leads to a rerender of both the Deck Table and Probabilites Table.
 */
function App() {
  const [deckSize, setDeckSize] = useState(DECKSIZE);
  const [handSize, setHandSize] = useState(HANDSIZE);
  const [cards, setCards] = useState(CARDS);
  const [hands, setHands] = useState(HANDS);

  function onHandleAddCard(card : Card) {
    setCards([...cards, card]);
  }

  function onHandleRemoveCard(i : number) {
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
      <DeckSizeSelector deckSize={deckSize} onDeckSizeChange={setDeckSize}></DeckSizeSelector>
      <HandSizeSelector handSize={handSize} onHandSizeChange={setHandSize}></HandSizeSelector>
      <DeckTable cards={cards} onAddCard={onHandleAddCard} onRemoveCard={onHandleRemoveCard}></DeckTable>
      <ProbabilitiesTable hands={hands} cards={cards} deckSize={deckSize} handSize={handSize} onChangeHands={setHands}></ProbabilitiesTable>
    </div>
  )
}

export default App

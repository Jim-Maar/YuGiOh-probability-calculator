import { Conjunction, DNF } from '../types/dnf';
import { Card } from '../types/card'
import { Term } from '../types/dnf';

function getDeck(cards : Card[], deckSize: number) {
  const deck: number[] = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const newCards = Array<number>(card.numInDeck).fill(i);
    deck.push(...newCards);
  }
  const blankIndex = cards.length;
  const newCards = Array<number>(deckSize - deck.length).fill(blankIndex);
  deck.push(...newCards);
  return deck;
}

function sampleArray(arr : any[], numToSample : number) {
  if (numToSample > arr.length) {
      return arr.slice();
  }
  
  const shuffled = arr.slice(); // copy
  
  // Fisher-Yates shuffle up to numToDraw elements
  for (let i = 0; i < numToSample; i++) {
      const j = i + Math.floor(Math.random() * (shuffled.length - i));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, numToSample);
}

function countElementInArray(arr : any[], elemToCount: any) {
  return arr.filter(elem => elem === elemToCount).length;
}

function isTermFulfilled(cards: Card[], cardsDrawn: number[], term: Term) : boolean {
  const [negation, cardIndex] = term;
  const card = cards[cardIndex]
  const count = countElementInArray(cardsDrawn, cardIndex);
  return negation !== (card.minToDraw <= count && count <= card.maxToDraw);
}

function isConjunctionFulfilled(cards: Card[], cardsDrawn: number[], conjunction: Conjunction) : boolean {
  for (const term of conjunction) {
    const termResult = isTermFulfilled(cards, cardsDrawn, term);
    if (!termResult) {
      return false;
    }
  }
  return true;
}

function isDnfFulfilled(cards: Card[], cardsDrawn: number[], hand: DNF) : boolean{
  for (const conjunction of hand) {
    const conjunctionResult = isConjunctionFulfilled(cards, cardsDrawn, conjunction);
    if (conjunctionResult) {
      return true;
    }
  }
  return false;
}

const SMAPLE_SIZE = 50000;

export function getProbability(cards: Card[], hand: DNF, deckSize: number, handSize: number): string {
  const deck = getDeck(cards, deckSize);
  let countFulfilled = 0;
  for (let i = 0; i < SMAPLE_SIZE; i++) {
    const cardsDrawn = sampleArray(deck, handSize);
    const dnfResult = isDnfFulfilled(cards, cardsDrawn, hand);
    if (dnfResult) {
      countFulfilled ++;
    }
  }
  return (countFulfilled / SMAPLE_SIZE * 100).toFixed(1);
}
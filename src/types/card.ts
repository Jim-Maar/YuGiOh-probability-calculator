/**
 * Represents a card in the Yu-Gi-Oh deck with the amount and the number needed to be drawn.
 * @property {string} name - The name of the card
 * @property {number} numInDeck - Number of copies of this card in the deck
 * @property {number} minToDraw - Minimum number of copies needed to be drawn
 * @property {number} maxToDraw - Maximum number of copies that should be drawn
 */
export type Card = {
    name : string,
    numInDeck : number,
    minToDraw : number,
    maxToDraw : number
};
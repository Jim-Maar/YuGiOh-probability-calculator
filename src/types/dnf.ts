export type Negation = boolean;
export type CardIndex = number;
/**
 * Represents a card you want to draw / not draw. e.g (Card A) / (NOT Card A)
 * 
 * @param {boolean} Negation - Indicates whether you want to draw the card or not.
 * @param {number} CardIndex - Refers to the index in the cards array in App.
 * @remarks Is used for DNF (See Type: DNF for an explanation).
 */
export type Term = [Negation, CardIndex];
/**
 * Represents a combination of Cards you want to draw / not draw (e.g (Card A AND NOT Card B)).
 * 
 * @remarks Is used for DNF (See Type: DNF for an explanation).
 */
export type Conjunction = Term[];
/**
 * Represents a combination of YuGiOh cards, for which you want to calculate the probability of drawing them.
 * 
 * It is in the format of a disjunctive normal form, but instead of boolean variables you have cards that you want to draw (e.g. (Card A AND not Card B) OR (Card C)).
 */
export type DNF = Conjunction[];
import { Card } from "types/card";
import { DNF } from "types/dnf";

export const DECKSIZE = 40;
export const HANDSIZE = 5;

/*
* The Following Constants are only used for testing.
*/

export const BLAUER_DRACHE : Card = { name: 'Blauer Drache', numInDeck : 3, minToDraw : 1, maxToDraw : 3 };
export const ROTER_DRACHE : Card = { name: 'Roter Drache', numInDeck : 3, minToDraw : 1, maxToDraw : 3 };
export const GRÜNER_DRACHE : Card = { name: 'Grüner Drache', numInDeck : 3, minToDraw : 1, maxToDraw : 3 };
export const CARDS : Card[] = [
  BLAUER_DRACHE,
  ROTER_DRACHE,
  GRÜNER_DRACHE
]
export const HANDS : DNF[] = [
  [
    [[false, 0], [false, 1]], [[false, 2]]
  ],
  [
    [[true, 1]]
  ]
]
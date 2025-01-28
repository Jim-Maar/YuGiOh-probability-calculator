import React from 'react';
import { useMemo } from 'react';
import { DNF } from 'types/dnf';
import { Card } from 'types/card';
import { getProbability } from 'utils/probability';

type ProbabilityProps = {
  cards : Card[],
  hand : DNF,
  deckSize: number,
  handSize: number
}

export const Probability: React.FC<ProbabilityProps> = ({cards, hand, deckSize, handSize}) => {
  const probability = useMemo(() => getProbability(cards, hand, deckSize, handSize), [cards, hand, deckSize, handSize]);
  return <div style={{textAlign: 'center', flex: 1, height: '100%', display: 'grid', placeItems: 'center'}}>
    {probability}%
  </div>;
}
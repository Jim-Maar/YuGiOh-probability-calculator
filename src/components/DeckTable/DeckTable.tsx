import React from 'react';
import { Card } from '../../types/card';

type DeckTableProps = {
  cards: Card[];
  onAddCard: (card: Card) => void;
  onRemoveCard: (index: number) => void;
}

/**
 * DeckTable Component - Table in which the user can input all their relevant cards.
 * 
 * The user can input the desired parameters (name, number of the card in deck, minimum of the card to draw and maximum of the card to draw).
 * Clicking on Add Card will add the card to the table overview and make the card available to selected in the HandSelector.
 * Every card has a Remove Card button .
 * 
 * @param {Card[]} cards - Array of card objects currently in the deck.
 * @param {function} onAddCard - Callback function to add a new card to the deck.
 * @param {function} onRemoveCard - Callback function to remove a card from the deck by its index.
 */
export const DeckTable: React.FC<DeckTableProps> = ({ cards, onAddCard, onRemoveCard }) => {
  const submitAddCardForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    const card: Card = {
      name: payload.name.toString(),
      numInDeck: parseInt(payload.numInDeck.toString()),
      minToDraw: parseInt(payload.minToDraw.toString()),
      maxToDraw: parseInt(payload.maxToDraw.toString())
    };
    onAddCard(card);
  };

  return (
    <div>
      <h2>Cards</h2>
      <table style={{width: '800px', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th>Card</th>
            <th>Num</th>
            <th>Min</th>
            <th>Max</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, i) => (
            <tr key={i}>
              <td>{card.name}</td>
              <td>{card.numInDeck}</td>
              <td>{card.minToDraw}</td>
              <td>{card.maxToDraw}</td>
              <td><button onClick={() => onRemoveCard(i)}>Remove</button></td>
            </tr>
          ))}
          <tr key={cards.length}>
            <td colSpan={5}>
              <form onSubmit={submitAddCardForm}>
                <input type='text' name='name' placeholder='Name' />
                <input type='number' name='numInDeck' placeholder='Num in deck' defaultValue={3} />
                <input type='number' name='minToDraw' placeholder='Min to draw' defaultValue={1} />
                <input type='number' name='maxToDraw' placeholder='Max to draw' defaultValue={3} />
                <button type='submit'>Add</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
import React from 'react';
import { Card } from '../../types/card';

type DeckTableProps = {
  cards: Card[];
  onAddCard: (card: Card) => void;
  onRemoveCard: (index: number) => void;
  onEditCard: (cardIndex: number, variableName: string, value: string) => void;
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
export const DeckTable: React.FC<DeckTableProps> = ({ cards, onAddCard, onRemoveCard, onEditCard }) => {
  const isInputCorrect = (card: Card): [boolean, string] => {
    if (card.name === "") {
      return [false, "Please input the name of the card"];
    }
    if (card.minToDraw > card.maxToDraw || card.maxToDraw > card.numInDeck) {
      return [false, "Parameters need to satisfy Min <= Max <= Num"];
    }
    if (card.numInDeck < 0 || card.minToDraw < 0 || card.maxToDraw < 0) {
      return [false, "Parameters must not be negative"];
    }
    return [true, "Input OK: No alert should be shown"]
  }

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
    const [inputCorrect, errorMsg] = isInputCorrect(card);
    if (!inputCorrect) {
      alert(errorMsg);
      return;
    }
    onAddCard(card);
  };

  return (
    <div className='table-section deck-table'>
      <h2>Cards</h2>
      <table style={{ width: '100%' }}>
        <thead>
          <tr className='table-row'>
            <th className='table-data first-column'>Card</th>
            <th className='table-data regular-column'>Num</th>
            <th className='table-data regular-column'>Min</th>
            <th className='table-data regular-column'>Max</th>
            <th className='table-data regular-column'></th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, i) => (
            <tr className='table-row' key={i}>
              <td className='first-column'>
                <div className='table-data'>{card.name}</div>
              </td>
              <td className='regular-column'>
                <input
                  className='table-data'
                  type='number'
                  value={card.numInDeck}
                  onChange={(e) => onEditCard(i, "numInDeck", e.target.value)}
                />
              </td>
              <td className='regular-column'>
                <input
                  className='table-data'
                  type='number'
                  value={card.minToDraw}
                  onChange={(e) => onEditCard(i, "minToDraw", e.target.value)}
                />
              </td>
              <td className='regular-column'>
                <input
                  className='table-data'
                  type='number'
                  value={card.maxToDraw}
                  onChange={(e) => onEditCard(i, "maxToDraw", e.target.value)}
                />
              </td>
              <td className='regular-column'>
                <button className='table-data-button' onClick={() => onRemoveCard(i)}>Remove Card</button>
              </td>
            </tr>
          ))}
          <tr key={cards.length}>
            <td colSpan={5} style={{ padding: 0 }}>
              <form className='table-row' onSubmit={submitAddCardForm}>
                <div className='first-column'>
                  <input className='table-data' type='text' name='name' placeholder='Name' />
                </div>
                <div className='regular-column'>
                  <input className='table-data' type='number' name='numInDeck' placeholder='Num in deck' defaultValue={3} />
                </div>
                <div className='regular-column'>
                  <input className='table-data' type='number' name='minToDraw' placeholder='Min to draw' defaultValue={1} />
                </div>
                <div className='regular-column'>
                  <input className='table-data' type='number' name='maxToDraw' placeholder='Max to draw' defaultValue={3} />
                </div>
                <div className='regular-column'>
                  <button className='table-data-button' type='submit'>Add Card</button>
                </div>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/*
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
    <div className='table'>
      <h2>Cards</h2>
      <table>
        <thead>
          <tr style={{display: 'flex', borderCollapse: 'collapse'}} className='tableContainer'>
            <th style={{flex: 2}}>Card</th>
            <th style={{flex: 1}}>Num</th>
            <th style={{flex: 1}}>Min</th>
            <th style={{flex: 1}}>Max</th>
            <th style={{flex: 1}}>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, i) => (
            <tr style={{display: 'flex', borderCollapse: 'collapse', margin: 0, padding: 0, border: 'None', lineHeight:1.2}} className='tableContainer' key={i}>
              <td style={{flex: 2, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}}>{card.name}</td>
              <td style={{flex: 1, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}}>{card.numInDeck}</td>
              <td style={{flex: 1, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}}>{card.minToDraw}</td>
              <td style={{flex: 1, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}}>{card.maxToDraw}</td>
              <td style={{flex: 1, display: 'flex', minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}}>
                <button style={{flex: 1, margin: 0, padding: 0, minHeight: 0, border: 'none', lineHeight:1.2}} onClick={() => onRemoveCard(i)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr key={cards.length} className='tableContainer' style={{borderCollapse: 'collapse', margin: 0, padding: 0, border: 'None', display: 'flex', lineHeight:1.2}}>
            <td colSpan={5} className='tableContainer' style={{padding: 0, margin: 0, borderCollapse: 'collapse', border: 'none', display: 'flex', lineHeight:1.2}}>
              <form style={{display: 'flex', borderCollapse: 'collapse', lineHeight:1.2}} className='tableContainer' onSubmit={submitAddCardForm}>
                <input style={{flex: 2, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}} type='text' name='name' placeholder='Name' />
                <input style={{flex: 1, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}} type='number' name='numInDeck' placeholder='Num in deck' defaultValue={3} />
                <input style={{flex: 1, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}} type='number' name='minToDraw' placeholder='Min to draw' defaultValue={1} />
                <input style={{flex: 1, minWidth: 0, padding: 0, margin: 0, border: 'none', minHeight: 0, lineHeight:1.2}} type='number' name='maxToDraw' placeholder='Max to draw' defaultValue={3} />
                <button style={{flex: 1, margin: 0, padding: 0, border: 'none', minHeight: 0, lineHeight:1.2, textAlign: 'center'}} type='submit'>Add</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
*/
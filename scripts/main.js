// This script contains the logic for the Yugioh calculator

// mission: create code that is actually really understandable!
// good variable names!
// modular small functions without nesting!

// This class describes some combinations of cards to draw / not draw
class ProbabiliyStatement{
    constructor(cardsCNF) {
        this.cardsCNF = cardsCNF;
    }
}

class Page{
    constructor(cards, probabilityStatements){
        this.cards = cards;
        this.probabilityStatements = probabilityStatements;
    }
}

class DeckModel{
    constructor(){
        this.cards = [];
        this.observers = [];
    };

    addCard(card) {
        this.cards.push(card);
        this.notifyObservers();
        return this.cards;
    }

    removeCard(index) {
        this.cards.splice(index, 1);
        this.notifyObservers();
        return this.cards;
    }

    getCards() {
        return this.cards;
    }

    addObserver(obj) {
        this.observers.push(obj);
    }

    notifyObservers() {
        this.observers.forEach(obj => obj.update(this)); 
    }
}

class DeckView{
    constructor() {
        this.cardContainer = document.querySelector('#card-container');

        this.cardNameInput = document.querySelector('#card-name-input');
        if (!this.cardNameInput) {
            console.error('Could not find card name input element');
        }
        this.cardNumInput = document.querySelector('#card-num-input');
        this.cardMinInput = document.querySelector('#card-min-input');
        this.cardMaxInput = document.querySelector('#card-max-input');

        this.addCardButton = document.querySelector('#add-card-button');
        if (!this.addCardButton) {
            console.error('Could not find add card button element');
        }

        this.numCols = 5;

        this.removeCardCallback = null;
    }

    render(deckModel) {
        const cards = deckModel.getCards();
        this.clearCards();
        cards.forEach((card, index) => this.renderCard(card, index));
    }

    clearCards() {
        // TODO: this funciton is very dependent on the number of columns. It would be good to make the number and names of colums modular
        // When using typescript, I can see how this is done
        const numRows = this.cardContainer.children.length / this.numCols;
        // starting at row 1 and ending before numRows - 1 because first row is header and last row is input
        // TODO: I think this could be a lot cleaner
        for (let row = 1; row < numRows - 1; row++){
            for (let col = 0; col < this.numCols; col++) {
                const toRemove = this.cardContainer.children[this.numCols];
                this.cardContainer.removeChild(toRemove);
            }
        }
    }

    renderCard(card, index) {
        const nameDiv = document.createElement('div');
        nameDiv.textContent = card.name;
        const numDiv = document.createElement('div');
        numDiv.textContent = card.numInDeck;
        const minDiv = document.createElement('div');
        minDiv.textContent = card.minToDraw;
        const maxDiv = document.createElement('div');
        maxDiv.textContent = card.maxToDraw;

        const removeCardButton = document.createElement('button');
        removeCardButton.textContent = "Delete Card"
        const removeCardButtonDiv = document.createElement('div');
        removeCardButtonDiv.appendChild(removeCardButton);
        removeCardButton.addEventListener("click", () => {
            if (this.removeCardCallback) {
                this.removeCardCallback(index);
            }
        })

        this.cardContainer.insertBefore(nameDiv, this.cardNameInput);
        this.cardContainer.insertBefore(numDiv, this.cardNameInput);
        this.cardContainer.insertBefore(minDiv, this.cardNameInput);
        this.cardContainer.insertBefore(maxDiv, this.cardNameInput);
        this.cardContainer.insertBefore(removeCardButtonDiv, this.cardNameInput);
    }

    clearInputs() {
        this.cardNameInput.value = "";
        this.cardNumInput.value = "3";
        this.cardMinInput.value = "1";
        this.cardMaxInput.value = "3";
    }

    update(deckModel) {
        this.render(deckModel);
    }
}

class DeckController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.addObserver(this.view);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.view.addCardButton.addEventListener("click", this.handleAddCard);
        this.view.removeCardCallback = this.handleRemoveCard.bind(this);
    }

    handleAddCard() {
        const name = this.view.cardNameInput.value;
        const numInDeck = parseInt(this.view.cardNumInput.value);
        const minToDraw = parseInt(this.view.cardMinInput.value);
        const maxToDraw = parseInt(this.view.cardMaxInput.value);
        if ((minToDraw > maxToDraw) || (maxToDraw > numInDeck)) {
            alert("please enter valid values! (min <= max <= num)");
            return;
        }
        const card = {
            name : name,
            numInDeck : numInDeck,
            minToDraw : minToDraw,
            maxToDraw : maxToDraw,
        };
        this.model.addCard(card);
        this.view.clearInputs();
    }

    handleRemoveCard(index) {
        this.model.removeCard(index);
    }
}

const deckModel = new DeckModel;
const deckView = new DeckView;
const deckController = new DeckController(deckModel, deckView)

// TODO: Add feature to edit cards (probabilities are recalculated instantly)
// TODO: Ask Claude how I can strucutre the code better / perfectly
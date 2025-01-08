// This script contains the logic for the Yugioh calculator

/*
// This class describes some combinations of cards to draw / not draw
class ProbabiliyStatement{
    constructor(cardsCNF) {
        this.cardsCNF = cardsCNF;
    }
}
*/

/*
class Page{
    constructor(cards : Card[], probabilityStatements){
        this.cards: Card[] = cards;
        this.probabilityStatements = probabilityStatements;
    }
}
*/
const NUM_COLUMNS = 5;

type Card = {
    name : string,
    numInDeck : number,
    minToDraw : number,
    maxToDraw : number,
}

type DeckObserver = {
    update: (deckModel: DeckModel) => void;
}

class DeckModel{
    cards: Card[];
    observers: DeckObserver[];

    constructor(){
        this.cards = [];
        this.observers = [];
    }

    public addCard(card: Card) : Card[] {
        this.cards.push(card);
        this.notifyObservers();
        return this.cards;
    }

    public removeCard(index : number): Card[] {
        this.cards.splice(index, 1);
        this.notifyObservers();
        return this.cards;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public addObserver(obj: DeckObserver): void {
        this.observers.push(obj);
    }

    private notifyObservers(): void {
        this.observers.forEach(obj => obj.update(this)); 
    }
}

interface DOMSelectors {
    readonly cardContainer: string;
    readonly cardNameInput: string;
    readonly cardNumInDeckInput: string;
    readonly cardMinToDrawInput: string;
    readonly cardMaxToDrawInput: string;
    readonly addCardButton: string;
}

class DeckView implements DeckObserver{
    private static readonly SELECTORS: DOMSelectors = {
        cardContainer: '#card-container',
        cardNameInput: '#card-name-input',
        cardNumInDeckInput: '#card-num-input',
        cardMinToDrawInput: '#card-min-input',
        cardMaxToDrawInput: '#card-max-input',
        addCardButton: '#add-card-button'
    };

    cardContainer: HTMLDivElement;
    cardNameInput: HTMLInputElement;
    cardNumInDeckInput: HTMLInputElement;
    cardMinToDrawInput: HTMLInputElement;
    cardMaxToDrawInput: HTMLInputElement;
    addCardButton: HTMLButtonElement;
    numCols: number;
    removeCardCallback: null | ((index: number) => void);

    constructor() {
        const cardContainer = document.querySelector(DeckView.SELECTORS.cardContainer);
        const cardNameInput = document.querySelector(DeckView.SELECTORS.cardNameInput);
        const cardNumInDeckInput = document.querySelector(DeckView.SELECTORS.cardNumInDeckInput);
        const cardMinToDrawInput = document.querySelector(DeckView.SELECTORS.cardMinToDrawInput);
        const maxToDrawInput = document.querySelector(DeckView.SELECTORS.cardMaxToDrawInput);
        const addCardButton = document.querySelector(DeckView.SELECTORS.addCardButton);

        if (!cardContainer || !(cardContainer instanceof HTMLDivElement)) {
            throw new Error('Critical element #card-container not found or is not div');
        }
        if (!cardNameInput || !(cardNameInput instanceof HTMLInputElement)) {
            throw new Error('Critical element #card-name-input not found or is not input');
        }
        if (!cardNumInDeckInput || !(cardNumInDeckInput instanceof HTMLInputElement)) {
            throw new Error('Critical element #card-num-input not found or is not input'); 
        }
        if (!cardMinToDrawInput || !(cardMinToDrawInput instanceof HTMLInputElement)) {
            throw new Error('Critical element #card-min-input not found or is not input');
        }
        if (!maxToDrawInput || !(maxToDrawInput instanceof HTMLInputElement)) {
            throw new Error('Critical element #card-max-input not found or is not input');
        }
        if (!addCardButton || !(addCardButton instanceof HTMLButtonElement)) {
            throw new Error('Critical element #add-card-button not found or is not button');
        }

        this.cardContainer = cardContainer;
        this.cardNameInput = cardNameInput;
        this.cardNumInDeckInput = cardNumInDeckInput;
        this.cardMinToDrawInput = cardMinToDrawInput;
        this.cardMaxToDrawInput = maxToDrawInput;
        this.addCardButton = addCardButton;

        this.numCols = NUM_COLUMNS;

        this.removeCardCallback = null;
    }

    private render(deckModel : DeckModel): void {
        const cards = deckModel.getCards();
        this.clearCards();
        cards.forEach((card, index) => this.renderCard(card, index));
    }

    private clearCards(): void {
        const numRows = this.cardContainer.children.length / this.numCols;
        // starting at row 1 and ending before numRows - 1 because first row is header and last row is input
        for (let row = 1; row < numRows - 1; row++){
            for (let col = 0; col < this.numCols; col++) {
                const toRemove = this.cardContainer.children[this.numCols];
                this.cardContainer.removeChild(toRemove);
            }
        }
    }

    private createDivWithText(text: string | number): HTMLDivElement {
        const div = document.createElement('div');
        div.textContent = text.toString();
        return div
    }

    private createRemoveButton(index: number): HTMLDivElement {
        const removeCardButton = document.createElement('button');
        removeCardButton.textContent = "Delete Card"
        const removeCardButtonDiv = document.createElement('div');
        removeCardButtonDiv.appendChild(removeCardButton);
        removeCardButton.addEventListener("click", () => {
            if (this.removeCardCallback) {
                this.removeCardCallback(index);
            }
        })
        return removeCardButtonDiv
    }

    private renderCard(card : Card, index: number): void {
        const nameDiv = this.createDivWithText(card.name);
        const numDiv = this.createDivWithText(card.numInDeck);
        const minDiv = this.createDivWithText(card.minToDraw);
        const maxDiv = this.createDivWithText(card.maxToDraw);
        const removeCardButtonDiv = this.createRemoveButton(index);

        this.cardContainer.insertBefore(nameDiv, this.cardNameInput);
        this.cardContainer.insertBefore(numDiv, this.cardNameInput);
        this.cardContainer.insertBefore(minDiv, this.cardNameInput);
        this.cardContainer.insertBefore(maxDiv, this.cardNameInput);
        this.cardContainer.insertBefore(removeCardButtonDiv, this.cardNameInput);
    }

    public clearInputs(): void {
        this.cardNameInput.value = "";
        this.cardNumInDeckInput.value = "3";
        this.cardMinToDrawInput.value = "1";
        this.cardMaxToDrawInput.value = "3";
    }

    update(deckModel : DeckModel): void {
        this.render(deckModel);
    }
}

class DeckController{
    model: DeckModel;
    view: DeckView;

    constructor(model : DeckModel, view : DeckView) {
        this.model = model;
        this.view = view;
        this.model.addObserver(this.view);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.view.addCardButton.addEventListener("click", this.handleAddCard);
        this.view.removeCardCallback = this.handleRemoveCard.bind(this);
    }

    private isValidCardInput(name : string, numInDeck : number, minToDraw : number, maxToDraw: number): boolean {
        if (name === "") {
            alert("please enter a valid name");
            return false;
        }
        if ((minToDraw > maxToDraw) || (maxToDraw > numInDeck)) {
            alert("please enter valid values! (min <= max <= num)");
            return false;
        }
        return true;
    }

    private handleAddCard(): void {
        const name = this.view.cardNameInput.value;
        const numInDeck = parseInt(this.view.cardNumInDeckInput.value);
        const minToDraw = parseInt(this.view.cardMinToDrawInput.value);
        const maxToDraw = parseInt(this.view.cardMaxToDrawInput.value);
        if (!this.isValidCardInput(name, numInDeck, minToDraw, maxToDraw)) {
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

    private handleRemoveCard(index: number): void {
        this.model.removeCard(index);
    }
}

const deckModel = new DeckModel;
const deckView = new DeckView;
const deckController = new DeckController(deckModel, deckView);

// TODO: Add feature to edit cards (probabilities are recalculated instantly)
// TODO: Ask Claude how I can strucutre the code better / perfectly
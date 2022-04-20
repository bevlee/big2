const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
];

export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }

  shuffle() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      let newPosition = Math.floor(Math.random() * (i + 1));
      let oldValue = this.cards[newPosition];
      this.cards[newPosition] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  draw() {
    return this.cards.pop();
  }
  isEmpty() {
    return this.cards.length == 0;
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return this.value.toString() + this.suit.toString();
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}

//array of Card objects
function newDeck(cards) {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

const SUITS = ["spade", "club", "heart", "diamond"];
const VALUES = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
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

  getHTML() {
    const cardDiv = document.createElement("div");
    var img = document.createElement("img");

    img.setAttribute(
      "src",
      `./playing-cards-assets/png2/${this.value}_of_${this.suit}s.png`
    );

    img.setAttribute("class", "card");

    cardDiv.appendChild(img);

    img.onclick = () => {
      !img.classList.contains("selectedCard")
        ? img.classList.add("selectedCard")
        : img.classList.remove("selectedCard");
    };
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

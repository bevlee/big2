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

  getHTML(visible, toggleSelection) {
    const cardDiv = document.createElement("div");
    var img = document.createElement("img");

    img.setAttribute("class", "card");

    cardDiv.appendChild(img);

    if (visible) {
      img.setAttribute(
        "src",
        `./playing-cards-assets/png2/${this.value}_of_${this.suit}s.png`
      );
      img.onclick = () => {
        if (!img.classList.contains("selectedCard")) {
          img.classList.add("selectedCard");
        } else {
          img.classList.remove("selectedCard");
        }
        toggleSelection(this);
      };
      img.classList.add("playableCard");
    } else {
      img.setAttribute("src", `./playing-cards-assets/png2/cardback.png`);
    }
    this.html = img;
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

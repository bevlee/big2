const SUITS = ["S", "C", "H", "D"];
const VALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];

export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }
}
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
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

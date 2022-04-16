import Deck from "./deck.js";
import Player from "./player.js";

let deck = new Deck();
deck.shuffle();
console.log(deck.cards);
console.log(deck.draw());
console.log(deck.cards);

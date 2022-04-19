import Deck from "./deck.js";
import Player from "./player.js";

const PLAYER_COUNT = 2;
const deck = new Deck();
console.log(deck.cards);

deck.shuffle();

console.log(deck.cards);
var players = [];
for (var i = 0; i < PLAYER_COUNT; i++) {
  players.push(new Player());
}

var current_player = players[0];

function deal(cards = 1) {
  for (var i = 0; i < cards; i++) {
    current_player.draw(deck.draw());
  }
}

function startGame() {
  //deal deck to players evenly
  let i = 0;
  while (!deck.isEmpty()) {
    current_player = players[i++ % PLAYER_COUNT];
    deal(1);
  }
  var player1 = document.getElementById("player1");
  player1.textContent = players[0].hand;

  var player2 = document.getElementById("player2");
  player2.textContent = players[1].hand;
}

startGame();
console.log(players);

import Deck from "./deck.js";
import Player from "./player.js";

const CARD_VALUE_MAP = {
  3: 0,
  4: 1,
  5: 2,
  6: 3,
  7: 4,
  8: 5,
  9: 6,
  10: 7,
  J: 8,
  Q: 9,
  K: 10,
  A: 11,
  2: 12,
};

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
  current_player = players[0];
  var player1 = document.getElementById("player1");
  for (var j = 0; j < players[0].hand.length; j++) {
    player1.appendChild(players[0].hand[j].getHTML());
  }

  var player2 = document.getElementById("player2");

  for (var j = 0; j < players[0].hand.length; j++) {
    player2.appendChild(players[1].hand[j].getHTML());
  }
}

startGame();
console.log(players);

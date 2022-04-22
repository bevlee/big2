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
const selection = new Set();
console.log(deck.cards);

deck.shuffle();

console.log(deck.cards);
var players = [];
var pile = [];

for (var i = 0; i < PLAYER_COUNT; i++) {
  players.push(new Player());
}

var current_player = 0;

function deal(cards = 1) {
  for (var i = 0; i < cards; i++) {
    players[current_player].draw(deck.draw());
  }
}

function checkPlayValid(card) {
  if (pile.length == 0) {
    return true;
  } else {
    return card.value > pile[pile.length - 1].value;
  }
}

function endTurn() {
  console.log("ending turn");
  lastPlayed = [];
  pile = [];
  current_player = (current_player + 1) % PLAYER_COUNT;
}

//process combos
var comboInstance = false;
var comboType = "";
var lastPlayed = [];

function findCombo(cards) {
  lastPlayed = cards;
  comboInstane = true;
  if (cards.length == 4 && cards.every((i) => i == cards[0])) {
    return "bomb";
  }
  if (cards.length == 3 && cards.every((i) => i == cards[0])) {
    return "triple";
  }
  if (cards.length == 2 && cards.every((i) => i == cards[0])) {
    return "double";
  }
}
function playCard(card) {
  if (checkPlayValid(card)) pile.push(card);
  console.log(pile);
}

function toggleSelection(card) {
  if (selection.has(card)) {
    selection.delete(card);
  } else {
    selection.add(card);
  }
}

function playSelection() {
  console.log("playing");
  var selectedCards = [...selection];
  console.log("selectedCards: " + selectedCards);
  if (selection.size == 1 && checkPlayValid(selectedCards[0])) {
    for (var j = 0; j < selectedCards; j++) {
      for (var i = 0; i < players[0].hand.length; i++) {
        if (players[0].hand[i] == selectedCards[j]) {
          //remove card from hand if it is valid
          players[0].hand.splice(i, 1);
          playCard(selectedCards[j]);
        }
      }
    }
    lastPlayed = selectedCards;

    current_player = (current_player + 1) % PLAYER_COUNT;
  } else {
    alert("Please select a valid card to play");
  }
}

function startGame() {
  //deal deck to players evenly
  let i = 0;
  while (!deck.isEmpty()) {
    players[current_player] = players[i++ % PLAYER_COUNT];
    deal(1);
  }
  players[current_player] = players[0];
  var player1 = document.getElementById("player1");
  var handDiv1 = document.createElement("div");
  player1.appendChild(handDiv1);
  handDiv1.setAttribute("class", "hand");
  for (var j = 0; j < players[0].hand.length; j++) {
    handDiv1.appendChild(players[0].hand[j].getHTML(true, toggleSelection));
  }

  var player2 = document.getElementById("player2");
  var handDiv2 = document.createElement("div");
  handDiv2.setAttribute("class", "hand");
  player2.appendChild(handDiv2);
  for (var j = 0; j < players[1].hand.length; j++) {
    handDiv2.appendChild(players[1].hand[j].getHTML(false, toggleSelection));
  }

  var playButton = document.getElementById("playButton");
  playButton.onclick = playSelection;
  var passButton = document.getElementById("passButton");
  passButton.onclick = endTurn;
}

startGame();
console.log(players);

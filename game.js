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
  Jack: 8,
  Queen: 9,
  King: 10,
  Ace: 11,
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
    console.log(pile[pile.length - 1].value + "vs current card: " + card.value);
    return (
      CARD_VALUE_MAP[card.value] > CARD_VALUE_MAP[pile[pile.length - 1].value]
    );
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

function toggleSelection(cardDiv, card) {
  if (cardDiv.classList.contains("selectedCard") && selection.has(card)) {
    cardDiv.classList.remove("selectedCard");
    selection.delete(card);
  } else {
    cardDiv.classList.add("selectedCard");
    selection.add(card);
  }
}

function playSelection() {
  var selectedCards = [...selection];
  if (selection.size == 1 && checkPlayValid(selectedCards[0])) {
    for (var j = 0; j < selectedCards.length; j++) {
      for (var i = 0; i < players[0].hand.length; i++) {
        if (players[0].hand[i] == selectedCards[j]) {
          //remove card from hand if it is valid
          players[0].hand[i].getHTMLObject().remove();
          players[0].hand.splice(i, 1);
          playCard(selectedCards[j]);

          lastPlayed = selectedCards;
          selection.clear();
          current_player = (current_player + 1) % PLAYER_COUNT;
          return;
        }
      }
    }
  } else {
    alert("Please select a valid card to play");
  }
}

function startGame() {
  //deal deck to players evenly
  let i = 0;
  while (!deck.isEmpty()) {
    current_player = i++ % PLAYER_COUNT;
    deal(1);
  }

  var player1 = document.getElementById("player1");
  var handDiv1 = document.createElement("div");
  player1.appendChild(handDiv1);
  handDiv1.classList.add("hand");
  for (var j = 0; j < players[0].hand.length; j++) {
    let card = players[0].hand[j];
    let cardDiv = card.getHTMLObject();
    cardDiv.onclick = () => {
      toggleSelection(cardDiv, card);
    };
    handDiv1.appendChild(cardDiv);
  }

  var player2 = document.getElementById("computerName");
  var handDiv2 = document.createElement("div");

  player2.appendChild(handDiv2);
  handDiv2.classList.add("hand");
  for (var j = 0; j < players[1].hand.length; j++) {
    let card = players[1].hand[j];
    let cardDiv = card.getHTMLObject();
    cardDiv.onclick = () => {
      toggleSelection(cardDiv, card);
    };
    handDiv2.appendChild(cardDiv);
  }

  var playButton = document.getElementById("playButton");
  playButton.onclick = playSelection;
  var passButton = document.getElementById("passButton");
  passButton.onclick = endTurn;
}

startGame();
console.log(players);

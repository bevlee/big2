export default class Player {
  constructor(player_number, hand = []) {
    this.player_number = player_number;
    this.hand = hand;
  }
  draw(card) {
    this.hand.push(card);
  }
  toString() {
    return this.hand.toString();
  }
}

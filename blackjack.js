function getCardImageUrl(card) {
  var name = card.point;

  if (card.point === 11) {
    name = 'jack';
  } else if (card.point === 12) {
    name = 'queen';
  } else if (card.point === 13) {
    name = 'king';
  } else if (card.point === 1) {
    name = 'ace';
  }
  return 'images/' + name + '_of_' + card.suit + '.png';
}

function calculatePoints(cards) {
  var points = 0;
  var addPoint = 0;
  var pointList = [];

  for (var idxCard in cards) {
    var card = cards[idxCard];
    if (card.point >= 10) {
      addPoint = 10;
    } else if (card.point === 1){
      if (points + 11 > 21){
        addPoint = card.point;
      } else {
        addPoint = 11;
      }
    } else {
      addPoint = card.point;
    }
    points += addPoint;
    pointList.push(addPoint);
  }
  if (points > 21){
    for (var idxAddPoint in pointList) {
      if (pointList[idxAddPoint] === 11){
        points -= 10;
      }
    }
  }
  return points;
}

function newDeck() {
  var deck = [];
  var suit = "";
  for (var idxNumber = 1; idxNumber <= 13; idxNumber++) {
    for (var idxSuit = 0; idxSuit < 4; idxSuit++) {
      if (idxSuit === 0) {
        suit = "spades";
      } else if (idxSuit === 1) {
        suit = "hearts";
      } else if (idxSuit == 2) {
        suit = "clubs";
      } else {
        suit = "diamonds";
      }
      deck.push({"point": idxNumber, "suit": suit});
    }
  }
  console.log(deck);
  return deck;
}

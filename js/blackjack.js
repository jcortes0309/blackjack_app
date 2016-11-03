var deck;
var dealerHand = [];
var playerHand = [];
var dealerPts = 0;
var playerPts = 0;
var deckNumber = 3;

$(document).ready(function() {
  deck = [];
  for (var i = 0; i < deckNumber; i++) {
    deck = deck.concat(newDeck());
    console.log(deck.length);
  }

  $(".card-back").hide();

  $('#hit-button').prop('disabled', true);
  $('#stand-button').prop('disabled', true);

  $("#deal-button").click(function(){
    $('#deal-button').prop('disabled', true);
    $('#hit-button').prop('disabled', false);
    $('#stand-button').prop('disabled', false);
    $('#dealer-points').hide();
    $(".card-back").show();
    for (var i = 0; i < 2; i++) {
      giveCardDealer();
      if (i==1) {
        $("#dealer-hand img:nth-child(2)").hide();
      }
      giveCardPlayer();
      displayPoints();
      checkBust();
    }
    checkBlackJack();
  });

  $("#hit-button").on("click", function () {
    giveCardPlayer();
    displayPoints();
    checkBust();
  });

  $("#playAgainButton").click(function(){
    $('#eventModal').modal('hide');
        newGame();
  });

  $("#stand-button").click(function(){
    $('#hit-button').prop('disabled', true);
    $(".card-back").hide();
    $("#dealer-hand img:nth-child(2)").show();
    $('#dealer-points').show();
    while (dealerPts < 17) {
      giveCardDealer();
      displayPoints();
      checkBust();
      console.log('message: ' + $('#eventMessage').text());
    }
    if (dealerPts <= 21) {
        checkWin();
    }
    console.log('message: ' + $('#eventMessage').text());
  });

    function checkBlackJack() {
      if (playerPts == 21) {
        $('#eventModal').modal('show');
        $('#eventMessage').text("BLACKJACK!!!  Player Wins");
      }
    }

    function checkWin() {
        if (playerPts == 21 && dealerPts == 21) {
            $('#eventModal').modal('show');
            $('#eventMessage').text("PUSH!");
        } else if (playerPts == 21) {
            $('#eventModal').modal('show');
            $('#eventMessage').text("BLACKJACK!!!  Player Wins");
        } else if (dealerPts == 21) {
            $('#eventModal').modal('show');
            $('#eventMessage').text("BLACKJACK!!!  Dealer Wins");
        } else if (dealerPts > playerPts) {
            $('#eventModal').modal('show');
            $('#eventMessage').text("DEALER WINS!");
        } else if (playerPts > dealerPts) {
            $('#eventModal').modal('show');
            $('#eventMessage').text("PLAYER WINS!");
        } else {
            $('#eventModal').modal('show');
            $('#eventMessage').text("PUSH!");
        }
    }

  function checkBust() {
    if (dealerPts > 21) {
        $('#eventModal').modal('show');
        $('#eventMessage').text("Dealer busts! PLAYER WINS!");
    } else if (playerPts > 21) {
        $('#eventModal').modal('show');
        $('#eventMessage').text("Player busts! DEALER WINS!");
    }
  }

  function displayPoints() {
    dealerPts = calculatePoints(dealerHand).toString();
    $('#dealer-points').text(dealerPts);

    playerPts = calculatePoints(playerHand).toString();
    $('#player-points').text(playerPts);
  }

  function giveCardDealer() {
    var urlPre = '';

    var idx = getRandomIntInclusive(deck);
    var dealtCard = deck[idx];
    console.log('IDX: ' + idx);
    console.log('DECK LENGTH: ' + deck.length);
    console.log("DEALT CARD: ", dealtCard);
    dealerHand.push(dealtCard);
    var imageUrl = getCardImageUrl(dealtCard);
    var urlDeal = urlPre + imageUrl;

    console.log('URL DEALER: ' + urlDeal);
    $('#dealer-hand').append("<img class='card' src='" + urlDeal + "' />");

    // Removes the current card from the deck
    deck.splice(idx, 1);
  }

  function giveCardPlayer() {
    var urlPre = '';

    var idx = getRandomIntInclusive(deck);
    var dealtCard = deck[idx];
    playerHand.push(dealtCard);
    var imageUrl = getCardImageUrl(dealtCard);
    var urlPlayer = urlPre + imageUrl;

    console.log('URL PLAYER: ' + urlPlayer);
    $('#player-hand').append("<img class='card' src='" + urlPlayer + "' />");

    // Removes the current card from the deck
    deck.splice(idx, 1);
  }

  function getRandomIntInclusive(deck) {
    var len = deck.length - 1;
    // console.log("Deck length: " + len);
    min = Math.ceil(0);
    max = Math.floor(len);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
    return deck;
  }

  function newGame() {
      deck = newDeck();
      dealerHand = [];
      playerHand = [];
      dealerPts = 0;
      playerPts = 0;
      $('#dealer-hand').text("");
      $('#dealer-hand').append("<img class='card card-back' src='images/black_joker.png'/>");
      $(".card-back").hide();
      $('#player-hand').text("");
      $('#dealer-points').text('');
      $('#player-points').text('');
      $('#deal-button').prop('disabled', false);
      $('#hit-button').prop('disabled', true);
      $('#stand-button').prop('disabled', true);
  }

});

var grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
var gameActive = true;
var playerTurn = true;
var winningCells = "";
var displayResultEnd;
var simulateThinking;

$(".game").on("click", "td", function() {

  if ($(this).hasClass("chosen") === false && playerTurn === true && gameActive === true) {

    var cell = $(this).attr("id");
    var row = parseInt(cell[0]);
    var col = parseInt(cell[1]);

    $(this).html("<span class='x'><span class='line1'></span><span class='line2'></span></span>");

    $(this).addClass("chosen");

    grid[row][col] = false;
    playerTurn = false;

    switchLogo();

    gameActive = false;
    updateMove();
    aiMove();

  }

});

function switchLogo() {

  if (playerTurn === false) {
    $(".x-turn").removeClass("highlight");
    $(".o-turn").addClass("highlight");
  } else {
    $(".x-turn").addClass("highlight");
    $(".o-turn").removeClass("highlight");
  }

}

function getWinner(grid) {

  vals = [true, false];
  var allNotNull = true;
  for (var k = 0; k < vals.length; k++) {
    var value = vals[k];

    var diagonalComplete1 = true;
    var diagonalComplete2 = true;
    for (var i = 0; i < 3; i++) {
      if (grid[i][i] != value) {
        diagonalComplete1 = false;
      }
      if (grid[2 - i][i] != value) {
        diagonalComplete2 = false;
      }
      var rowComplete = true;
      var colComplete = true;
      for (var j = 0; j < 3; j++) {
        if (grid[i][j] != value) {
          rowComplete = false;
        }
        if (grid[j][i] != value) {
          colComplete = false;
        }
        if (grid[i][j] === null) {
          allNotNull = false;
        }
      }
      if (rowComplete || colComplete) {
        return value ? 1 : 0;
      }
    }
    if (diagonalComplete1) {
      winningCells = "d1";
      return value ? 1 : 0;
    }
    if (diagonalComplete2) {
      winningCells = "d2";
      return value ? 1 : 0;
    }
  }
  if (allNotNull) {
    return -1;
  }

  return null;
}

function updateMove() {

  simulateThinking = setTimeout(function() {
    updategrid();
  }, 1000);

  var resultText;
  var winner = getWinner(grid);

  if (winner == 1) {
    resultText = "You lost!";
    updateMoveEnd(resultText);
  }
  if (winner === 0) {
    resultText = "You won!";
    updateMoveEnd(resultText);
  }
  if (winner == -1) {
    resultText = "Tie!";
    showResult(resultText);
  }

}

function updateMoveEnd(resultText) {

  displayResultEnd = setTimeout(function() {
    updategrid();
    drawStrike();
    showResult(resultText);
  }, 1000);

}

function drawStrike() {
  var i, j;

  for (j = 0; j < 3; j++) {
    for (i = 0; i < 3; i++) {
      if (grid[j][i] !== true) break;
      if (i == 2) winningCells = "r" + j;
    }
  }

  for (j = 0; j < 3; j++) {
    for (i = 0; i < 3; i++) {
      if (grid[i][j] !== true) break;
      if (i == 2) winningCells = "c" + j;
    }
  }

  $(".game").append("<div class='strike-" + winningCells + "'></div>");

}

function showResult(resultText) {

  displayResultEnd = setTimeout(function() {
    $(".game").addClass("boardAway");
  }, 1000);

  displayResultEnd = setTimeout(function() {

    $(this).hide();
    $(".result").text(resultText).show().animate({
      margin: "100px 0 0 0",
      opacity: 1
    });

    $('.refresh').css("display", "block").hide().fadeIn();

  }, 2000);

  $(".x-turn, .o-turn").removeClass("highlight");

}

function updategrid() {

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (grid[i][j] === true) {

        if ($("#" + i + "" + j).hasClass("chosen") === false) {

          $("#" + i + "" + j).addClass("chosen");
          $("#" + i + "" + j).html("<span class='circle'><span class='pie spinner'></span><span class='pie filler'></span><span class='mask'></span></span>");

          gameActive = true;
          switchLogo();
        }
      }
    }
  }
}

function aiMove() {
  grid = minimaxMove(grid);
  console.log(numNodes);
  playerTurn = true;
  updateMove();
}

function minimaxMove(grid) {
  numNodes = 0;
  return recurseMinimax(grid, true)[1];
}

var numNodes = 0;

function recurseMinimax(grid, player) {
  numNodes++;
  var winner = getWinner(grid);
  if (winner !== null) {
    switch (winner) {
      case 1:

        return [1, grid];
      case 0:

        return [-1, grid];
      case -1:

        return [0, grid];
    }
  } else {

    var nextVal = null;
    var nextgrid = null;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (grid[i][j] === null) {
          grid[i][j] = player;
          var value = recurseMinimax(grid, !player)[0];
          if ((player && (nextVal === null || value > nextVal)) || (!player && (nextVal === null || value < nextVal))) {
            nextgrid = grid.map(function(arr) {
              return arr.slice();
            });
            nextVal = value;
          }
          grid[i][j] = null;
        }
      }
    }
    return [nextVal, nextgrid];
  }
}

$(function() {

  $(".game").addClass("boardAway");

  $(".game").css("visibility", "visible").removeClass("boardAway");
  $(".logo").fadeIn();
  $(".x-turn").addClass("highlight");

});

function playAgain() {

  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  gameActive = true;
  playerTurn = true;
  winningCells = "";
  clearTimeout(displayResultEnd);
  clearTimeout(simulateThinking);

  $('.game').html('<tbody><tr><td id="00"></td><td id="01"></td><td id="02"></td></tr><tr><td id="10"></td><td id="11"></td><td id="12"></td></tr><tr><td id="20"></td><td id="21"></td><td id="22"></td></tr></tbody>');

  $('.result, .refresh').fadeOut(function() {

    $('.result').css({
      'margin': 0,
      'opacity': 0
    });
    $('.game').removeClass('boardAway').show().addClass('boardUp').removeClass('boardUp');
    $(".x-turn").addClass("highlight");
  });

}

$('.refresh').on('click', function() {

  playAgain();

});
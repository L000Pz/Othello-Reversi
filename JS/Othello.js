var blackBack;
var gap = 3;
var cellWidth = 65;
var px = "px";
var pieceHolder;
var guide;
var turn = 1;
var scoreWhite;
var scoreBlack;
var black = 0;
var white = 0;
// // test to complition ->
// var pieces = [
//   [2, 2, 2, 1, 1, 1, 1, 1],
//   [1, 0, 2, 1, 1, 2, 2, 1],
//   [1, 0, 0, 1, 2, 1, 2, 1],
//   [1, 2, 2, 2, 1, 2, 1, 1],
//   [1, 1, 2, 1, 2, 1, 2, 1],
//   [1, 2, 2, 2, 1, 2, 1, 1],
//   [1, 2, 2, 1, 2, 1, 2, 1],
//   [1, 1, 2, 1, 1, 1, 1, 0],
// ];
// test to draw ->
//   var pieces = [
//   [0, 0, 2, 0, 0, 0, 0, 0],
//   [0, 0, 2, 0, 0, 0, 0, 0],
//   [1, 0, 0, 0, 0, 0, 0, 0],
//   [1, 2, 2, 0, 0, 0, 0, 0],
//   [1, 0, 2, 0, 0, 0, 0, 0],
//   [0, 0, 2, 0, 0, 0, 0, 0],
//   [0, 0, 2, 0, 0, 0, 0, 0],
//   [0, 0, 2, 0, 0, 0, 0, 0],
// ];

var pieces = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

window.onload = function () {
  scoreWhite = document.getElementById("scoreWhite");
  scoreBlack = document.getElementById("scoreBlack");
  guide = document.getElementById("guide");
  blackBack = document.getElementById("blackBack");
  pieceHolder = document.getElementById("pieceHolder");
  blackBack.style.width = cellWidth * 8 + gap * 9 + px;
  blackBack.style.height = cellWidth * 8 + gap * 9 + px;
  drawGreenSquares();
  placePiece();
  showGuide();
  newScore();
};

function drawGreenSquares() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var greenSq = document.createElement("div");
      greenSq.style.position = "absolute";
      greenSq.style.width = cellWidth + px;
      greenSq.style.height = cellWidth + px;
      greenSq.style.borderRadius = "10%";
      greenSq.style.backgroundColor = "green";
      greenSq.style.marginLeft = (cellWidth + gap) * col + gap + px;
      greenSq.style.marginTop = (cellWidth + gap) * row + gap + px;
      greenSq.setAttribute("onclick", "clickedSquare(" + row + "," + col + ")");
      blackBack.appendChild(greenSq);
    }
  }
}

function clickedSquare(row, col) {
  if (pieces[row][col] != 0) {
    return;
  }
  if (available(turn, row, col)) {
    var affected = getAffected(turn, row, col);
    flip(affected);

    pieces[row][col] = turn;
    if (turn == 1 && canMove(2)) turn = 2;
    else if (turn == 2 && canMove(1)) turn = 1;
    else {
    }
    placePiece();
    showGuide();
    newScore();
  }
  gameOver();
}

function gameOver() {
  if (AreYouStillThere() == false) {
    alert("game over");
    if (black > white) {
      alert("Black Won!!");
    } else alert("White Won!!");
    if (confirm("do you want to play again?") == true) {
      pieces = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];
      turn = 1;
      document.getElementById("pieceHolder").innerHTML = "";
      placePiece();
      showGuide();
    } else return;
  }
}

function canMove(id) {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      if (available(id, row, col)) {
        return true;
      }
    }
  }
  return false;
}

function newScore() {
  black = 0;
  white = 0;
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var num = pieces[row][col];
      if (num == 1) black += 1;
      else if (num == 2) white += 1;
    }
  }
  scoreBlack.innerHTML = "Black: " + black;
  scoreWhite.innerHTML = "White: " + white;
}

function available(id, row, col) {
  var affected = getAffected(id, row, col);
  if (affected.length == 0) {
    return false;
  } else {
    return true;
  }
}

function AreYouStillThere() {
  var num = 0;
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var spotvalue = pieces[row][col];
      if (spotvalue == 1 || spotvalue == 2) {
        num += 1;
      }
    }
  }
  if (num == 64) {
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        if (available(turn, row, col) == false) {
          return false;
        }
      }
    }
  } else return true;
}

function getAffected(id, row, col) {
  var affected = [];
  //to the right
  var couldBeAffected = [];
  var colseeker = col;
  while (colseeker < 7) {
    colseeker += 1;
    var spotvalue = pieces[row][colseeker];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: row, col: colseeker };
      couldBeAffected.push(pieceLoc);
    }
  }
  //to the left
  var couldBeAffected = [];
  var colseeker = col;
  while (colseeker > 0) {
    colseeker -= 1;
    var spotvalue = pieces[row][colseeker];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: row, col: colseeker };
      couldBeAffected.push(pieceLoc);
    }
  }
  //above
  var couldBeAffected = [];
  var rowseeker = row;
  while (rowseeker > 0) {
    rowseeker -= 1;
    var spotvalue = pieces[rowseeker][col];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: rowseeker, col: col };
      couldBeAffected.push(pieceLoc);
    }
  }
  //below
  var couldBeAffected = [];
  var rowseeker = row;
  while (rowseeker < 7) {
    rowseeker += 1;
    var spotvalue = pieces[rowseeker][col];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: rowseeker, col: col };
      couldBeAffected.push(pieceLoc);
    }
  }
  //down right
  var couldBeAffected = [];
  var rowseeker = row;
  var colseeker = col;
  while (rowseeker < 7 && colseeker < 7) {
    rowseeker += 1;
    colseeker += 1;
    var spotvalue = pieces[rowseeker][colseeker];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: rowseeker, col: colseeker };
      couldBeAffected.push(pieceLoc);
    }
  }
  //down left
  var couldBeAffected = [];
  var rowseeker = row;
  var colseeker = col;
  while (rowseeker < 7 && colseeker > 0) {
    rowseeker += 1;
    colseeker -= 1;
    var spotvalue = pieces[rowseeker][colseeker];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: rowseeker, col: colseeker };
      couldBeAffected.push(pieceLoc);
    }
  }
  //up left
  var couldBeAffected = [];
  var rowseeker = row;
  var colseeker = col;
  while (rowseeker > 0 && colseeker > 0) {
    rowseeker -= 1;
    colseeker -= 1;
    var spotvalue = pieces[rowseeker][colseeker];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: rowseeker, col: colseeker };
      couldBeAffected.push(pieceLoc);
    }
  }
  //up right
  var couldBeAffected = [];
  var rowseeker = row;
  var colseeker = col;
  while (rowseeker > 0 && colseeker < 7) {
    rowseeker -= 1;
    colseeker += 1;
    var spotvalue = pieces[rowseeker][colseeker];
    if (spotvalue == 0 || spotvalue == id) {
      if (spotvalue == id) {
        affected = affected.concat(couldBeAffected);
      }
      break;
    } else {
      var pieceLoc = { row: rowseeker, col: colseeker };
      couldBeAffected.push(pieceLoc);
    }
  }

  return affected;
}

function flip(affected) {
  for (var i = 0; i < affected.length; i++) {
    var spot = affected[i];
    if (pieces[spot.row][spot.col] == 1) {
      pieces[spot.row][spot.col] = 2;
    } else {
      pieces[spot.row][spot.col] = 1;
    }
  }
}

function placePiece() {
  pieceHolder.innerHtml = "";
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var num = pieces[row][col];
      if (num == 0) {
      } else {
        var piece = document.createElement("div");
        piece.style.position = "absolute";
        piece.style.width = cellWidth - 6 + px;
        piece.style.height = cellWidth - 6 + px;
        piece.style.borderRadius = "60%";
        piece.style.marginLeft = (cellWidth + gap) * col + gap + 3 + px;
        piece.style.marginTop = (cellWidth + gap) * row + gap + 3 + px;

        if (num == 1) {
          piece.style.backgroundColor = "black";
        }
        if (num == 2) {
          piece.style.backgroundColor = "white";
        }
        pieceHolder.appendChild(piece);
      }
    }
  }
}

function showGuide() {
  document.getElementById("guide").innerHTML = "";
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var num = pieces[row][col];
      if (num == 0 && available(turn, row, col)) {
        var shadow = document.createElement("div");
        shadow.style.position = "absolute";
        shadow.style.width = cellWidth - 8 + px;
        shadow.style.height = cellWidth - 8 + px;
        shadow.style.borderRadius = "60%";
        shadow.style.marginLeft = (cellWidth + gap) * col + gap + 3 + px;
        shadow.style.marginTop = (cellWidth + gap) * row + gap + 3 + px;
        shadow.style.zIndex = 2;
        shadow.setAttribute(
          "onclick",
          "clickedSquare(" + row + "," + col + ")"
        );
        if (turn == 1) {
          shadow.style.border = "2px solid black";
        }
        if (turn == 2) {
          shadow.style.border = "2px solid white";
        }
        guide.appendChild(shadow);
      }
    }
  }
}

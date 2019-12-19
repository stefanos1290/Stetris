const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const scoreElem = document.getElementById("scoreNum");

$(function() {
  $("#gameOver").hide();
});
$(function() {
  $("#playAgain").hide();
});

$(function() {
  $("#playAgain").on("click", function() {
    location.reload(true);
  });
});

$(function() {
  $("#startButton").on("click", function() {
    $("#start").hide();

    $("#timer")
      .hide()
      .delay(300)
      .fadeIn()
      .fadeOut(700);

    $("#timer2")
      .hide()
      .delay(1300)
      .fadeIn()
      .fadeOut(700);

    $("#timer3")
      .hide()
      .delay(2300)
      .fadeIn()
      .fadeOut(700);

    setTimeout(() => {
      drop();
    }, 4000);

    $(function() {
      $("#welcomeCard")
        .hide()
        .delay(5000)
        .slideDown();
      $("#close").on("click", function() {
        $("#welcomeCard").hide();
      });
    });
    $(function() {
      $("#textWelcome")
        .hide()
        .delay(5000)
        .slideDown();
      $("#close").on("click", function() {
        $("#textWelcome").hide();
      });
    });
  });
});

const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
  ]
];

const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ]
];

const J = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ]
];

const T = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ]
];

const L = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ]
];

const I = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ]
];

const O = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ]
];

const row = 20;
const column = 10;
const vacant = "black"; // color of empty sqare
const sq = 30; //sqare 20px

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * sq, y * sq, sq, sq);
  ctx.strokeStyle = "white";
  ctx.strokeRect(x * sq, y * sq, sq, sq);
}

let gameBoard = [];

for (let r = 0; r < row; r++) {
  gameBoard[r] = [];
  for (let c = 0; c < column; c++) {
    gameBoard[r][c] = vacant; //create the gameboard
  }
}

function drawGameBoard() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      drawSquare(c, r, gameBoard[r][c]); //draw the gameboard
    }
  }
}
drawGameBoard();

const pieces = [
  [S, "yellow"],
  [Z, "red"],
  [J, "orange"],
  [T, "cyan"],
  [L, "blue"],
  [I, "green"],
  [O, "purple"]
];
let score = 0;

function randomPiece() {
  let random = (randomNum = Math.floor(Math.random() * pieces.length));
  return new Piece(pieces[random][0], pieces[random][1]);
}
let p = randomPiece();

function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;
  this.tetrominoNum = 0;
  this.currentTetromino = this.tetromino[this.tetrominoNum];
  this.x = 3;
  this.y = -2;

  this.draw = function() {
    for (let r = 0; r < this.currentTetromino.length; r++) {
      for (let c = 0; c < this.currentTetromino.length; c++) {
        if (this.currentTetromino[r][c]) {
          drawSquare(this.x + c, this.y + r, this.color);
        }
      }
    }
  };

  this.unDraw = function() {
    for (let r = 0; r < this.currentTetromino.length; r++) {
      for (let c = 0; c < this.currentTetromino.length; c++) {
        if (this.currentTetromino[r][c]) {
          drawSquare(this.x + c, this.y + r, vacant);
        }
      }
    }
  };

  this.moveDown = function() {
    if (!this.collision(0, 1, this.currentTetromino)) {
      this.unDraw();
      this.y++;
      this.draw();
    } else {
      //lock the piece and generate a new one
      this.lockPieces();
      p = randomPiece();
    }
  };

  this.moveRight = function() {
    if (!this.collision(1, 0, this.currentTetromino)) {
      this.unDraw();
      this.x++;
      this.draw();
    }
  };

  this.moveLeft = function() {
    if (!this.collision(-1, 0, this.currentTetromino)) {
      this.unDraw();
      this.x--;
      this.draw();
    }
  };

  this.rotate = function() {
    let next = this.tetromino[(this.tetrominoNum + 1) % this.tetromino.length];
    let kick = 0;
    if (this.collision(0, 0, next)) {
      if (this.x > column / 2) {
        //right wall
        kick = -1; //move to the left
      } else {
        //left wall
        kick = +1; //move to the right
      }
    }
    if (!this.collision(kick, 0, next)) {
      this.unDraw();
      this.x += kick;
      this.tetrominoNum = (this.tetrominoNum + 1) % this.tetromino.length;
      this.currentTetromino = this.tetromino[this.tetrominoNum];
      this.draw();
    }
  };

  this.collision = function(x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece.length; c++) {
        if (!piece[r][c]) {
          continue;
        }
        let newX = this.x + c + x;
        let newY = this.y + r + y;
        if (newX < 0 || newX >= column || newY >= row) {
          return true;
        }
        if (newY < 0) {
          continue;
        }
        if (gameBoard[newY][newX] !== vacant) {
          return true;
        }
      }
    }
    return false;
  };

  this.lockPieces = function() {
    for (let r = 0; r < this.currentTetromino.length; r++) {
      for (let c = 0; c < this.currentTetromino.length; c++) {
        //skip ofkera koutouthkia
        if (!this.currentTetromino[r][c]) {
          continue;
        }
        if (this.y + r < 0) {
          $(function() {
            $("#gameOver").fadeIn();
          });
          $(function() {
            $("#playAgain").fadeIn();
          });
          gameOver = true;
          break;
        }
        gameBoard[this.y + r][this.x + c] = this.color;
      }
    }
    for (let r = 0; r < row; r++) {
      let isRowFull = true;
      for (c = 0; c < column; c++) {
        isRowFull = isRowFull && gameBoard[r][c] != vacant;
      }
      if (isRowFull) {
        for (y = r; y > 1; y--) {
          for (c = 0; c < column; c++) {
            gameBoard[y][c] = gameBoard[y - 1][c];
          }
        }
        for (c = 0; c < column; c++) {
          gameBoard[0][c] = vacant;
        }
        score += 10;
      }
    }
    drawGameBoard();
    scoreElem.innerHTML = score;
  };
}
document.addEventListener("keydown", controlTetrominos);
function controlTetrominos(e) {
  if (e.keyCode === 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (e.keyCode === 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (e.keyCode === 40) {
    p.moveDown();
    dropStart = Date.now();
  } else if (e.keyCode === 38) {
    p.rotate();
    dropStart = Date.now();
  }
}

let dropStart = Date.now();
let gameOver = false;
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 700) {
    p.moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

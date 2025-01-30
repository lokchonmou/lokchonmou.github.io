var boardWidth;
var board;
var currentPlayer;
var cellSize;
var gameOver;
var winner;

function setup() {
  boardWidth = displayWidth - 100; // 螢幕寬度 - 100
  createCanvas(boardWidth, boardWidth + 100); // 建立畫布，增加100像素高度用於顯示獲勝者和重置按鈕
  noLoop(); // 只畫一次
  resetGame();
}

function draw() {
  background(0); // 黑色背景
  strokeWeight(12); // 線條粗細
  drawingContext.shadowBlur = 20; // 發光效果

  // 畫 Tic Tac Toe 的格子
  for (let i = 1; i < 3; i++) {
    stroke(255); // 白色線條
    drawingContext.shadowColor = 'white'; // 發光顏色
    line(i * cellSize, 0, i * cellSize, boardWidth);
    line(0, i * cellSize, boardWidth, i * cellSize);
  }

  // 畫 X 和 O
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      let spot = board[i][j];
      drawMark(spot, x, y);
    }
  }

  // 顯示獲勝者或打和
  if (gameOver) {
    textSize(80);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    if (winner) {
      text(winner + ' wins!', boardWidth / 2, boardWidth / 2 - 50);
    } else {
      text('Draw!', boardWidth / 2, boardWidth / 2 - 50);
    }
    drawResetButton();
  }
}

function drawMark(spot, x, y) {
  textSize(32);
  let r = cellSize / 2;
  if (spot == 'X') {
    stroke('blue'); // 藍色線條
    drawingContext.shadowColor = 'blue'; // 發光顏色
    drawingContext.shadowBlur = 100; // 發光效果
    line(x + r / 2, y + r / 2, x + r * 1.5, y + r * 1.5);
    line(x + r * 1.5, y + r / 2, x + r / 2, y + r * 1.5);
  } else if (spot == 'O') {
    stroke('red'); // 紅色線條
    drawingContext.shadowColor = 'red'; // 發光顏色
    drawingContext.shadowBlur = 100; // 發光效果
    noFill();
    ellipse(x + r, y + r, r);
  }
}

function mousePressed() {
  if (gameOver) {
    if (mouseX > boardWidth / 2 - 150 && mouseX < boardWidth / 2 + 150 && mouseY > boardWidth / 2 && mouseY < boardWidth / 2 + 50) {
      resetGame();
      redraw();
    }
    return;
  }
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (board[i][j] == '') {
    board[i][j] = currentPlayer;
    if (checkWinner(currentPlayer)) {
      gameOver = true;
      winner = currentPlayer;
    } else if (isBoardFull()) {
      gameOver = true;
      winner = null;
    } else {
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
      if (currentPlayer == 'X') {
        aiMove();
      }
    }
    redraw();
  }
}

function checkWinner(player) {
  // 檢查行
  for (let i = 0; i < 3; i++) {
    if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
      return true;
    }
  }
  // 檢查列
  for (let j = 0; j < 3; j++) {
    if (board[0][j] == player && board[1][j] == player && board[2][j] == player) {
      return true;
    }
  }
  // 檢查對角線
  if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
    return true;
  }
  if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
    return true;
  }
  return false;
}

function isBoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        return false;
      }
    }
  }
  return true;
}

function drawResetButton() {
  stroke(255); // 白色線條
  drawingContext.shadowColor = 'white'; // 發光顏色
  drawingContext.shadowBlur = 100; // 發光效果
  fill(0);
  rect(boardWidth / 2 - 150, boardWidth / 2, 300, 50, 10);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Reset', boardWidth / 2, boardWidth / 2 + 25);
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'O'; // 第一個玩家是 O
  cellSize = boardWidth / 3;
  gameOver = false;
  winner = '';
  redraw();
}

function aiMove() {
  let bestScore = -Infinity;
  let move;
  let moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        board[i][j] = 'X';
        let score = minimax(board, 0, false, -Infinity, Infinity);
        board[i][j] = '';
        moves.push({ score, move: { i, j } });
      }
    }
  }
  // 隨機選擇一個最佳步驟
  moves.sort((a, b) => b.score - a.score);
  let bestMoves = moves.filter(m => m.score === moves[0].score);
  move = random(bestMoves).move;

  board[move.i][move.j] = 'X';
  if (checkWinner('X')) {
    gameOver = true;
    winner = 'X';
  } else if (isBoardFull()) {
    gameOver = true;
    winner = null;
  } else {
    currentPlayer = 'O';
  }
  redraw();
}

function minimax(board, depth, isMaximizing, alpha, beta) {
  if (checkWinner('X')) {
    return 10 ** (10 - depth);
  }
  if (checkWinner('O')) {
    return -(10 ** (10 - depth));
  }
  if (isBoardFull()) {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = 'X';
          let eval = minimax(board, depth + 1, false, alpha, beta);
          board[i][j] = '';
          maxEval = max(maxEval, eval);
          alpha = max(alpha, eval);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = 'O';
          let eval = minimax(board, depth + 1, true, alpha, beta);
          board[i][j] = '';
          minEval = min(minEval, eval);
          beta = min(beta, eval);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return minEval;
  }
}
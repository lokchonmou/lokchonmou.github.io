let buttons = [];
let centerLight;
let gameState = 'waiting'; // 'waiting', 'playing', 'correct', 'wrong', 'gameover'
let score = 0;
let currentColor = -1;
let startTime = 0;
let reactionTime = 0;
let roundCount = 0;
let maxRounds = 10;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('script-display');
  // 創建四個按鈕：左上(紅), 左下(綠), 右上(藍), 右下(黃)
  buttons.push(new Button(150, 150, color(255, 0, 0), 'red'));      // 左上 - 紅
  buttons.push(new Button(150, 450, color(0, 255, 0), 'green'));    // 左下 - 綠
  buttons.push(new Button(450, 150, color(0, 0, 255), 'blue'));     // 右上 - 藍
  buttons.push(new Button(450, 450, color(255, 255, 0), 'white')); // 右下 - 黃
  
  // 中間的燈
  centerLight = new CenterLight(300, 300);
}

function draw() {
  background(50);
  
  // 顯示所有按鈕
  for (let btn of buttons) {
    btn.display();
  }
  
  // 顯示中間的燈
  centerLight.display();
  
  // 顯示分數、回合數和反應時間
  fill(255);
  textSize(20);
  textAlign(LEFT);
  noStroke();
  text('分數: ' + score, 20, 40);
  text('回合: ' + roundCount + '/' + maxRounds, 20, 70);
  
  if (reactionTime > 0) {
    textAlign(RIGHT);
    text('反應時間: ' + reactionTime + 'ms', width - 20, 40);
  }
  
  // 顯示遊戲狀態提示
  textAlign(CENTER);
  if (gameState === 'waiting') {
    textSize(24);
    text('準備開始？', width / 2, height / 2 - 30);
    textSize(16);
    text('按任意按鈕開始遊戲', width / 2, height / 2 + 10);
  } else if (gameState === 'playing') {
    textSize(18);
    text('按下相同顏色的按鈕！', width / 2, height - 30);
  } else if (gameState === 'correct') {
    textSize(24);
    fill(0, 255, 0);
    text('正確！', width / 2, height - 60);
  } else if (gameState === 'wrong') {
    textSize(24);
    fill(255, 0, 0);
    text('錯誤！', width / 2, height - 60);
  } else if (gameState === 'gameover') {
    textSize(32);
    fill(255, 255, 0);
    text('遊戲結束!', width / 2, height / 2 - 50);
    textSize(24);
    fill(255);
    text('最終分數: ' + score + '/' + maxRounds, width / 2, height / 2);
    if (score > 0) {
      text('平均反應時間: ' + floor(score > 0 ? reactionTime / roundCount * score : 0) + 'ms', width / 2, height / 2 + 40);
    }
    textSize(16);
    text('按任意按鈕重新開始', width / 2, height / 2 + 80);
  }
}

function mousePressed() {
  if (gameState === 'waiting' || gameState === 'gameover') {
    // 開始新遊戲
    startNewGame();
    return;
  }
  
  if (gameState === 'playing') {
    // 計算反應時間
    let responseTime = millis() - startTime;
    
    // 檢查玩家按了哪個按鈕
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].isClicked(mouseX, mouseY)) {
        // 檢查是否按對了
        if (i === currentColor) {
          // 正確！
          score++;
          reactionTime = responseTime;
          gameState = 'correct';
          
          // 1秒後進入下一回合
          setTimeout(() => {
            if (roundCount < maxRounds) {
              nextRound();
            } else {
              gameState = 'gameover';
              centerLight.turnOff();
            }
          }, 1000);
        } else {
          // 錯誤！
          gameState = 'wrong';
          centerLight.lightUp(color(255, 0, 0)); // 紅燈表示錯誤
          
          // 1.5秒後進入下一回合或結束
          setTimeout(() => {
            if (roundCount < maxRounds) {
              nextRound();
            } else {
              gameState = 'gameover';
              centerLight.turnOff();
            }
          }, 1500);
        }
        break;
      }
    }
  }
}

function startNewGame() {
  score = 0;
  roundCount = 0;
  reactionTime = 0;
  nextRound();
}

function nextRound() {
  roundCount++;
  
  // 隨機選擇一個顏色
  currentColor = floor(random(4));
  
  // 等待隨機時間後點亮 (500-2000ms)
  let waitTime = random(500, 2000);
  gameState = 'waiting';
  centerLight.turnOff();
  
  setTimeout(() => {
    // 點亮中間的燈
    centerLight.lightUp(buttons[currentColor].col);
    gameState = 'playing';
    startTime = millis();
  }, waitTime);
}

// 按鈕類別
class Button {
  constructor(x, y, col, name) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.name = name;
    this.radius = 60;
  }
  
  display() {
    fill(this.col);
    stroke(255);
    strokeWeight(3);
    circle(this.x, this.y, this.radius * 2);
  }
  
  isClicked(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < this.radius;
  }
}

// 中間燈的類別
class CenterLight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.currentColor = color(100);
    this.isLit = false;
  }
  
  display() {
    if (this.isLit) {
      fill(this.currentColor);
      stroke(255);
      strokeWeight(3);
    } else {
      fill(100);
      stroke(200);
      strokeWeight(2);
    }
    circle(this.x, this.y, this.radius * 2);
  }
  
  lightUp(col) {
    this.currentColor = col;
    this.isLit = true;
  }
  
  turnOff() {
    this.isLit = false;
    this.currentColor = color(100);
  }
}

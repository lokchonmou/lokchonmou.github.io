let buttons = [];
let centerLight;
let sequence = [];
let playerSequence = [];
let gameState = 'waiting'; // 'waiting', 'showing', 'playing', 'gameover'
let currentStep = 0;
let showDelay = 600;
let showTimer = 0;
let score = 0;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('script-display');
  // 創建四個按鈕：左上(紅), 左下(綠), 右上(藍), 右下(白)
  buttons.push(new Button(150, 150, color(255, 0, 0), 'red'));      // 左上 - 紅
  buttons.push(new Button(150, 450, color(0, 255, 0), 'green'));    // 左下 - 綠
  buttons.push(new Button(450, 150, color(0, 0, 255), 'blue'));     // 右上 - 藍
  buttons.push(new Button(450, 450, color(255, 255, 255), 'white')); // 右下 - 白
  
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
  
  // 顯示分數和狀態
  fill(255);
  textSize(24);
  textAlign(CENTER);
  noStroke();
  text('分數: ' + score, width / 2, 50);
  
  if (gameState === 'waiting') {
    textSize(16);
    text('按任意按鈕開始遊戲', width / 2, height - 30);
  } else if (gameState === 'gameover') {
    textSize(32);
    fill(255, 0, 0);
    text('遊戲結束!', width / 2, height / 2);
    textSize(16);
    fill(255);
    text('按任意按鈕重新開始', width / 2, height - 30);
  }
  
  // 處理顯示序列的邏輯
  if (gameState === 'showing') {
    if (millis() - showTimer > showDelay) {
      if (currentStep < sequence.length) {
        // 顯示當前步驟的顏色
        centerLight.lightUp(buttons[sequence[currentStep]].col);
        currentStep++;
        showTimer = millis();
      } else {
        // 顯示完畢，等待玩家輸入
        centerLight.turnOff();
        gameState = 'playing';
        currentStep = 0;
      }
    }
  }
}

function mousePressed() {
  if (gameState === 'waiting' || gameState === 'gameover') {
    // 開始新遊戲
    startNewGame();
    return;
  }
  
  if (gameState === 'playing') {
    // 檢查玩家按了哪個按鈕
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].isClicked(mouseX, mouseY)) {
        // 玩家按了按鈕
        playerSequence.push(i);
        centerLight.lightUp(buttons[i].col);
        
        // 檢查是否正確
        if (playerSequence[currentStep] !== sequence[currentStep]) {
          // 錯誤，遊戲結束
          gameState = 'gameover';
          centerLight.lightUp(color(255, 0, 0)); // 紅燈表示錯誤
        } else {
          currentStep++;
          
          // 檢查是否完成整個序列
          if (currentStep >= sequence.length) {
            // 完成這一輪，增加分數並開始新一輪
            score++;
            setTimeout(() => {
              nextRound();
            }, 1000);
          } else {
            setTimeout(() => {
              centerLight.turnOff();
            }, 300);
          }
        }
        break;
      }
    }
  }
}

function startNewGame() {
  sequence = [];
  playerSequence = [];
  score = 0;
  nextRound();
}

function nextRound() {
  playerSequence = [];
  currentStep = 0;
  
  // 添加一個隨機顏色到序列
  sequence.push(floor(random(4)));
  
  // 開始顯示序列
  gameState = 'showing';
  showTimer = millis();
  centerLight.turnOff();
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

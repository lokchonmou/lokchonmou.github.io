// ===================================
// p5.js 搶答機 (Buzzer System)
// 採用 React 風格的狀態管理模式
// ===================================

// --- 狀態 (State) ---
// 'none', 'red', 'green', 'blue'
// 這是唯一的 "Single Source of Truth"，決定了整個 App 的顯示和行為
let lockedColor = 'none';

// --- 組件屬性 (Component Props) ---
let btnY, ledY;
let btnWidth = 100;
let btnHeight = 50;
let ledRadius = 30;

// --- 顏色 (Theme/Style) ---
let colors = {};

function setup() {
  createCanvas(500, 500); // 創建畫布

  // 設定繪圖模式（類似 CSS 的 box-sizing）
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  // 初始化位置
  btnY = height / 4;
  ledY = height * 3 / 4;

  // 定義顏色主題
  colors = {
    red: color(255, 65, 54),     // #FF4136
    green: color(46, 204, 64),   // #2ECC40
    blue: color(0, 116, 217),    // #0074D9
    white: color(240, 240, 240),
    background: color(30),       // 深色背景
    disabled: color(100),      // 按鈕禁用時的顏色
    ledOff: color(50, 50, 50)    // LED 熄滅時的顏色
  };
}

// ===================================
// 渲染迴圈 (Render Loop - 類似 React 的 render())
// ===================================
function draw() {
  // 1. 繪製背景 (清除畫布)
  background(colors.background);

  // 2. 渲染標題
  drawTitle();

  // 3. 渲染按鈕組件
  drawAllButtons();

  // 4. 渲染 LED 組件
  drawAllLEDs();
}

// ===================================
// 組件 (Components)
// ===================================

/**
 * 繪製標題
 */
function drawTitle() {
  noStroke();
  fill(255);
  textSize(32);
  text('搶答機', width / 2, 60);
}

/**
 * 繪製所有按鈕的容器
 */
function drawAllButtons() {
  let spacing = width / 4; // 按鈕間距
  let isLocked = (lockedColor !== 'none'); // 檢查系統是否已鎖定

  // 根據 'isLocked' 狀態傳遞 'enabled' 屬性
  drawButton(spacing * 1, btnY, 'Red', colors.red, !isLocked);
  drawButton(spacing * 2, btnY, 'Green', colors.green, !isLocked);
  drawButton(spacing * 3, btnY, 'Blue', colors.blue, !isLocked);
  drawButton(width/2, height/2, 'Reset', colors.white, true); // Reset 按鈕永遠啟用
}

/**
 * 繪製單個按鈕 (可重用組件)
 * @param {number} x - x 座標
 * @param {number} y - y 座標
 * @param {string} label - 按鈕文字
 * @param {p5.Color} baseColor - 按鈕的基本顏色
 * @param {boolean} enabled - 按鈕是否啟用
 */
function drawButton(x, y, label, baseColor, enabled) {
  let currentFill;
  let isHovering = isMouseOver(x, y, btnWidth, btnHeight);

  // 根據狀態決定按鈕顏色
  if (!enabled) {
    currentFill = colors.disabled;
  } else if (isHovering) {
    // 懸停 (hover) 效果：顏色變亮
    currentFill = lerpColor(baseColor, color(255), 0.3);
  } else {
    currentFill = baseColor;
  }

  // 繪製按鈕
  noStroke();
  fill(currentFill);
  rect(x, y, btnWidth, btnHeight, 10); // 10px 圓角

  // 繪製文字
  fill(baseColor === colors.white ? 0 : 255); // 白色按鈕用黑色字，其他用白色字
  textSize(16);
  text(label, x, y);
}

/**
 * 繪製所有 LED 的容器
 */
function drawAllLEDs() {
  let spacing = width / 4; // LED 間距

  // 根據 'lockedColor' 狀態傳遞 'isOn' 屬性
  drawLED(spacing * 1, ledY, colors.red, (lockedColor === 'red'));
  drawLED(spacing * 2, ledY, colors.green, (lockedColor === 'green'));
  drawLED(spacing * 3, ledY, colors.blue, (lockedColor === 'blue'));
}

/**
 * 繪製單個 LED (可重用組件)
 * @param {number} x - x 座標
 * @param {number} y - y 座標
 * @param {p5.Color} baseColor - LED 的顏色
 * @param {boolean} isOn - LED 是否亮起
 */
function drawLED(x, y, baseColor, isOn) {
  // 為了實現 "輝光" 效果，我們需要暫時重置 p5.js 的陰影
  // 這是 p5.js 訪問底層 2D context 的一種方式
  drawingContext.shadowBlur = 0;
  
  if (isOn) {
    // --- 亮起狀態 ---
    // 1. 設置輝光 (Glow) 效果
    drawingContext.shadowBlur = 35;
    drawingContext.shadowColor = baseColor;

    // 2. 繪製亮的 LED
    fill(baseColor);
    noStroke();
    circle(x, y, ledRadius * 2); // ledRadius 是半徑，circle() 函式需要直徑

    // 3. 重置陰影，避免影響其他元素
    drawingContext.shadowBlur = 0;
    
  } else {
    // --- 熄滅狀態 ---
    fill(colors.ledOff);
    stroke(80); // 加上一個暗的邊框
    strokeWeight(2);
    circle(x, y, ledRadius * 2);
  }
}

// ===================================
// 事件處理 (Event Handlers)
// 這裡只負責 "更新狀態"，不負責繪圖
// ===================================

function mouseClicked() {
  let btnSpacing = width / 4;
  let ledSpacing = width / 4;

  // --- 狀態更新邏輯 ---

  // 1. 檢查顏色按鈕
  // 只有在 'lockedColor' 為 'none' (未鎖定) 時才檢查
  if (lockedColor === 'none') {
    if (isMouseOver(btnSpacing * 1, btnY, btnWidth, btnHeight)) {
      lockedColor = 'red'; // 更新狀態
    } else if (isMouseOver(btnSpacing * 2, btnY, btnWidth, btnHeight)) {
      lockedColor = 'green'; // 更新狀態
    } else if (isMouseOver(btnSpacing * 3, btnY, btnWidth, btnHeight)) {
      lockedColor = 'blue'; // 更新狀態
    }
  }

  // 2. 檢查重置按鈕 (永遠檢查)
  if (isMouseOver(width/2, height/2, btnWidth, btnHeight)) {
    lockedColor = 'none'; // 更新狀態
  }
}

// ===================================
// 輔助函式 (Utility Functions)
// ===================================

/**
 * 檢查滑鼠是否在一個以 (x, y) 為中心的矩形內
 * @param {number} x - 矩形中心 x
 * @param {number} y - 矩形中心 y
 * @param {number} w - 矩形寬度
 * @param {number} h - 矩形高度
 * @returns {boolean}
 */
function isMouseOver(x, y, w, h) {
  let halfW = w / 2;
  let halfH = h / 2;
  return (
    mouseX > x - halfW &&
    mouseX < x + halfW &&
    mouseY > y - halfH &&
    mouseY < y + halfH
  );
}

/**
 * 當視窗大小改變時，重新調整畫布和元素位置
 */
function windowResized() {
  resizeCanvas(windowWidth, 500);
  // 重新計算 y 座標
  btnY = height / 4;
  ledY = height * 3 / 4;
}
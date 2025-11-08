var buttons = [];
var buttonStates = []; // 記錄每個按鈕的狀態 (true = 亮, false = 暗)
var cols = 5; // 列數
var rows = 8; // 行數
var resetButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayDensity(pixelDensity);
  noLoop(); // 不需要重複繪圖
  
  createButtons();
}

function createButtons() {
  // 清除舊按鈕
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].remove();
  }
  if (resetButton) {
    resetButton.remove();
  }
  
  buttons = [];
  buttonStates = [];
  
  background(50);
  // add a title in middle
  fill(255);
  var titleSize = min(windowWidth / 15, 32);
  textSize(titleSize);
  textAlign(CENTER);
  var titleHeight = titleSize * 2.5; // 增加 title padding
  text("點名器", windowWidth / 2, titleHeight / 2 + titleSize / 2);
  
  // 計算可用空間
  var resetButtonHeight = min(windowHeight / 12, 60);
  var availableHeight = windowHeight - titleHeight - resetButtonHeight;
  
  // 計算每個按鈕的寬度和高度
  var buttonWidth = windowWidth / cols;
  var buttonHeight = availableHeight / rows;
  
  // 計算按鈕內部的實際大小（留一些間距）
  var gap = min(buttonWidth, buttonHeight) * 0.2; // 增加按鈕間的 padding
  var actualWidth = buttonWidth - gap;
  var actualHeight = buttonHeight - gap;
  
  // create a 5x8 button grid
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var index = j * cols + i;
      buttons.push(createButton(str(index + 1)));
      buttonStates.push(false); // 初始狀態為暗
      
      var x = i * buttonWidth + gap / 2;
      var y = titleHeight + j * buttonHeight + gap / 2;
      
      buttons[buttons.length - 1].position(x, y);
      
      // 設定按鈕樣式 - 使用寬度和高度
      buttons[buttons.length - 1].style("width", actualWidth + "px");
      buttons[buttons.length - 1].style("height", actualHeight + "px");
      buttons[buttons.length - 1].style("font-size", min(actualWidth, actualHeight) * 0.4 + "px");
      buttons[buttons.length - 1].style("background-color", "#003677ff");
      buttons[buttons.length - 1].style("color", "#6dafffff");
      buttons[buttons.length - 1].style("border", "2px solid #003677ff");
      buttons[buttons.length - 1].style("border-radius", "8px");
      buttons[buttons.length - 1].style("cursor", "pointer");
      
      // 使用閉包來保存當前的 index
      (function(idx) {
        buttons[idx].mousePressed(function() {
          toggleButton(idx);
        });
      })(buttons.length - 1);
    }
  }
  
  // create a reset button, once clicked, all buttons will be reset to dark
  resetButton = createButton("Reset");
  var resetWidth = min(windowWidth * 0.3, 150);
  resetButton.position((windowWidth - resetWidth) / 2, windowHeight - resetButtonHeight + gap / 2);
  resetButton.style("width", resetWidth + "px");
  resetButton.style("height", (resetButtonHeight - gap) + "px");
  resetButton.style("font-size", resetButtonHeight * 0.3 + "px");
  resetButton.style("background-color", "#4CAF50");
  resetButton.style("color", "white");
  resetButton.style("border", "none");
  resetButton.style("border-radius", "5px");
  resetButton.style("cursor", "pointer");
  resetButton.mousePressed(function () {
    for (var i = 0; i < buttons.length; i++) {
      buttonStates[i] = false;
      buttons[i].style("background-color", "#374565ff");
      buttons[i].style("color", "#007bffff");
      buttons[i].style("border", "2px solid #739bffff");
      buttons[i].style("box-shadow", "none");
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createButtons();
}

function toggleButton(index) {
  buttonStates[index] = !buttonStates[index];
  
  if (buttonStates[index]) {
    // 亮的狀態 - 亮藍色
    buttons[index].style("background-color", "#1060ffff");
    buttons[index].style("color", "white");
    buttons[index].style("border", "2px solid #1060ffff");
    buttons[index].style("box-shadow", "0 0 15px #1060ffff");
  } else {
    // 暗的狀態
    buttons[index].style("background-color", "#2c3e50");
    buttons[index].style("color", "#95a5a6");
    buttons[index].style("border", "2px solid #34495e");
    buttons[index].style("box-shadow", "none");
  }
}

function draw() {}

var checkboxes = [];
var topPadding = 10; // 設定 padding 值
var leftPadding = 80; // 設定 padding 值

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayDensity(pixelDensity);
  leftPadding = windowWidth / 15;
  background(50);
  // add a title in middle
  fill(255);
  textSize(48);
  textAlign(CENTER);
  text("點名器", width / 2, topPadding + 48);
  // create a 5x8 checkbox grid
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 8; j++) {
      checkboxes.push(createCheckbox(" " + str(j * 5 + i + 1))); // 在這裡添加文字
      checkboxes[checkboxes.length - 1].position(
        (windowWidth / 5) * i + leftPadding,
        (windowHeight / 10) * (j + 1) + topPadding
      );
      checkboxes[checkboxes.length - 1].style("color", "red"); // 改變文字顏色
      checkboxes[checkboxes.length - 1].style("font-size", "32px"); // 改變文字大小

      // 當 checkbox 被選中或取消選中時，改變其顏色
      checkboxes[checkboxes.length - 1].changed(function () {
        if (this.checked()) {
          this.style("color", "dodgerblue"); 
        } else {
          this.style("color", "red"); 
        }
      });
    }
  }
  // create a reset button, once clicked, all checkboxes will be unchecked
  var reset = createButton("Reset");
  reset.position(windowWidth / 2, (windowHeight / 10) * 9 + topPadding);
  reset.style("color", "#222222");
  reset.mousePressed(function () {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked(false);
      checkboxes[i].style("color", "red");
    }
  });
}

function draw() {}

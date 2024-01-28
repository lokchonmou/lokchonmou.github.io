var checkboxes = [];
var padding = 10; // 設定 padding 值

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayDensity(pixelDensity);
  background(50);
  // add a title in middle
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("點名器", width / 2, padding + 32);
  // create a 5x8 checkbox grid
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 8; j++) {
      checkboxes.push(createCheckbox(" " + str(j * 5 + i + 1))); // 在這裡添加文字
      checkboxes[checkboxes.length - 1].position(
        (windowWidth / 5) * i + padding,
        (windowHeight / 10) * (j + 1) + padding
      );
      checkboxes[checkboxes.length - 1].style("color", "#cccccc"); // 改變文字顏色
    }
  }
  // create a reset button, once clicked, all checkboxes will be unchecked
  var reset = createButton("Reset");
  reset.position(windowWidth / 2, (windowHeight / 10) * 9 + padding);
  reset.style("color", "#222222");
  reset.mousePressed(function () {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked(false);
    }
  });
}

function draw() {}

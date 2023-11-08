let bullets = [];
let player;
let myKey = [false, false, false, false];
let timer = 0;
let timer1 = 0;
let gameOver = false;

function setup() {
  createCanvas(600, 600);

  frameRate(60);
  timer = millis();
  timer1 = millis();
  gameOver = false;

  background(200, 200, 255);
  player = new Bullets(width / 2, height / 2, 15, color(0, 255, 0));
  player.show();


  bullets = [];
  for (let i = 0; i < 10; i++) bullets.push(new Bullets(random(0, width), random(0, height), 10, color(255, 165, 0)));
  for (b in bullets) bullets[b].show();
}

function draw() {
  if (millis() - timer > 1000) {
    if (gameOver == false) {
      runGame();
    }
    else {
      fill(255, 0, 0);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width/2, height/2);
    }
  }
}

function runGame() {
  
  // lightblue background
  background(200, 200, 255);

  //draw the current time and fill yellow
  fill(255, 255, 0);
  textSize(30);
  textAlign(CENTER, TOP);
  text(nfc((millis() -timer)/1000,2), width/2, 10);

  //draw the frame rate and fill yellow
  textAlign(LEFT, BOTTOM);
  textSize(10);
  text(nfc(frameRate(),2) + " fps", 10, height-10);

  //for every 10s, add 2 bullets
  if (millis() - timer1 > 10000) {
    timer1 = millis();
    for (let i = 0; i < 2; i++) bullets.push(new Bullets(random(0, width), random(0, height), 10, color(255, 165, 0)));
  }

  // player
  if (myKey[0]) player.y -= 5;  // up
  if (myKey[1]) player.y += 5;  // down
  if (myKey[2]) player.x -= 5;  // left
  if (myKey[3]) player.x += 5;  // right


  player.show();

  for (b in bullets) {
    bullets[b].move();
    bullets[b].show();
    if (bullets[b].collision(player.x, player.y)) {
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) myKey[0] = true;
  if (keyCode == DOWN_ARROW) myKey[1] = true;
  if (keyCode == LEFT_ARROW) myKey[2] = true;
  if (keyCode == RIGHT_ARROW) myKey[3] = true;
  if (key == 'R' || key == 'r') setup();
}

function keyReleased() {
  if (keyCode == UP_ARROW) myKey[0] = false;
  if (keyCode == DOWN_ARROW) myKey[1] = false;
  if (keyCode == LEFT_ARROW) myKey[2] = false;
  if (keyCode == RIGHT_ARROW) myKey[3] = false;
}



class Bullets {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.color = color;
    ellipseMode(CENTER);
  }

  move() {
    if (this.x > width || this.x < 0) {
      this.vx = -this.vx;
    }
    if (this.y > height || this.y < 0) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    // orange bullets
    fill(this.color);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  collision(x, y) {
    let d = dist(this.x, this.y, x, y);
    if (d < this.r + 15) { //the radius of bullets are 10 and player is 15
      return true;
    } else {
      return false;
    }
  }
}

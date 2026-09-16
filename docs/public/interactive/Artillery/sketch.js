let player1Height = 0;
let player2Height = 0;

let tankSize = 100; //the size of rect of the tanks

let Round = 0;           //player1 or player2
let ballPos; // position of cannonball
let ballVec; // velocity of cannonball

function setup() {
	createCanvas(700, 700 * .75);

	player1Height = random(height * 0.2, height * 0.8);
	player2Height = height - player1Height;

	Round = 1;
	ballPos = createVector(100, player1Height)
	ballVec = createVector(2.5, 0)
}

function draw() {
	background(30);

	keyEvent();

	// draw the velocity arrow
	stroke(255, 255, 0);
	strokeWeight(3);
	line(100, player1Height, 100 + ballVec.x * 20, player1Height + ballVec.y * 20);

	// draw the tanks
	rectMode(CENTER);
	noStroke();  //沒有框線
	fill(255, 0, 0);
	rect(100, player1Height, tankSize, tankSize);
	fill(0, 0, 255);
	rect(width - 100, player2Height, tankSize, tankSize);

	//draw the ground
	rectMode(CORNERS);  //use corner to corner mode
	noStroke();  //沒有框線
	fill(0, 255, 0);
	rect(0, player1Height + tankSize / 2, width / 2, height);
	rect(width / 2, player2Height + tankSize / 2, width, height);
}

function keyEvent() {
	if (keyIsPressed) {
		if (Round == 1) {
			if (key == 'W' || key == 'w') {
				ballVec = ballVec.mult(1.1);
				ballVec.limit(10);
			}
			if (key == 'S' || key == 's')
				ballVec = ballVec.mult(0.9);
			if (key == 'A' || key == 'a')
				ballVec = ballVec.rotate(radians(-5));
			if (key == 'D' || key == 'd')
				ballVec = ballVec.rotate(radians(5));
		}
	}
}

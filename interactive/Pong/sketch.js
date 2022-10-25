ballX = 0;
ballY = 0;
ballSpeedX = 0;
ballSpeedY = 0;

player1X = 0;
player1Y = 0;

player2X = 0;
player2Y = 0;

score1 = 0;
score2 = 0;

Keys = [false, false, false, false, false];

function setup() {
	createCanvas(700, 700 * .75);
	ballX = width / 2;
	ballY = height / 2;
	ballSpeedX = -1;
	ballSpeedY = random(-2, 2);

	player1X = 10;
	player1Y = height / 2;

	player2X = width - 10;
	player2Y = height / 2;

	score1 = 0;
	score2 = 0;
}

function draw() {
	background(30);
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	ellipse(ballX, ballY, 15, 15);

	if (ballY <= 0 || ballY >= height) ballSpeedY *= -1;

	if (ballX <= 10 && ballY >= player1Y - 25 && ballY <= player1Y + 25)
		ballSpeedX *= -1;

	if (ballX >= width - 10 && ballY >= player2Y - 25 && ballY <= player2Y + 25)
		ballSpeedX *= -1

	if (ballX <= 0) {
		score2 += 1;
		ballX = width / 2;
		ballY = height / 2;
		ballSpeedX = 1;
		ballSpeedY = random(-2, 2);
	}

	if (ballX >= width) {
		score1 += 1;
		ballX = width / 2;
		ballY = height / 2;
		ballSpeedX = -1;
		ballSpeedY = random(-2, 2);
	}

	ellipse(ballX, ballY, 15, 15);


	if (Keys[0] && player1Y > 0) player1Y -= 3;
	if (Keys[1] && player1Y < height) player1Y += 3;
	if (Keys[2] && player2Y > 0) player2Y -= 3;
	if (Keys[3] && player2Y < height) player2Y += 3;
	if (Keys[4]) setup();


	rectMode(CENTER);
	rect(player1X, player1Y, 10, 50);
	rect(player2X, player2Y, 10, 50);

	textSize(60);
	textAlign(CENTER, CENTER);
	fill(255)
	text(score1, width / 4, 50);
	text(score2, width * 3 / 4, 50);
	stroke(255);
	line(width / 2, 10, width / 2, height - 10);
}

function setKey(input, state) {
	if (input == 'W' || input == 'w')	Keys[0] = state;
	if (input == 'S' || input == 's')	Keys[1] = state;
	if (input == 'O' || input == 'o')	Keys[2] = state;
	if (input == 'L' || input == 'l')	Keys[3] = state;
	if (input == 'R' || input == 'r')	Keys[4] = state;
}

function keyPressed() {
	setKey(key, true);
}


function keyReleased() {
	setKey(key, false);
}

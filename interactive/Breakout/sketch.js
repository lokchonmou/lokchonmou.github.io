let ballPos = 0, ballVec = 0;
let beam = 0;
let beamWidth = 100;
let turn = 0;
let brickPos = [];
let brickState = [];
let brickWidth = 0;
let brickHeight = 0;
let brickColor = ["#C54846", "#CE7238", "#BB7C2F", "#A29B27", "#429143", "#4350CC", 
				  "#a553c4", "#e5a1c4","#077ff8", "#8ac3be", "#38c3be"];

let gameOver = false;
let life = 3;
let score = 0;

function setup() {
	createCanvas(700, 700 * .75);

	frameRate(60)

	ballPos = createVector(width / 2, height - 20);
	ballVec = createVector(random(-5, 5), -2);

	beam = createVector(width / 2, height - 15);
	rectMode(CENTER);

	brickWidth = width / 16;
	brickHeight = 20;

	brickPos = [];
	brickState = [];

	for (let i = 0; i < turn+2; i++) {
		brickPos[i] = [];
		brickState[i] = [];
		for (let j = 0; j < 16; j++) {
			brickPos[i][j] = createVector(j * brickWidth + brickWidth / 2, i * brickHeight + 50);
			brickState[i][j] = true;
		}
	}

	gameOver = false;
	life = 3;
	score = 0;
}



function draw() {
	if (!gameOver) {
		runGame();
		checkIfWin();
		checkIfLose();
	}
}

function runGame() {
	background(30);

	ballPos = ballPos.add(ballVec);
	beam.x = mouseX;

	if (ballPos.x <= 0 || ballPos.x >= width) ballVec.x *= -1;
	if (ballPos.y <= 0) ballVec.y *= -1;

	if (ballPos.x >= beam.x - beamWidth / 2 && ballPos.x <= beam.x + beamWidth / 2 && ballPos.y >= height - 15) {
		ballVec.y *= -1;
		ballVec.x = random(-5, 5);
	}

	fill(198, 73, 75);
	noStroke();
	rect(ballPos.x, ballPos.y, 20, 20);
	rect(beam.x, beam.y, beamWidth, 10);

	for (let i = 0; i < turn + 2; i++) {
		fill(brickColor[i]);
		for (let j = 0; j < 16; j++) {
			if (isInBox(ballPos, brickPos[i][j]) && brickState[i][j]){
				brickState[i][j] = false;
				score += turn + 1;
			}
			if (brickState[i][j])
				rect(brickPos[i][j].x, brickPos[i][j].y, brickWidth, brickHeight);
		}
	}

	fill(255);
	textSize(24);
	textAlign(CENTER, CENTER);
	text("Life: "+str(life), width/2, 20);
	text("Score: "+str(score), 50, 20);
	text("Round: "+str(turn+1), width - 70, 20);
}

function isInBox(_ballPos, _brickPos) {
	let x = _ballPos.x;
	let y = _ballPos.y;
	let bX = _brickPos.x;
	let bY = _brickPos.y;
	let w = brickWidth;
	let h = brickHeight;

	if (x >= bX - w / 2 && x <= bX + w / 2 && y >= bY - h / 2 && y <= bY + h / 2)
		return true
}

function checkIfLose() {
	if (ballPos.y >= height) {
		gameOver = true;
		if (life > 0) {
			life--;
			softReset();
		}
		else {
			textSize(48);
			textAlign(CENTER, CENTER);
			text("GAME OVER", width / 2, height / 2);
		}
	}
}

function checkIfWin() {
	let hasTrue = false;

	for (let i = 0; i < turn + 2; i++)
		for (let j = 0; j < 16; j++)
			hasTrue = hasTrue || brickState[i][j];

	if (!hasTrue) {
		if(turn == 9){
			gameOver = true;
			textSize(48);
			textAlign(CENTER, CENTER);
			text("YOU WIN", width / 2, height / 2);
		} else {
			turn ++;
			setup();
		}
		
	}
}

function keyPressed() {
	if (key == 'R' || key == 'r') {
		turn = 0;
		setup();
	}
}

function softReset() {
	ballPos = createVector(width / 2, height - 20);
	ballVec = createVector(random(-5, 5), -1);

	beam = createVector(width / 2, height - 15);

	gameOver = false;
}
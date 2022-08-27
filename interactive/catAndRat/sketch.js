let rat;
let cats = [];
let walls = [];
let foods = [];

let lv = 0;
let state = 0;
let view = 150.;

let stars = [];
let shootSound;
let startButton;

function preload() {
	soundFormats('mp3', 'ogg');
	shootSound = loadSound('libraries/LASRGunStarwars.mp3');
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	frameRate(120);

	rat = new Rat(width / 2, height / 2);
	startButton = createButton('START');
	startButton.position(width / 2 - 75, height / 2 + 30);
	startButton.size(150, 50);
	startButton.style('font-size', '20px', 'align', 'center');
	startButton.mousePressed(startButtonEvent);
	lvUP(lv);
	startButton.hide();
}

function startButtonEvent() {
	rat.GAMEOVER = false;
	rat.blood = rat.maxBlood;
	rat.startTime = millis();
	startButton.hide();
	lv = 0;
	lvUP(lv);
}

function lvUP(_lv) {
	cats = [];
	walls = [];
	foods = [];
	stars = [];
	state = 0;
	view = 150. + int(lv * 5);
	rat.startTime = millis();
	
	for (let i = 0; i < 200; i++)  stars.push(new star('#830101'));
	for (let i = 0; i < 200; i++)  stars.push(new star('#8a8a00'));
	for (let i = 0; i < 100; i++)  stars.push(new star('#FFFFFF'));

	for (let i = 0; i < (15 + lv * 3); i++)
		cats.push(new Cat(random(0, width), random(0, height)));

	for (let i = 0; i < (3 + int(lv / 2)); i++)
		foods.push(new food(random(0, width), random(0, height), false));

	while (walls.length < (int(lv / 2) + 3)) {
		let tempWall = new wall(random(50, width - 50), random(50, height - 50), random(50, width - 50), random(50, height - 50));
		let noCross = false;
		if (walls != null)
			for (const w of walls)
				noCross |= w.isCross(tempWall.P0.x, tempWall.P0.y, tempWall.P1.x, tempWall.P1.y);
		if (!noCross) walls.push(tempWall);
	}

	lv++;
}


function draw() {
	drawBackground();

	for (const c of cats) {
		c.control();
		c.show();
	}

	for (const w of walls)
		w.show();

	let allAte = false;
	for (const f of foods) {
		f.control();
		f.show();
		allAte |= f.visible;
	}
	if (!allAte) {
		if (state == 0) {
			state++;
			foods.push(new food(random(0, width), random(0, height), true));
		}
		else if (state == 1)
			lvUP(lv);
	}
	rat.control();
	rat.show();

}

function drawBackground() {
	background(30);
	for (const s of stars) s.show();

	fill('#FFFFFF');
	textSize(20);
	text("LV " + str(lv), 30, 28);
}





class star {
	constructor(_color) {
		this.x = random(0, width);
		this.y = random(0, height);
		this.color = _color;
	}

	show() {
		fill(this.color);
		noStroke();
		ellipse(this.x, this.y, 2, 2);
	}
}

class food {

	constructor(_x, _y, _isBlackhole) {
		this.pos = new p5.Vector(_x, _y);
		this.visible = true;
		this.isBlackhole = _isBlackhole;
	}

	show() {
		if (this.visible) {
			if (!this.isBlackhole) {
				noStroke();
				fill('#009BFF');
				ellipse(this.pos.x, this.pos.y, 15, 15);
			}
			else {
				stroke('#ffffff');
				fill('#000000');
				ellipse(this.pos.x, this.pos.y, 30, 30);
			}
		}
	}

	control() {
		if (!this.isBlackhole) {
			if (dist(this.pos.x, this.pos.y, rat.pos.x, rat.pos.y) <= 15)
				this.visible = false;
		}
		else {
			if (dist(this.pos.x, this.pos.y, rat.pos.x, rat.pos.y) <= 22.5) {
				this.visible = false;
			}
		}
	}
}






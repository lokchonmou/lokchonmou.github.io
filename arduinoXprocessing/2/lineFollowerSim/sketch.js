var img;
let robots = [];
var GUIs = [];
let resetButton, leftButton, rightButton, addCarButton, delCarButton, fpsSlider, saveButton, loadButton;
let fileSelectButton;
let autoDelCheckbox;

var currentID = 0;
var robotNoCounter = 0;
var FPS = 30;
let RobotsStore;
var isAutoDelCar = true;

var robotWidth;
var sensorNo;
var sensorSize;
var sensor_distance;
var sensor_width;
var maxAccel;
var maxVel;
var Kp;
var Kd;

var winner = 0;
var winnerScore = 9999;

function preload() {
	img = loadImage("data/line guide-01.svg");
}

function setup() {
	createCanvas(600, 600);
	pixelDensity(2.0);
	frameRate(FPS);

	//Create the first 4 robots////////////////////////////////////////////////
	for (var i = 0; i < 4; i++) {
		robots.push(new Robot(robotNoCounter, 210, 61, -90));
		robotNoCounter++;
	}

	robots[1].sensorNo = 5;
	robots[1].sensor_distance = 30;

	robots[2].sensor_distance = 80;

	robots[3].robotWidth = 30;
	robots[3].sensorNo = 9;
	robots[3].sensor_distance = 52;
	robots[3].sensor_width = 4;
	robots[3].maxVel = 8.5;
	robots[3].Kp = 2.35;
	robots[3].Kd = 3.45;

	for (var i = 0; i < robots.length; i++) {
		updateLocalParams(i);
		createGUI(i);
	}
	updateLocalParams(0);


	//create GUI////////////////////////////////////////////////////////////////
	saveButton = createButton('SAVE');
	saveButton.position(width - 100, height - 25);
	saveButton.size(50, 25);
	saveButton.mousePressed(saveEvent);

	loadButton = createButton('LOAD');
	loadButton.position(width - 50, height - 25);
	loadButton.size(50, 25);
	loadButton.mousePressed(loadEvent);

	resetButton = createButton('Reset position');
	resetButton.position(width - 100, height - 50);
	resetButton.size(100, 25);
	resetButton.style("font-size", "12px");
	resetButton.mousePressed(resetPosition);

	leftButton = createButton('←');
	leftButton.position(width - 100, height - 75);
	leftButton.size(25, 25);
	leftButton.mousePressed(leftEvent);

	rightButton = createButton('→');
	rightButton.position(width - 25, height - 75);
	rightButton.size(25, 25);
	rightButton.mousePressed(rightEvent);

	addCarButton = createButton('+');
	addCarButton.position(width - 75, height - 75);
	addCarButton.size(25, 25);
	addCarButton.mousePressed(addCarEvent);

	delCarButton = createButton('−');
	delCarButton.position(width - 50, height - 75);
	delCarButton.size(25, 25);
	delCarButton.mousePressed(delCarEvent);

	fpsSlider = createSlider(1, 120, 30);
	fpsSlider.position(10, 15);
	fpsSlider.style('width', '80px');

	autoDelCheckbox = createCheckbox('Auto delete car', true);
	autoDelCheckbox.changed(autoDelCheckedEvent);
	autoDelCheckbox.position(0, height - 20);
	autoDelCheckbox.style("font-size", "12px");

}

function createGUI(i) {
	GUIs[i] = createGui('Robot' + str(robots[i].id)).setPosition(600, 0);
	sliderRange(8, 50, 1);
	GUIs[i].addGlobals('robotWidth');
	sliderRange(3, 21, 2);
	GUIs[i].addGlobals('sensorNo');
	sliderRange(10, 100, 1);
	GUIs[i].addGlobals('sensor_distance');
	sliderRange(1, 10, 1);
	GUIs[i].addGlobals('sensor_width');
	sliderRange(0.1, 10, 0.1);
	GUIs[i].addGlobals('maxAccel', 'maxVel');
	sliderRange(0, 10, 0.05);
	GUIs[i].addGlobals('Kp', 'Kd');
	GUIs[i].hide();
}

function draw() {

	//set the fps//////////////////////////////////////////////////////////////
	FPS = fpsSlider.value();
	frameRate(FPS);

	//background////////////////////////////////////////////////////////////////
	image(img, 0, 0, 600, 600);

	//update the robots////////////////////////////////////////////////////////
	updateParams(currentID);

	for (var i = 0; i < robots.length; i++) {
		robots[i].update();
		if (i == currentID) GUIs[i].show();
		else GUIs[i].hide();
	}

	// if any car run outside the field, delete it//////////////////////////////
	if (isAutoDelCar) {
		for (var i = 0; i < robots.length; i++) {
			if (robots[i].isDead) {
				currentID = i;
				delCarEvent();
				break;
			}
		}
	}

	//draw the start line///////////////////////////////////////////////////////
	fill(127, 127, 255, 127);
	noStroke();
	rectMode(CORNER);
	rect(200, 0, 10, 110);

	//draw the fps text/////////////////////////////////////////////////////////
	fill(0);
	textAlign(LEFT, TOP);
	text("fps: " + nf(frameRate(), 3, 1) + '/' + FPS, 0, 0);

	//draw the stroke of field/////////////////////////////////////////////////
	noFill();
	stroke(0);
	strokeWeight(.5);
	rect(0, 0, 600, 600);

	//draw the robots, it should be do after all robot sensor is read//////////
	for (var i = 0; i < robots.length; i++) robots[i].show();

	//Circle out the winner////////////////////////////////////////////////////
	for (var i = 0; i < robots.length; i++) {
		if (robots[i].score > 2) {
			if (robots[i].score < winnerScore) {
				winnerScore = robots[i].score;
				winner = i;
			}
		}
	}
	fill(255, 255, 0, 70);
	ellipse(robots[winner].x, robots[winner].y, 60, 60);

	//Circle out the current car////////////////////////////////////////////////
	noFill();
	strokeWeight(2);
	stroke('#FF0000');
	ellipse(robots[currentID].x, robots[currentID].y, 60, 60);

}

function updateLocalParams(i) {
	robotWidth = robots[i].robotWidth;
	sensorNo = robots[i].sensorNo;
	sensor_distance = robots[i].sensor_distance;
	sensor_width = robots[i].sensor_width;
	maxAccel = robots[i].maxAccel;
	maxVel = robots[i].maxVel;
	Kp = robots[i].Kp;
	Kd = robots[i].Kd;
}

function resetPosition() {
	for (var i = 0; i < robots.length; i++) {
		robots[i].x = 210;
		robots[i].y = 61;
		robots[i].theta = -90;
		robots[i].isDead = false;
		robots[i].timer = frameCount;
		robots[i].last_timer = robots[i].timer;
		robots[i].score = 0;
	}
	winner = 0;
	winnerScore = 9999;
}

function updateParams(i) {
	robots[i].robotWidth = robotWidth;
	robots[i].sensorNo = sensorNo;
	robots[i].sensor_distance = sensor_distance;
	robots[i].sensor_width = sensor_width;
	robots[i].maxVel = maxVel;
	robots[i].maxAccel = maxAccel;
	robots[i].Kp = Kp;
	robots[i].Kd = Kd;
}

function leftEvent() {
	currentID--;
	if (currentID < 0) currentID = robots.length - 1;
	updateLocalParams(currentID);
}

function rightEvent() {
	currentID++;
	if (currentID > robots.length - 1) currentID = 0;
	updateLocalParams(currentID);
}

function addCarEvent() {
	robots.push(new Robot(robotNoCounter, 210, 61, -90));
	robotNoCounter++;
	robots[robots.length - 1].robotWidth = int(random(8, 50));
	robots[robots.length - 1].sensorNo = floor(random(5, 9) / 2) * 2 + 1;
	robots[robots.length - 1].sensor_distance = int(random(20, 70));
	robots[robots.length - 1].sensor_width = int(random(4, 10));
	robots[robots.length - 1].maxVel = random(5., 7.);
	robots[robots.length - 1].maxAccel = .5;
	robots[robots.length - 1].Kp = random(0, 5);
	robots[robots.length - 1].Kd = random(0, 5);

	updateLocalParams(robots.length - 1);
	createGUI(robots.length - 1);
	updateLocalParams(currentID);
}

function delCarEvent() {
	if (robots.length > 1) robots.splice(currentID, 1);
	if (GUIs.length > 1) {
		GUIs[currentID].hide();
		GUIs.splice(currentID, 1);
	}
	if (currentID >= robots.length) currentID = robots.length - 1;
	updateLocalParams(currentID);
	winner = 0;
	winnerScore = 9999;
}

function saveEvent() {
	saveJSON(robots, 'RobotsStore');
}

function loadEvent() {
	fileSelectButton = createFileInput(handleFile);
	fileSelectButton.position(200, height - 25);
}

function handleFile(file) {
	if (file.type === 'application' && file.subtype === 'json') {
		RobotsStore = file.data;
		print(RobotsStore);

		for (var i = 0; i < RobotsStore.length; i++) {
			robots.push(new Robot(robotNoCounter, 210, 61, -90));
			robots[robots.length - 1].robotWidth = RobotsStore[i].robotWidth;
			robots[robots.length - 1].sensorNo = RobotsStore[i].sensorNo;
			robots[robots.length - 1].sensor_distance = RobotsStore[i].sensor_distance;
			robots[robots.length - 1].sensor_width = RobotsStore[i].sensor_width;
			robots[robots.length - 1].maxAccel = RobotsStore[i].maxAccel;
			robots[robots.length - 1].maxVel = RobotsStore[i].maxVel;
			robots[robots.length - 1].Kp = RobotsStore[i].Kp;
			robots[robots.length - 1].Kd = RobotsStore[i].Kd;
			updateLocalParams(robots.length - 1);
			createGUI(robots.length - 1);
			robotNoCounter++;
		}
		updateLocalParams(currentID);
		fileSelectButton.remove();
	}
}

function autoDelCheckedEvent() {
	isAutoDelCar = !isAutoDelCar;
}

var img;
let robots=[];
var gui;
let resetButton, leftButton, rightButton, addCarButton, delCarButton;
var currentID=0;
var robotNoCounter = 0;

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

function preload(){
	img = loadImage("line guide-01.svg");
}

function setup() {
	createCanvas(750, 600);
	pixelDensity(2.0);
	frameRate(120);

	resetButton = createButton('RESET postion');
	resetButton.position(width - 50, height - 30);
	resetButton.mousePressed(resetPosition);

	leftButton = createButton('←');
	leftButton.position(width - 50, height - 52);
	leftButton.mousePressed(leftEvent);

	rightButton = createButton('→');
	rightButton.position(width+27, height - 52);
	rightButton.mousePressed(rightEvent);

	addCarButton = createButton('+');
	addCarButton.position(width-21, height - 52);
	addCarButton.mousePressed(addCarEvent);

	delCarButton = createButton('−');
	delCarButton.position(width+3, height - 52);
	delCarButton.mousePressed(delCarEvent);

	for (var i=0; i < 4; i++){
		robots.push(new Robot(robotNoCounter, 210, 61, -90));
		robotNoCounter++;
	}

	robots[1].params.sensorNo = 5;
	robots[1].params.sensor_distance = 30;

	robots[2].params.sensor_distance = 80;

	robots[3].params.robotWidth = 30;
	robots[3].params.sensorNo = 9;
	robots[3].params.sensor_distance = 52;
	robots[3].params.sensor_width = 4;
	robots[3].params.maxVel = 8.5;
	robots[3].params.Kp = 2.35;
	robots[3].params.Kd = 3.45;

	updateGUI();
}

function draw() {

	image(img, 0, 0, 600, 600);

	updateParams();

	for (var i=0; i < robots.length; i++) robots[i].update();
	//draw the start line
	fill(127,127,255,127);
	noStroke();
	rectMode(CORNER);
	rect(200,0, 10, 110);

	//draw the fps
	stroke(0);
	textAlign(LEFT, TOP);
	text("fps: "+nf(frameRate(),3,1), 0, 0);

	//draw the stroke of field
	noFill();
	rect(0,0,600,600);

	//draw the robots
	for (var i=0; i < robots.length; i++) robots[i].show();

	//Circle out the winner
	for (var i=0; i < robots.length; i++){
		if (robots[i].score > 2){
			if (robots[i].score < winnerScore){
				winnerScore = robots[i].score;
				winner = i;
			}
		}
	}
	fill(255, 255, 0, 70);
	ellipse(robots[winner].x, robots[winner].y, 60,60)






}

function updateGUI() {
	currentID = constrain(currentID, 0, robots.length);
	robotWidth = robots[currentID].params.robotWidth;
	sensorNo = robots[currentID].params.sensorNo;
	sensorSize = robots[currentID].params.sensorSize;
	sensor_distance = robots[currentID].params.sensor_distance;
	sensor_width = robots[currentID].params.sensor_width;
	maxAccel = robots[currentID].params.maxAccel;
	maxVel = robots[currentID].params.maxVel;
	Kp = robots[currentID].params.Kp;
	Kd = robots[currentID].params.Kd;

	gui = createGui('Robot'+str(robots[currentID].id)).setPosition(600,0);
	sliderRange(8, 50, 1);
	gui.addGlobals('robotWidth');
	sliderRange(3, 21, 2);
	gui.addGlobals('sensorNo');
	sliderRange(1, 10, 1);
	gui.addGlobals('sensorSize');
	sliderRange(10, 100, 1);
	gui.addGlobals('sensor_distance');
	sliderRange(1, 10, 1);
	gui.addGlobals('sensor_width');
	sliderRange(0.1, 10, 0.1);
	gui.addGlobals('maxAccel', 'maxVel');
	sliderRange(0, 10, 0.05);
	gui.addGlobals('Kp', 'Kd');
}

function resetPosition(){
	for (var i=0; i < robots.length; i++){
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

function updateParams(){
	robots[currentID].params.robotWidth = robotWidth;
	robots[currentID].params.sensorNo = sensorNo;
	robots[currentID].params.sensorSize = sensorSize;
	robots[currentID].params.sensor_distance = sensor_distance;
	robots[currentID].params.sensor_width = sensor_width;
	robots[currentID].params.maxVel = maxVel;
	robots[currentID].params.maxAccel = maxAccel;
	robots[currentID].params.Kp = Kp;
	robots[currentID].params.Kd = Kd;
}

function leftEvent(){
	currentID--;
	if (currentID < 0) currentID = robots.length-1;
	updateGUI();
}

function rightEvent(){
	currentID++;
	if (currentID > robots.length-1) currentID = 0;
	updateGUI();

}

function addCarEvent(){
	robots.push(new Robot(robotNoCounter, 210, 61, -90));
	robotNoCounter++;
	robots[robots.length-1].params.robotWidth = int(random(8, 50));
	robots[robots.length-1].params.sensorNo = floor(random(5, 9)/2)*2+1;
	robots[robots.length-1].params.sensor_distance = int(random(20, 70));
	robots[robots.length-1].params.sensor_width = int(random(sensorSize,10));
	robots[robots.length-1].params.maxVel = random(5.,7.);
	robots[robots.length-1].params.maxAccel = .5;
	robots[robots.length-1].params.Kp = random(0, 5);
	robots[robots.length-1].params.Kd = random(0, 5);
}

function delCarEvent(){
	if (robots.length > 1) robots.splice(currentID, 1);
	if (currentID >= robots.length) currentID = robots.length-1;
	winner = 0;
	winnerScore = 9999;
	updateGUI();
}

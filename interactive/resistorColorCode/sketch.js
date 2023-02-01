
let band1, band2, band3, band4, confirmButton, nextButton;

let colorCode = ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Gray", "White", "Gold", "Silver"];
let displayColor = ['#000000', '#964B00', '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#999999', '#FFFFFF', '#FFD700', '#C0C0C0'];

let commonValue = [1, 1.2, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
let commonMultiplier = [10e0, 10e1, 10e2, 10e3, 10e4, 10e5, 10e6, 0.1, 0.01];
let band1Value, band2Value, band3Value, band4Value;

let randomList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let score = 0;

function setup() {
	createCanvas(600, 600*1.3);

	randomSeed();
	drawNumber();

	randomList = shuffle(randomList);
	band1 = createSelect();
	band1.position(width / 4 - 3 * width / 16, 2 * height / 3 + 50);
	for (let i = 0; i < 10; i++) band1.option(colorCode[randomList[i]], randomList[i]);
	//for (let i = 0; i < 10; i++) band1.option(colorCode[i], i);
	band1.selected(' ');
	band1.changed(band1Event);

	randomList = shuffle(randomList);
	band2 = createSelect();
	band2.position(2 * width / 4 - 3 * width / 16, 2 * height / 3 + 50);
	for (let i = 0; i < 10; i++) band2.option(colorCode[randomList[i]], randomList[i]);
	//for (let i = 0; i < 10; i++) band2.option(colorCode[i], i);
	band2.changed(band1Event);

	randomList = shuffle(randomList);
	band3 = createSelect();
	band3.position(3 * width / 4 - 3 * width / 16, 2 * height / 3 + 50);
	for (let i = 0; i < 10; i++) band3.option(colorCode[randomList[i]], randomList[i]);
	// for (let i = 0; i < 10; i++) band3.option(colorCode[i], i);
	band3.changed(band1Event);

	band4 = createSelect();
	band4.position(4 * width / 4 - 3 * width / 16, 2 * height / 3 + 50);
	for (let i = 10; i < 12; i++) band4.option(colorCode[i], i);
	band4.changed(band1Event);

	confirmButton = createButton('CONFIRM');
	confirmButton.position(width / 2 - 30, height - 50);
	confirmButton.mousePressed(confirmButtonEvent);

	nextButton = createButton('NEXT');
	nextButton.position(width - 100, height - 50);
	nextButton.mousePressed(nextButtonEvent);

	rectMode(CENTER);
	allTrue = false;
	drawFrame();
}

function drawFrame(){
	background(200);

	noStroke();
	fill(0);
	textSize(60);
	textAlign(CENTER, CENTER);
	text(engineeringNotation(randomResistor), width / 2, width / 3);
	fill('#FF0000');
	text(score, width - 60, 60);
	textSize(24);
	textAlign(CENTER, TOP);
	fill(0);
	text("Band 1", width / 4 - width / 8, 2 * height / 3);
	text("Band 2", 2 * width / 4 - width / 8, 2 * height / 3);
	text("Band 3", 3 * width / 4 - width / 8, 2 * height / 3);
	text("Band 4", 4 * width / 4 - width / 8, 2 * height / 3);
	stroke(0);
	strokeWeight(10);
	fill('#e6bc98');
	line(10, height / 2, width - 10, height / 2);
	rect(width / 2, height / 2, width / 2, height / 5, 10, 10, 10, 10);
}

function drawNumber() {
	randomValue = commonValue[int(random(commonValue.length))];
	randomMultiplier = commonMultiplier[int(random(commonMultiplier.length - 2))];
	randomResistor = randomValue * randomMultiplier;
	print(randomValue, randomMultiplier, randomResistor, engineeringNotation(randomResistor));
}

function draw() {

}

function band1Event() {
	background(200);

	noStroke();
	fill(0);
	textSize(60);
	textAlign(CENTER, CENTER);
	text(engineeringNotation(randomResistor), width / 2, width / 3);
	fill('#FF0000');
	text(score, width - 60, 60);
	textSize(24);
	textAlign(CENTER, TOP);
	fill(0);
	text("Band 1", width / 4 - width / 8, 2 * height / 3);
	text("Band 2", 2 * width / 4 - width / 8, 2 * height / 3);
	text("Band 3", 3 * width / 4 - width / 8, 2 * height / 3);
	text("Band 4", 4 * width / 4 - width / 8, 2 * height / 3);
	stroke(0);
	strokeWeight(10);
	fill('#e6bc98');
	line(10, height / 2, width - 10, height / 2);
	rect(width / 2, height / 2, width / 2, height / 5, 10, 10, 10, 10);


	band1Value = band1.selected();
	band2Value = band2.selected();
	band3Value = band3.selected();
	band4Value = band4.selected();
	print(band1Value, band2Value, band3Value, band4Value);

	strokeWeight(25);
	strokeCap(SQUARE);
	stroke(displayColor[band1Value]);
	line(width / 4 + width / 10, height * 4 / 10, width / 4 + width / 10, height * 6 / 10);
	stroke(displayColor[band2Value]);
	line(width / 4 + 2 * width / 10, height * 4 / 10, width / 4 + 2 * width / 10, height * 6 / 10);
	stroke(displayColor[band3Value]);
	line(width / 4 + 3 * width / 10, height * 4 / 10, width / 4 + 3 * width / 10, height * 6 / 10);
	stroke(displayColor[band4Value]);
	line(width / 4 + 4 * width / 10, height * 4 / 10, width / 4 + 4 * width / 10, height * 6 / 10);

	noFill();
	stroke(0);
	strokeWeight(10);
	strokeCap(ROUND);
	rect(width / 2, height / 2, width / 2, height / 5, 10, 10, 10, 10);

}

function confirmButtonEvent() {
	noStroke();
	fill(0);
	allTrue = true;
	temp = (band1Value == floor(randomValue));
	allTrue = allTrue && temp;
	fill(temp ? '#FFFF00' : '#FF0000');
	text(temp ? "TRUE" : "FALSE", width / 4 - width / 8, height * 8 / 10);

	temp = (band2Value == round((randomValue - floor(randomValue)) * 10));
	allTrue = allTrue && temp;
	fill(temp ? '#FFFF00' : '#FF0000');
	text(temp ? "TRUE" : "FALSE", 2 * width / 4 - width / 8, height * 8 / 10);

	temp = (band3Value == round(log(randomMultiplier) / log(10) - 1));
	allTrue = allTrue && temp;
	fill(temp ? '#FFFF00' : '#FF0000');
	text(temp ? "TRUE" : "FALSE", 3 * width / 4 - width / 8, height * 8 / 10);

	temp = (band4Value == 10);
	allTrue = allTrue && temp;
	fill(temp ? '#FFFF00' : '#FF0000');
	text(temp ? "TRUE" : "FALSE", 4 * width / 4 - width / 8, height * 8 / 10);

	if (allTrue) score++;
}

function nextButtonEvent() {
	if (allTrue) setup();
	print(score);
}


function engineeringNotation(number) {
	// Giga
	if (number >= 1e10)
		return (number / 1e9).toFixed(0) + 'GΩ ± 5%';
	else if (number >= 1e9)
		return (number / 1e8).toFixed(0) / 10 + 'GΩ ± 5%';

	// Mega
	else if (number >= 1e7)
		return (number / 1e6).toFixed(0) + 'MΩ ± 5%';
	else if (number >= 1e6)
		return (number / 1e5).toFixed(0) / 10 + 'MΩ ± 5%';

	// Kilo
	else if (number >= 1e4)
		return (number / 1e3).toFixed(0) + 'kΩ ± 5%';
	else if (number >= 1e3)
		return (number / 1e2).toFixed(0) / 10 + 'kΩ ± 5%';

	// Unit
	else if (number >= 1e1)
		return (number / 1e0).toFixed(0) + 'Ω ± 5%';
	else
		return (number / 1e-1).toFixed(0) / 10 + 'Ω ± 5%';
}

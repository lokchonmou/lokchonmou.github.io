var y, py;
var noiseValue = []
var resolution, samplingTime;
var isSampling;

var GUIs = [];
let saveButton, samplingButton;

function setup() {
	createCanvas(700, 700);
	pixelDensity(2.0);
	resolution = 3;
	samplingTime = 8; //width/smaplingTime in pixel , not in time
	isSampling = true;

	background(255);
	//translate(0, 0)
	strokeWeight(3)
	for (let i = 0; i < width; i += 0.1) {
		y = height * 1.3 * noise(i * 0.01);
		append(noiseValue, y);
		stroke('#FF0000')
		line(i == 0 ? 0 : i - 0.1, py, i, y);
		py = y;
	}
	grid();

	createGUI();
}

function draw() {
	background(255);
	strokeWeight(3);
	for (var i = 0; i < noiseValue.length; i++) {
		y = noiseValue[i];
		stroke('#FF0000');
		line((i == 0 ? 0 : i - 0.1) * 0.1, py, i * 0.1, y);
		//println(y);
		py = y;
	}
	grid();


	if (isSampling) {
		stroke('#00AA00');
		fill('#00AA0099');
		// strokeWeight(5);
		// for (var i = 0; i < height; i += height / pow(2, resolution)) {
		// 	line(0, i, width, i);
		// 	print(i);
		// }
		strokeWeight(4);
		for (var i = 0; i < noiseValue.length; i += noiseValue.length / samplingTime) {
			var temp;
			temp = -height + noiseValue[ceil(i)];
			temp = ceil(temp / (height / pow(2, resolution)));
			temp = temp * (height / pow(2, resolution));

			rect(i / noiseValue.length * width, height, width / samplingTime, temp);
		}
		noStroke();
		textSize(36);
		text("resolution =" + resolution + " bits" + '\n' + "sampling time =" + nf(4. / samplingTime, 1, 3) + 's', width / 2 - 200, 100);
	}
}

function grid() {

	stroke(0);
	strokeWeight(5);
	line(0, 0, width, 0);
	line(width, 0, width, height);
	line(width, height, 0, height);
	line(0, height, 0, 0);
	strokeWeight(0.3);
	for (var i = 0; i < width; i += width / 80) line(i, 0, i, height);
	strokeWeight(1);
	for (var i = 0; i < width; i += width / 16) line(i, 0, i, height);
	strokeWeight(2);
	for (var i = 0; i < width; i += width / 8) line(i, 0, i, height);

	strokeWeight(0.3);
	for (var i = 0; i < height; i += height / 80) line(0, i, width, i);
	strokeWeight(1);
	for (var i = 0; i < height; i += height / 16) line(0, i, width, i);
	strokeWeight(2);
	for (var i = 0; i < height; i += height / 8) line(0, i, width, i);
	fill(0);
	textSize(24);
	for (var i = 0; i < width; i += width / 4) text(i * 4 / width + 's', i + 5, height - 12);
	for (var i = 0; i < height; i += height / 2) text(nf(5 - i / height * 5) + 'V', 5, i + 24);
}

function createGUI() {
	GUIs = createGui('Control Panel').setPosition(740, 20);
	
	GUIs.addGlobals('isSampling');
	sliderRange(1, 31, 1);
	GUIs.addGlobals('resolution');
	sliderRange(1, 500, 1);
	GUIs.addGlobals('samplingTime');
	
	
}

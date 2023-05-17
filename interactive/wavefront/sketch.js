let cols = rows = 10;
let grid = new Array(cols).fill().map(() => new Array(rows));
let start, end;
let openSet = [];
let closeSet = [];
let path = [];
let step = 0;
let forwardButton, resetButton;

function setup() {
	createCanvas(600, 600);

	frameRate(2);
	textAlign(CENTER, CENTER);
	rectMode(CENTER);

	openSet = [];
	closeSet = [];
	path = [];
	loop();

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}
	start = grid[0][0];
	end = grid[cols - 1][rows - 1];

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].addWall();
		}
	}

	end.score = 0;
	openSet.push(start);

	forwardButton = createButton("Next step");
	forwardButton.position(width + 10, 10);
	forwardButton.mousePressed(stepForward);

	resetButton = createButton("Reset");
	resetButton.position(width + 10, 40);
	resetButton.mousePressed(setup)
}

function draw() {
	background(255);

	// Draw the grid
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show('#999999');
		}
	}

	// Draw closeSet
	for (let k = 0; k < closeSet.length; k++) {
		// let a = closeSet[k];
		// let c = closeSet[k].score;
		// c = int(map(c, 0, step, 0, 255));
		// colorMode(HSB, 255);
		// a.show(color(c, 255, 255));
		closeSet[k].show('#FFAAAA');
	}

	// Draw openSet
	for (let k = 0; k < openSet.length; k++)
		openSet[k].show('#AAFFAA');


	// Draw path
	for (let k = 0; k < path.length - 1; k++) {
		path[k].show('#9999FF');
	}

	// Draw start and end points
	start.show('#00FFFF');
	end.show('#FFFF00');

}

function findPath(_end, _current) {
	path.push(_end);
	path.push(_current);
	let current = _current;

	while (true) {
		let foundNext = false;
		for (let i = 0; i < current.neighbors.length; i++) {
			let neighbor = current.neighbors[i];
			if (neighbor.score === current.score - 1 && !neighbor.wall) {
				current = neighbor;
				path.push(current);
				foundNext = true;
				break;
			}
		}

		if (current === start) {
			print("Path found");
			break;
		}

		// If no next step is found, exit the loop to prevent infinite loop
		if (!foundNext) {
			print("Path not found");
			break;
		}
	}

}

function keyPressed() {
	if (key === " ")
		stepForward();
	else if (key === "r")
		setup();
}

function stepForward() {

	if (openSet.length === 0) {
		console.log("No solution");
		noLoop();
		return;
	}
	step++;

	let loopSize = openSet.length;
	for (let i = 0; i < loopSize; i++) {
		let current = openSet[0];

		let neighbors = current.neighbors;

		for (let j = 0; j < neighbors.length; j++) {
			let neighbor = neighbors[j];

			if (neighbor === end) {
				console.log("arrived");
				openSet.push(neighbor);
				findPath(end, current);
				noLoop();
				return;
			} else if (!closeSet.includes(neighbor) && !neighbor.wall) {
				neighbor.score = current.score + 1;
				if (!openSet.includes(neighbor)) {
					openSet.push(neighbor);
				}
			}
		}

		closeSet.push(current);
		openSet.shift();
	}

}

class Spot {
	constructor(_i, _j) {
		this.w = width / cols;
		this.h = height / rows;
		this.i = _i;
		this.j = _j;
		this.x = _i * this.w + this.w / 2;
		this.y = _j * this.h + this.h / 2;
		this.wall = false;
		this.neighbors = [];
		this.visited = false;
		this.score = 0;
	}

	show(_color) {
		strokeWeight(0.5);
		stroke(127);
		if (this.wall) {
			fill(100);
		} else {
			fill(_color);
		}
		rect(this.x, this.y, this.w, this.h);
		if (openSet.includes(this) || closeSet.includes(this)) {
			fill(0);
			text(this.score, this.x, this.y);
		}
	}

	addWall() {
		if (this != start && this != end)
			this.wall = random(1) < 0.25;
	}

	addNeighbors(_spots) {
		if (this.wall === false) {
			if (this.j > 0 && _spots[this.i][this.j - 1].wall === false) {
				this.neighbors.push(_spots[this.i][this.j - 1]);
			}
			if (this.i < cols - 1 && _spots[this.i + 1][this.j].wall === false) {
				this.neighbors.push(_spots[this.i + 1][this.j]);
			}
			if (this.j < rows - 1 && _spots[this.i][this.j + 1].wall === false) {
				this.neighbors.push(_spots[this.i][this.j + 1]);
			}
			if (this.i > 0 && _spots[this.i - 1][this.j].wall === false) {
				this.neighbors.push(_spots[this.i - 1][this.j]);
			}
		}
	}

	visit() {
		this.visited = true;
	}

	isVisited() {
		return this.visited;
	}
}
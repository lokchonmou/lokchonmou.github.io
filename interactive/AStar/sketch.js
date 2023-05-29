const cols = rows = 10;
let spots = [];
let start, end, pathIsFound, path, openSet, closedSet;
let forwardButton, resetButton;
let diagonalCheckBox, diagonal = false;

function setup() {
	createCanvas(600, 600);
	textAlign(CENTER, CENTER);
	rectMode(CENTER);
	displayDensity(pixelDensity());

	path = [];
	openSet = [start];
	closedSet = [];
	loop();

	spots = [];
	for (let i = 0; i < cols; i++) {
		let col = [];
		for (let j = 0; j < rows; j++) {
			col.push(new Spot(i, j));
		}
		spots.push(col);
	}
	start = spots[0][0];
	end = spots[cols - 1][rows - 1];

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (spots[i][j] != start && spots[i][j] != end) {
				spots[i][j].addWall();
			}
		}
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			spots[i][j].addNeighbors(spots);
		}
	}

	pathIsFound = false;
	path = [];
	openSet = [start];
	closedSet = [];
	start.g = 0;
	start.h = heuristic(start, end);
	start.f	= start.g + start.h;

	forwardButton = createButton('Next Step');
	forwardButton.position(width + 10, 10);
	forwardButton.mousePressed(stepForward);

	resetButton = createButton('Reset');
	resetButton.position(width + 10, 40);
	resetButton.mousePressed(setup);

	diagonalCheckBox = createCheckbox('Diagonal', diagonal);
	diagonalCheckBox.position(width + 10, 70);
	diagonalCheckBox.changed(() => {
		diagonal = !diagonal;
	});
}

function draw() {
	background(51);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (openSet.includes(spots[i][j]))
				spots[i][j].show('#99FF99');
			else if (closedSet.includes(spots[i][j]))
				spots[i][j].show('#FF9999');
			else
				spots[i][j].show('#999999');
		}
	}

	for (let spot of path) {
		spot.show('#FF00FF');
	}
	start.show('#00FFFF');
	end.show('#FFFF00');
	if (openSet.length > 0 && !pathIsFound) {
		const lowestIndex = openSet.reduce((min, p, i) => (p.f < openSet[min].f ? i : min), 0);
		const current = openSet[lowestIndex];
		current.show('#00FF55');
	}
}

function heuristic(a, b) {
	if (!diagonal) return abs(a.i - b.i) + abs(a.j - b.j);
	else return dist(a.i, a.j, b.i, b.j);
}

function removeFromArray(arr, elem) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elem) {
			arr.splice(i, 1);
		}
	}
}

function keyPressed() {
	if (key == ' ')
		stepForward();
	else if (key == 'r')
		setup();

}

function stepForward() {
	if (openSet.length > 0 && !pathIsFound) {
		const lowestIndex = openSet.reduce((min, p, i) => (p.f < openSet[min].f ? i : min), 0);
		const current = openSet[lowestIndex];

		if (current === end) {
			pathIsFound = true;
			console.log('Arrived at the end!');
			path = [current];
			let temp = current;
			while (temp.previous) {
				path.push(temp.previous);
				temp = temp.previous;
			}
			console.log('Path is found!');
		} else {
			removeFromArray(openSet, current);
			closedSet.push(current);

			for (let neighbor of current.neighbors) {
				if (!closedSet.includes(neighbor) && !neighbor.wall) {
					let tentativeG = current.g + 1;

					if (openSet.includes(neighbor)) {
						if (tentativeG < neighbor.g) {
							neighbor.g = tentativeG;
						}
					} else {
						neighbor.g = tentativeG;
						openSet.push(neighbor);
					}

					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}
			}
		}
	}
}


class Spot {
	constructor(i, j) {
		this.Width = width / cols;
		this.Height = height / rows;
		this.i = i;
		this.j = j;
		this.x = i * this.Width + this.Width / 2;
		this.y = j * this.Height + this.Height / 2;
		this.wall = false;
		this.neighbors = [];
		this.g = Infinity;
		this.h = 0;
		this.f = 0;
		this.previous = null;
	}

	show(color) {
		strokeWeight(0.5);
		stroke(127);
		if (this.wall) {
			fill(100);
		} else {
			fill(color);
		}
		rect(this.x, this.y, this.Width, this.Height);
		fill(0);
		if (openSet.includes(this) || closedSet.includes(this)) {
			textSize(10);
			text("G:" + nfc(this.g, 0), this.x - this.Width / 3, this.y - this.Height / 3);
			text("H:" + nfc(this.h, 1), this.x + this.Width / 3, this.y - this.Height / 3);
			textSize(16);
			text("F:" + nfc(this.f, 1), this.x, this.y + this.Height / 3);
		}
	}

	addWall() {
		this.wall = random(1) < 0.25;
	}

	addNeighbors(spots) {
		if (this.wall) return;
		const { i, j } = this;
		if (i > 0 && !spots[i - 1][j].wall) this.neighbors.push(spots[i - 1][j]);
		if (i < cols - 1 && !spots[i + 1][j].wall) this.neighbors.push(spots[i + 1][j]);
		if (j > 0 && !spots[i][j - 1].wall) this.neighbors.push(spots[i][j - 1]);
		if (j < rows - 1 && !spots[i][j + 1].wall) this.neighbors.push(spots[i][j + 1]);

		if (diagonal) {
			if (i > 0 && j > 0 && !spots[i - 1][j - 1].wall) this.neighbors.push(spots[i - 1][j - 1]);
			if (i < cols - 1 && j > 0 && !spots[i + 1][j - 1].wall) this.neighbors.push(spots[i + 1][j - 1]);
			if (i > 0 && j < rows - 1 && !spots[i - 1][j + 1].wall) this.neighbors.push(spots[i - 1][j + 1]);
			if (i < cols - 1 && j < rows - 1 && !spots[i + 1][j + 1].wall) this.neighbors.push(spots[i + 1][j + 1]);
		}

	}


}
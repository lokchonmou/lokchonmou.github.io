const cols = rows = 10;
let spots = [];
let start, end, pathIsFound, path, openSet, closedSet;
let forwardButton, resetButton;

function setup() {
	createCanvas(600, 600);
	textAlign(CENTER, CENTER);
	rectMode(CENTER);

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
			spots[i][j].addNeighbors(spots);
		}
	}

	pathIsFound = false;
	path = [];
	openSet = [start];
	closedSet = [];
	start.g = 0;

	forwardButton = createButton('Next Step');
	forwardButton.position(width+10, 10);
	forwardButton.mousePressed(stepForward);

	resetButton = createButton('Reset');
	resetButton.position(width+10, 40);
	resetButton.mousePressed(setup);

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
}

function heuristic(a, b) {
	return abs(a.i - b.i) + abs(a.j - b.j);
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
			text("G:" + str(this.g), this.x - this.Width / 3, this.y - this.Height / 3);
			text("H:" + str(this.h), this.x + this.Width / 3, this.y - this.Height / 3);
			textSize(16);
			text("F:" + str(this.f), this.x, this.y + this.Height / 3);
		}
	}

	addWall() {
		this.wall = random(1) < 0.25;
	}

	addNeighbors(spots) {
		const { i, j } = this;
		if (i > 0) this.neighbors.push(spots[i - 1][j]);
		if (i < cols - 1) this.neighbors.push(spots[i + 1][j]);
		if (j > 0) this.neighbors.push(spots[i][j - 1]);
		if (j < rows - 1) this.neighbors.push(spots[i][j + 1]);
	}


}
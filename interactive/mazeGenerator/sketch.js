// Create a maze generator that uses a depth-first search algorithm to create a maze.
// Recursive backtracker algorithm

let cols = rows = 80; 	// it must be even number, as every 4 spots is a cell
let spots = [];       	// it is actually the grid of map
let wallSpots = [];		// it is the left and top wall of the map
let current;			// current cell
let stack = [];			// stack for backtracking
let cells = [];			// use for backtracking

let solveMaze = false;	// use for solving the maze
let start, end, pathIsFound, path, openSet, closedSet;
let autoPlay = false;

let startBox, resetButton, stepButton;
let sizeSlider;


function setup() {
	createCanvas(600, 600);
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	frameRate(1000);
	displayDensity(pixelDensity());
	colorMode(HSB, 255);

	startBox = createCheckbox('Auto Play');
	startBox.position(610, 10);
	startBox.changed(() => {autoPlay = !autoPlay;});

	resetButton = createButton('Reset');
	resetButton.position(610, 40);
	resetButton.mousePressed(reset);

	stepButton = createButton('Step');
	stepButton.position(610, 70);
	stepButton.mousePressed(AStarStepFroward);

	sizeSlider = createSlider(10, 100, 30, 10);
	sizeSlider.position(610, 100);

	reset();

	// saveCanvas('maze', 'png');

}

function draw() {

	//background(220);

	if (autoPlay) {
		if (!pathIsFound) {
			AStarStepFroward();
		}
	}

	// for (let s of openSet) s.display('#99FF99');

	// only draw the last cloased set
	
	let s = closedSet[closedSet.length - 1];
	if (s) s.display(color(int(s.fCost) % 255, 255, 255));

	if (pathIsFound)
		for (let spot of path) {
			spot.display('#000000');
		}

	// if (openSet.length > 0 && !pathIsFound) {
	// 	const lowestIndex = openSet.reduce((min, p, i) => (p.f < openSet[min].f ? i : min), 0);
	// 	const current = openSet[lowestIndex];
	// 	current.display('#00FF55');
	// }
}

function reset() {
	cols = rows = sizeSlider.value();
	spots = [];       	// it is actually the grid of map
	wallSpots = [];		// it is the left and top wall of the map
	current;			// current cell
	stack = [];			// stack for backtracking
	cells = [];			// use for backtracking
	solveMaze = false;	// use for solving the maze

	// create the top and left wall
	for (let i = -1; i <= cols; i++) wallSpots.push(new Spot(i, -1));
	for (let j = -1; j <= rows; j++) wallSpots.push(new Spot(-1, j));

	// create the grid of map
	for (let i = 0; i < cols; i++) {
		spots[i] = [];
		for (let j = 0; j < rows; j++) spots[i][j] = new Spot(i, j);
	}

	// create the cells
	for (let i = 0; i < cols / 2; i++) {
		cells[i] = [];
		for (let j = 0; j < rows / 2; j++) {
			cells[i][j] = new cell(i, j);
			cells[i][j].addSpots(spots);
		}
	}

	// add neighbors to each cell
	for (let i = 0; i < cols / 2; i++) {
		for (let j = 0; j < rows / 2; j++) {
			cells[i][j].addNeighbor(cells);
		}
	}

	start = spots[0][0];
	end = spots[cols - 2][rows - 2];
	path = [];
	openSet = [start];
	closedSet = [];
	loop();

	// set the current cell
	current = cells[0][0];
	current.Visited();

	stepForward();
	while (stack.length > 0) {
		stepForward();
	}
	console.log("DONE");
	initAStar();

	// display the wall
	for (let w of wallSpots) w.display();
	// display the grid
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			spots[i][j].display('#FFFFFF');
		}
	}
	// start.display('#00FFFF');
	// end.display('#FFFF00');
	
}

function heuristic(a, b) {
	return dist(a.i, a.j, b.i, b.j);
}

function removeFromArray(arr, elem) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elem) {
			arr.splice(i, 1);
		}
	}
}

function AStarStepFroward() {
	if (openSet.length > 0 && !pathIsFound) {
		const lowestIndex = openSet.reduce((min, p, i) => (p.fCost < openSet[min].fCost ? i : min), 0);
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
			noLoop();
		} else {
			removeFromArray(openSet, current);
			closedSet.push(current);

			for (let neighbor of current.neighbors) {
				if (!closedSet.includes(neighbor) && !neighbor.isWall) {
					let tentativeG = current.gCost + 1;

					if (openSet.includes(neighbor)) {
						if (tentativeG < neighbor.gCost) {
							neighbor.gCost = tentativeG;
						}
					} else {
						neighbor.gCost = tentativeG;
						openSet.push(neighbor);
					}

					neighbor.hCost = heuristic(neighbor, end);
					neighbor.fCost = neighbor.gCost + neighbor.hCost;
					neighbor.previous = current;
				}
			}
		}
	}
}

function stepForward() {
	var next = current.checkNeighbors();

	if (next) {
		next.Visited();
		stack.push(current);
		removeWalls(current, next);
		current = next;
	}
	else if (stack.length > 0) {
		current = stack.pop();
	}

}

function initAStar() {
	solveMaze = true;
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			spots[i][j].addNeighbors(spots);
		}
	}
	pathIsFound = false;
	path = [];
	openSet = [start];
	closedSet = [];
	start.gCost = 0;
	start.hCost = heuristic(start, end);
	start.fCost = start.gCost + start.hCost;
}

function removeWalls(a, b) {
	let x = a.i - b.i;
	let y = a.j - b.j;
	if (x === 1) {
		b.cells[1].Visited();
	}
	else if (x === -1) {
		a.cells[1].Visited();
	}
	if (y === 1) {
		b.cells[3].Visited();
	}
	else if (y === -1) {
		a.cells[3].Visited();
	}
}

function keyPressed() {
	if (key == ' ') {
		AStarStepFroward();
	}
}

class Spot {

	constructor(_i, _j) {
		this.i = _i;
		this.j = _j;
		this.w = width / (cols + 1);
		this.h = height / (rows + 1);
		this.x = (_i + 1) * this.w + this.w / 2;
		this.y = (_j + 1) * this.h + this.h / 2;
		this.visited = false;
		this.isWall = true;
		this.neighbors = [];
		this.gCost = Infinity;
		this.hCost = 0;
		this.fCost = 0;
		this.previous = null;
	}

	display(_color) {
		if (this.isWall) {
			fill('#AAAAAA');
			stroke('#AAAAAA');
		}
		else {
			stroke(_color);
			fill(_color);
		}
		rect(this.x, this.y, this.w, this.h);
		fill(0);
		noStroke();
		// if (openSet.includes(this) || closedSet.includes(this)) {
		// 	textSize(10);
		// 	text("G:" + nfc(this.gCost, 0), this.x - this.w / 3, this.y - this.h / 3);
		// 	text("H:" + nfc(this.hCost, 1), this.x + this.w / 3, this.y - this.h / 3);
		// 	textSize(10);
		// 	text("F:" + nfc(this.fCost, 1), this.x, this.y + this.h / 3);
		// }
	}

	highLight() {
		stroke('#FF0000');
		fill('#FF0000');
		rect(this.x, this.y, this.w, this.h);
	}

	addNeighbors(spots) {
		if (this.isWall) return;
		const { i, j } = this;
		if (i > 0 && !spots[i - 1][j].isWall) this.neighbors.push(spots[i - 1][j]);
		if (i < cols - 1 && !spots[i + 1][j].isWall) this.neighbors.push(spots[i + 1][j]);
		if (j > 0 && !spots[i][j - 1].isWall) this.neighbors.push(spots[i][j - 1]);
		if (j < rows - 1 && !spots[i][j + 1].isWall) this.neighbors.push(spots[i][j + 1]);


	}

	Visited() {
		this.visited = true;
		this.isWall = false;
	}

	isVisited() {
		return this.visited;
	}

	isWall() {
		return this.isWall;
	}


}

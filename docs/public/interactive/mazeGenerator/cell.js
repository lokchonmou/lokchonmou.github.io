class cell{
     // every 4 spots is a cell
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        
        this.cells = [null, null, null, null];
        this.neighbors = [null, null, null, null];
        this.visited = false;
    }

    addNeighbor(_cells) {
        let i = this.i;
        let j = this.j;
        let cells = _cells;
        if (j > 0) this.neighbors[0] = cells[i][j - 1]; // top
        if (i < cols/2 - 1) this.neighbors[1] = cells[i + 1][j]; // right
        if (j < rows/2 - 1) this.neighbors[2] = cells[i][j + 1]; // bottom
        if (i > 0) this.neighbors[3] = cells[i - 1][j]; // left
    }

    addSpots(_spots) {
        // every 4 spots is a cell
        let i = this.i;
        let j = this.j;
        let spots = _spots;
        this.cells[0] = spots[i * 2][j * 2]; // top left
        this.cells[1] = spots[i * 2 + 1][j * 2]; // top right
        this.cells[2] = spots[i * 2 + 1][j * 2 + 1]; // bottom right
        this.cells[3] = spots[i * 2][j * 2 + 1]; // bottom left
    }

    Visited() {
		this.visited = true;
        this.cells[0].visited = true;
        this.cells[0].isWall = false;
	}

    isVisited(){
		return this.visited;
	}

    highLight() {
        this.cells[0].highLight();
    }

    checkNeighbors() {
        // while the current cell has any unvisited neighbor cells
        let unvisitedNeighbors = [];
        for (let i = 0; i < this.neighbors.length; i++)
            if (this.neighbors[i] != null && !this.neighbors[i].isVisited())
                unvisitedNeighbors.push(this.neighbors[i]);
    
        if (unvisitedNeighbors.length > 0) 
            return random(unvisitedNeighbors);
    
    }

}
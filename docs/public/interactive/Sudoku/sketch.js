// create a Sudoku game
let grid;
let timer;

function setup() {
	createCanvas(displayWidth, displayHeight);
	pixelDensity(displayDensity());

	print("Start");
	timer = millis();
	grid = initializeGrid();
	print("End " + (millis() - timer));
	digHoles(grid, 45);
	displayGrid(grid, '#FFFFFF');
}

function draw() {

}

function displayGrid(grid, color) {
	if (displayWidth > displayHeight) Width = (displayHeight - 200) / 9;
	else Width = (displayWidth - 200) / 9;

	for (let x = 0; x < 9; x++) {
		for (let y = 0; y < 9; y++) {
			fill(color);
			stroke(0);
			rect(x * Width, y * Width, Width, Width);
			if (grid[y][x] !== 0) { // 檢查格子的值是否不為0
				fill(0); // 設置文字顏色
				textSize(Width / 2); // 設置文字大小
				textAlign(CENTER, CENTER); // 設置文字對齊方式
				text(grid[y][x], x * Width + Width / 2, y * Width + Width / 2); // 在格子中心顯示數字
			}
		}
	}

	// for every 3x3 square, draw a thicker line
	for (let x = 0; x < 9; x += 3) {
		for (let y = 0; y < 9; y += 3) {
			strokeWeight(4);
			line(x * Width, y * Width, x * Width, (y + 3) * Width);
			line(x * Width, y * Width, (x + 3) * Width, y * Width);
			strokeWeight(1);
		}
	}
}

function isValid(grid, row, col, num) {
	for (let x = 0; x < 9; x++) {
		if (grid[row][x] === num || grid[x][col] === num) {
			return false;
		}
	}
	let startRow = row - row % 3;
	let startCol = col - col % 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[i + startRow][j + startCol] === num) {
				return false;
			}
		}
	}
	return true;
}

function solveSudoku(grid, row, col) {
	if (row === 9 - 1 && col === 9) {
		return true;
	}
	if (col === 9) {
		row++;
		col = 0;
	}
	if (grid[row][col] !== 0) {
		return solveSudoku(grid, row, col + 1);
	}
	let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	numbers = shuffleArray(numbers); // 隨機打亂數字順序
	for (let i = 0; i < numbers.length; i++) {
		let num = numbers[i];
		if (isValid(grid, row, col, num)) {
			grid[row][col] = num;
			if (solveSudoku(grid, row, col + 1)) {
				return true;
			}
			grid[row][col] = 0;
		}
	}
	return false;
}

// 實現一個函數來隨機打亂一個陣列
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // 交換元素
	}
	return array;
}


// 在 initializeGrid 函數中調用 solveSudoku
function initializeGrid() {
	let grid = [];
	for (let i = 0; i < 9; i++) {
		grid[i] = [];
		for (let j = 0; j < 9; j++) {
			grid[i][j] = 0;
		}
	}
	solveSudoku(grid, 0, 0);
	return grid;
}

function digHoles(grid, holes) {
	let attempts = holes;
	while (attempts > 0) {
		let row = Math.floor(Math.random() * 9);
		let col = Math.floor(Math.random() * 9);
		if (grid[row][col] !== 0) {
			let backup = grid[row][col];
			grid[row][col] = 0;

			// 複製一份grid用於檢查是否有唯一解
			let gridCopy = JSON.parse(JSON.stringify(grid));
			if (!hasUniqueSolution(gridCopy)) {
				// 如果沒有唯一解，恢復原來的數字
				grid[row][col] = backup;
			} else {
				attempts--;
			}
		}
	}
}

function hasUniqueSolution(grid) {
	return true;
}
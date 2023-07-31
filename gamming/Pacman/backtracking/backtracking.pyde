# A demo of backtracking maze generator

from random import *

cols = rows = 20
spots = []
cells = []
wallSpots = []
current = None
stack = []


def setup():
    global spots, cells, wallSpots, current
    size(630, 630)
    rectMode(CENTER)
    frameRate(10)

    # create the left and top wall
    for i in range(-1, cols):
        wallSpots.append(Spot(i, -1)) 
    for j in range(-1, rows):
        wallSpots.append(Spot(-1, j)) 

    # create new spots
    for i in range(cols):
        temp = []
        for j in range(rows):
            temp.append(Spot(i, j))
        spots.append(temp)

    # create new cells
    for i in range(cols/2):
        temp = []
        for j in range(rows/2):
            temp.append(Cell(i, j))
        cells.append(temp)

    # add spots to each cell and add neighbors to each cell
    for i in range(cols/2):
        for j in range(rows/2):
            cells[i][j].addSpots(spots)
            cells[i][j].addNeighbors(cells)

    # start from the top left cell
    current = cells[0][0]
    current.visited = True


def draw():
    global current, stack

    # display the wall
    for spot in wallSpots:
        spot.wall = True
        spot.show()
    
    # display the cells
    for i in range(cols):
        for j in range(rows):
            spots[i][j].show()

     # display the current cell
    current.highLight()
   
    # generate the maze
    unvisitedNeighbors = current.checkNeighbors()
    if len(unvisitedNeighbors) > 0:
            next = choice(unvisitedNeighbors)
            stack.append(current)
            removeWall(current, next)
            next.visited = True
            current = next
    elif len(stack) > 0:
        current = stack.pop()
        
   

def removeWall(a, b):
    x = a.i - b.i
    y = a.j - b.j

    if x == 1: # a is on the right of b
        b.cells[1].wall = False
    if x == -1: # a is on the left of b
        a.cells[1].wall = False
    if y == 1: # a is below b
        b.cells[3].wall = False
    if y == -1: # a is above b
        a.cells[3].wall = False



class Spot(object):

    def __init__(self, _i, _j):
        self.i = _i
        self.j = _j
        self.w = width / (cols + 1)
        self.h = height / (rows + 1)
        self.x = (self.i+1) * self.w + self.w / 2
        self.y = (self.j+1) * self.h + self.h / 2
        self.wall = False

    def show(self):
        stroke('#555555')
        if self.wall:
            fill('#999999')
        else:
            fill(255)
        rect(self.x, self.y, self.w, self.h)

    def highLight(self):
        stroke('#555555')
        fill('#FF0000')
        rect(self.x, self.y, self.w, self.h)


class Cell(object):
    # every cell has 4 spots
    def __init__(self, _i, _j):
        self.i = _i
        self.j = _j
        self.cells = [None, None, None, None]
        self.neighbors = []
        self.visited = False

    def addSpots(self, _spots):
        # every cell has 4 spots, the bottom right is always wall
        i = self.i
        j = self.j
        self.cells[0] = _spots[i*2][j*2]  # top left
        self.cells[1] = _spots[i*2+1][j*2]  # top right
        self.cells[2] = _spots[i*2+1][j*2+1]  # bottom right
        self.cells[3] = _spots[i*2][j*2+1]  # bottom left
        
        self.cells[1].wall = True
        self.cells[2].wall = True
        self.cells[3].wall = True

    def addNeighbors(self, _cells):
        i = self.i
        j = self.j
        self.neighbors.append(_cells[i-1][j]) if i > 0 else None
        self.neighbors.append(_cells[i][j+1]) if j < rows/2-1 else None
        self.neighbors.append(_cells[i+1][j]) if i < cols/2-1 else None
        self.neighbors.append(_cells[i][j-1]) if j > 0 else None

    def isVisited(self):
        return self.visited

    def checkNeighbors(self):
        unvisitedNeighbors = []
        for neighbor in self.neighbors:
            if not neighbor.isVisited():
                unvisitedNeighbors.append(neighbor)

        return unvisitedNeighbors

    def highLight(self):
        self.cells[0].highLight()
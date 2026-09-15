# A demo of the A* pathfinding algorithm.
cols = rows = 40
spots = []
start = end = None
openSet = []
closeSet = []
path = []

def setup():
    global start, end, spots, openSet, closeSet
    size(800, 800)
    rectMode(CENTER)
    textAlign(CENTER, CENTER)
    frameRate(120)

    spots = [[Spot(i, j) for j in range(cols)] for i in range(rows)]

    start = spots[0][0]
    end = spots[cols-1][rows-1]

    for i in range(rows):
        for j in range(cols):          
            spots[i][j].addWall() 

    for i in range(rows):
        for j in range(cols):
            spots[i][j].addNeighbors(spots)

    openSet = [start]
    closeSet = []
    start.gCost = 0
    


def draw():
    global path
    background(0)

    # if openSet is empty, then no solution
    if len(openSet) == 0:
        print("no solution")
        noLoop()
        return
    
    # find the lowest index of openset
    lowestIndex = 0
    for i in range(len(openSet)):
        if openSet[i].fCost < openSet[lowestIndex].fCost:
            lowestIndex = i
    
    current = openSet[lowestIndex]

    # if current is the end, then find the path
    if current == end:
        print("find the path")
        path = [current]
        temp = current
        while temp.previous: # only the start has no previous
            path.append(temp.previous)
            temp = temp.previous
        print("path is found!")
        noLoop()
       
    # update the current spot
    # 1. remove it from openSet
    # 2. add it to closeSet
    # 3. find its neighbors
    # 4. calculate the gCost, hCost, fCost
    # 5. update the previous spot
    # 6. add it to openSet
    openSet.remove(current)
    closeSet.append(current)
    for neighbor in current.neighbors:
        if neighbor not in closeSet and not neighbor.wall:
            tempGCost = current.gCost + 1
            if neighbor in openSet:
                if tempGCost < neighbor.gCost:
                    neighbor.gCost = tempGCost
            else:
                neighbor.gCost = tempGCost
                openSet.append(neighbor)
            neighbor.hCost = walkingDist(neighbor, end)
            neighbor.fCost = neighbor.gCost + neighbor.hCost
            neighbor.previous = current

    colorMode(HSB, 255)
    for i in range(rows):
        for j in range(cols):
            if spots[i][j] in openSet:
                spots[i][j].show('#99FF99')
            elif spots[i][j] in closeSet:
                spots[i][j].show(color(map(spots[i][j].gCost, 0, cols + rows, 0, 255), 255, 255))
            else:
                spots[i][j].show('#AAAAAA')

    # draw the path
        for p in path:
            p.show('#9999FF')

    start.show('#00FFFF')
    end.show('#FFFF00')

def walkingDist(_spot1, _spot2):
    return abs(_spot1.i - _spot2.i) + abs(_spot1.j - _spot2.j)

class Spot:

    def __init__(self, _i, _j):
        self.w = width/cols
        self.h = height/rows
        self.i = _i
        self.j = _j
        self.x = self.i * self.w + self.w/2
        self.y = self.j * self.h + self.h/2
        self.wall = False
        self.neighbors = []
        self.gCost = float('inf')
        self.hCost = 0
        self.fCost = 0
        self.previous = None

    def show(self, _color):
        fill(_color)
        if self.wall:
            fill(127)
        stroke(127)
        strokeWeight(0.5)
        rect(self.x, self.y, self.w, self.h)
        # if self in openSet or self in closeSet:
        #     fill(0)
        #     noStroke()
        #     textSize(12)
        #     text("G:" + str(self.gCost), self.x - self.w/3, self.y-self.h/3)
        #     text("H:" + str(self.hCost), self.x + self.w/3, self.y-self.h/3)
        #     textSize(18)
        #     text("F:" + str(self.fCost), self.x, self.y+self.h/3)

    def addWall(self):
        if self != start and self != end:
            self.wall = True if random(1) < 0.25 else False

    def addNeighbors(self, _spots):
        i = self.i
        j = self.j
        if i < cols - 1 and not _spots[i+1][j].wall:
            self.neighbors.append(_spots[i+1][j])
        if i > 0 and not _spots[i-1][j].wall:
            self.neighbors.append(_spots[i-1][j])
        if j < rows - 1 and not _spots[i][j+1].wall:
            self.neighbors.append(_spots[i][j+1])
        if j > 0 and not _spots[i][j-1].wall:
            self.neighbors.append(_spots[i][j-1])

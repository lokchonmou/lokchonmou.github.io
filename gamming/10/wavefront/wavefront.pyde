# A demo about wavefront algorithm

cols = rows = 40
spots = []
start = end = None
pathIsFound = False
path = []
queue = []


def setup():
    global spots, start, end
    size(800, 800)
    textAlign(CENTER, CENTER)
    rectMode(CENTER)
    spots = [[Spot(i, j) for j in range(rows)] for i in range(cols)]

    start = spots[0][0]
    end = spots[cols-1][rows-1]

    for i in range(cols):
        for j in range(rows):
            if spots[i][j] != start and spots[i][j] != end:
                spots[i][j].addWall()
            spots[i][j].addNeighbors(spots)

    start.visit()
    queue.append(start)


def draw():
    global pathIsFound, path, queue

    if len(queue) == 0:
        noLoop()
        return

    background(51)

    current = queue.pop(0)

    for neighbor in current.neighbors:
        if neighbor == end:
            pathIsFound = True
            print('Avrrived at the end!')
            path.append(neighbor)
            path.append(current)
            while current != start:
                for neighbor in current.neighbors:
                    if neighbor.score == current.score - 1 and not neighbor.wall:
                        path.append(neighbor)
                        current = neighbor
                        break
            print('Path is found!')
            noLoop()
        else:
            if not neighbor.isVisited() and not neighbor.wall:
                neighbor.visit()
                neighbor.score = current.score + 1
                queue.append(neighbor)

    for i in range(cols):
        for j in range(rows):
            colorMode(HSB)
            if spots[i][j].score == 0:
                spots[i][j].show('#AAAAAA')
            else:
                spots[i][j].show(
                    color(map(spots[i][j].score, 0, cols+rows, 0, 255), 255, 255))
    for spot in path:
        spot.show('#FF00FF')
    start.show('#00FFFF')
    end.show('#FFFF00')


class Spot:

    def __init__(self, _i, _j):
        self.w = width/cols
        self.h = height/rows
        self.i = _i
        self.j = _j
        self.x = _i * self.w + self.w/2
        self.y = _j * self.h + self.h/2
        self.wall = False
        self.neighbors = []
        self.visited = False
        self.score = 0

    def show(self, _color):
        # strokeWeight(0.5)
        # stroke(127)
        noStroke()
        if self.wall:
            fill(100)
        else:
            fill(_color)
        rect(self.x, self.y, self.w, self.h)
        # fill(0)
        # text(self.score, self.x, self.y)

    def addWall(self):
        self.wall = True if random(1) < 0.25 else False

    def addNeighbors(self, _spots):
        if self.wall == False:
            if self.j > 0 and _spots[self.i][self.j-1].wall == False:
                self.neighbors.append(_spots[self.i][self.j-1])
            if self.i < cols-1 and _spots[self.i+1][self.j].wall == False:
                self.neighbors.append(_spots[self.i+1][self.j])
            if self.j < rows-1 and _spots[self.i][self.j+1].wall == False:
                self.neighbors.append(_spots[self.i][self.j+1])
            if self.i > 0 and _spots[self.i-1][self.j].wall == False:
                self.neighbors.append(_spots[self.i-1][self.j])

    def visit(self):
        self.visited = True

    def isVisited(self):
        return self.visited

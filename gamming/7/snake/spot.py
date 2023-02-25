class Spot(object):

    def __init__(self, _x, _y, _w, _h):
        self.x = _x
        self.y = _y
        self.w = _w
        self.h = _h
        self.neighbors = []
        for i in range(4):
            self.neighbors.append(0)

    def show(self, _color):
        noStroke()
        fill(_color)
        rect(self.x*width/20, self.y*height/20, self.w, self.h)

    def addNeighbors(self, _grid):
        #UP
        if (self.y > 0):
            self.neighbors[0] = _grid[self.x][self.y-1]
        # RIGHT
        if (self.x < 19):    # Total 20x20, so the max id is 19
            self.neighbors[1] = _grid[self.x+1][self.y]
        # DOWN
        if (self.y < 19):    # Total 20x20, so the max id is 19
            self.neighbors[2] = _grid[self.x][self.y+1]
        # LEFT
        if (self.x > 0):
            self.neighbors[3] = _grid[self.x-1][self.y]

        if (self.y == 0):
            self.neighbors[0] = _grid[self.x][19]
        if (self.x == 19):
            self.neighbors[1] = _grid[0][self.y]
        if (self.y == 19):
            self.neighbors[2] = _grid[self.x][0]
        if (self.x == 0):
            self.neighbors[3] = _grid[19][self.y]
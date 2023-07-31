class Snake(object):
    
    def __init__(self, _grids):
        self.grids = _grids
        self.snakeHead = self.grids[10][10]

        self.dirID = 3  #[0:UP, 1:RIGHT, 2: DOWN, 3: LEFT]
        self.next = 0

        self.snakeBody = []
        for i in range(3,0,-1):
            self.snakeBody.append(self.grids[10+i][10])

        self.gameOver = False
        self.reward = False
        self.score = 0

    def show(self):
        
        for i in range(len(self.snakeBody)):
            self.snakeBody[i].show('#00FF00')
        self.snakeHead.show('#00AA00')

        self.next = self.snakeHead.neighbors[self.dirID]
        self.snakeBody.append(self.snakeHead)
        self.snakeHead = self.next
        if (not self.reward):
            self.snakeBody.pop(0)
        else:
            self.score += 1
            self.reward = False
    
    def check(self):
        if self.next in self.snakeBody:
            self.gameOver = True
        
    def ate(self, _apples):
        if (self.next in _apples):
            self.reward = True
            return True
        else:
            self.reward = False
            return False

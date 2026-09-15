from spot import *
from gameBoard import *

gridSize = 40

gameBoard = 0

def setup():
    global gameBoard, timer
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()
   
def draw():
    drawBackground()
    gameBoard.update()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)

def keyPressed():
    if (key == CODED):
        if keyCode == LEFT:
            gameBoard.clearGrid()
            gameBoard.block.goLeft()
        if keyCode == RIGHT:
            gameBoard.clearGrid()
            gameBoard.block.goRight()
        if keyCode == UP:
            gameBoard.clearGrid()
            gameBoard.block.rotate()
        if keyCode == DOWN:
            while  not (gameBoard.block.isWall(2) or gameBoard.block.isBlocked(2)):
                gameBoard.clearGrid()
                gameBoard.block.goDown()
            gameBoard.block.setType()
            gameBoard.block.setLock()
            gameBoard.block = Block(3,0,gameBoard.shapeIndex[int(random(7))], gameBoard.grids)
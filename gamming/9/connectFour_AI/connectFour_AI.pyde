from spot import *
from gameBoard import *

gameBoard = 0


def setup():
    global grids, gameBoard

    size(700, 600)
    ellipseMode(CENTER)
    frameRate(10)

    gameBoard = GameBoard()


def draw():
    background(200)
    gameBoard.display()
   

def mousePressed():
    global gameBoard
    for i in range(7):
        if (mouseX > width/7*i and mouseX < width/7*(i+1)):
            gameBoard.trigger(i)
            if gameBoard.currentPlayer == 'Y':
                    gameBoard.brain.autoPlay()

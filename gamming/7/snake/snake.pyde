from spot import *
from snake import *

grids = []
snake = 0
apples = []

def setup():
    global grids, snake, currentSpot, snake, apples
    size(600,600)
    frameRate(10)
    
    grids = []

    for x in range(20):
        tempGrids = []
        for y in range(20):
            tempGrids.append(Spot(x, y, width/20, height/20))
        grids.append(tempGrids)

    for x in range(20):
        for y in range(20):
            grids[x][y].addNeighbors(grids)
            
    snake = Snake(grids)

    apples = []
    apples.append(addApple())

    
def draw():
    global grids, snake, currentSpot, gameOver

    if (snake.gameOver == False):
        background(50)

        for x in range(20):
            for y in range(20):
                grids[x][y].show('#29A9FC')

        for a in apples:
            a.show('#FF3939')

        snake.show()
        snake.check()
        if snake.ate(apples):
            removeID = apples.index(snake.next)
            apples.pop(removeID)
            apples.append(addApple())
        
        textSize(40)
        textAlign(CENTER, CENTER)
        fill('#FFFFFF')
        text(snake.score, width/2, 12)
    else:
        textSize(128)
        textAlign(CENTER, CENTER)
        fill('#FF0000')
        text("GAME" + '\n' + "OVER", width/2, height/2)

def keyPressed():
    if (key == CODED and keyCode == UP):
        snake.dirID = 0
    if (key == CODED and keyCode == RIGHT):
        snake.dirID = 1
    if (key == CODED and keyCode == DOWN):
        snake.dirID = 2
    if (key == CODED and keyCode == LEFT):
        snake.dirID = 3
    
    if (key == 'r' or key == 'R'):
        setup()

def addApple():
    tempSpot = grids[int(random(20))][int(random(20))]
    
    if (tempSpot in snake.snakeBody or tempSpot == snake.snakeHead or tempSpot in apples):
        println("redraw")
        addApple()
    
    return tempSpot

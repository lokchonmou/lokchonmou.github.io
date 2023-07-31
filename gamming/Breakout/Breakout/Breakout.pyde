ballPos = PVector()
ballVec = PVector()

beam = PVector()
beamWidth = 100

brickPos = []
brickState = [] 
brickWidth = 0
brickHeight = 0
brickColor = ["#C54846","#CE7238","#BB7C2F","#A29B27","#429143","#4350CC"]

gameOver = False

def setup():
    global ballPos, ballVec, beam, brickPos, brickWidth, brickHeight, brickState
    
    size(800, 600)
    
    ballPos = PVector(width/2, height-20)
    ballVec = PVector(random(-5,5), -5)
    
    beam = PVector(width/2, height-15)
    rectMode(CENTER)
    
    brickWidth = width/16
    brickHeight = 20
    
    for i in range(6):
        elements = []
        for j in range(16):
            elements.append(PVector(j*brickWidth+brickWidth/2, i*brickHeight+50))
        brickPos.append(elements)
        
    for i in range(6):
        stateElements = []
        for j in range(16):
            stateElements.append(True)
        brickState.append(stateElements)
        
    gameOver = False    
                             
def draw():
    if not gameOver:
        runGame()
        checkIfWin()
        checkIfLose()

def isInBox(_ballPos, _brickPos):
    x = _ballPos.x
    y = _ballPos.y
    bX = _brickPos.x
    bY = _brickPos.y
    w = brickWidth
    h = brickHeight
    
    if x >= bX - w/2 and x <= bX + w/2 and y >= bY - h/2 and y <= bY + h/2:
        return True
    
def runGame():
    global ballPos, ballVec, beam, brickPos, brickWidth, brickHeight, brickState
    
    background(30)
        
    ballPos = ballPos.add(ballVec)
    beam = PVector(mouseX, beam.y)
    
    if (ballPos.x <= 0 or ballPos.x >= width):
        ballVec.x *= -1
    if ballPos.y <=0:
        ballVec.y *= -1
    
    if ballPos.x >= beam.x - beamWidth/2 and ballPos.x <= beam.x + beamWidth/2 and ballPos.y >= height-15:
        ballVec.y *= -1
        ballVec.x += random(-5,5)
    
    fill(198, 73, 75)
    noStroke()
    rect(ballPos.x, ballPos.y, 20, 20)
    rect(beam.x, beam.y, beamWidth, 10)
    
    for i in range(6):
        fill(brickColor[i])
        for j in range(16):
            if isInBox(ballPos, brickPos[i][j]):
                brickState[i][j] = False
            if brickState[i][j]:
                rect(brickPos[i][j].x, brickPos[i][j].y, brickWidth, brickHeight)

def checkIfLose():
    global gameOver
    if (ballPos.y >= height):
        gameOver = True
        textSize(48)
        textAlign(CENTER, CENTER)
        text("GAME OVER", width/2, height/2)

def checkIfWin():
    global gameOver
    
    hasTrue = False
    
    for i in range(6):
        for j in range(16):
            hasTrue = hasTrue or brickState[i][j]
    
    if hasTrue == False:
        gameOver = True
        textSize(48)
        textAlign(CENTER, CENTER)
        text("YOU WIN", width/2, height/2)

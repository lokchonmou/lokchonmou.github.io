ballX = 0
ballY = 0
ballSpeedX = 0
ballSpeedY = 0

player1X = 0
player1Y = 0

player2X = 0
player2Y = 0

score1 = 0
score2 = 0

Keys = [False, False, False, False, False]

def setup():
    global ballX, ballY, ballSpeedX, ballSpeedY, player1X, player1Y,  player2X, player2Y, score1, score2
    
    size(800, 600)
    ballX = width/2
    ballY = height/2
    ballSpeedX = -1
    ballSpeedY = random(-2, 2)
    
    player1X = 10
    player1Y = height/2
    
    player2X = width - 10
    player2Y = height/2
    
    score1 = 0
    score2 = 0
    
    
def draw():
    global ballX, ballY, ballSpeedX, ballSpeedY, player1X, player1Y, player2X, player2Y, score1, score2
    
    background(30)
    ballX += ballSpeedX
    ballY += ballSpeedY
    
    if ballY <= 0 or ballY >= height:
        ballSpeedY *= -1
    
    if ballX <= 10 and ballY >= player1Y - 25 and ballY <= player1Y +25:
        ballSpeedX *= -1
    
    if ballX >= width - 10 and ballY >= player2Y - 25 and ballY <= player2Y +25:
        ballSpeedX *= -1
        
    if ballX <=0:
        score2 += 1
        ballX  = width/2
        ballY = height/2
        ballSpeedX = 1
        ballSpeedY = random(2, -2)

    if ballX >= width:
        score1 += 1
        ballX  = width/2
        ballY = height/2
        ballSpeedX = 1
        ballSpeedY = random(2, -2)   
    
    ellipse(ballX, ballY, 15,15)
    
    if Keys[0] and player1Y > 0:
        player1Y -=3
    if Keys[1] and player1Y < height:
        player1Y +=3
    if Keys[2] and player2Y > 0:
        player2Y -=3
    if Keys[3] and player2Y < height:
        player2Y +=3
    if Keys[4]:
        setup()
  
    rectMode(CENTER)
    rect(player1X, player1Y, 10, 50)
    rect(player2X, player2Y, 10, 50)
    
    textSize(60)
    textAlign(CENTER, CENTER)
    text(score1, width/4, 50)
    text(score2, width*3/4, 50)
    stroke(255)
    line(width/2, 10, width/2, height - 10)
        
def setKey(input, state):
    if input == 'W' or input == 'w':
        Keys[0] = state
    if input == 'S' or input == 's':
        Keys[1] = state
    if input == 'O' or input == 'o':
        Keys[2] = state
    if input == 'L' or input == 'l':
        Keys[3] = state
    if input == 'R' or input == 'r':
        Keys[4] = state

def keyPressed():
  setKey(key, True)


def keyReleased():
  setKey(key, False)
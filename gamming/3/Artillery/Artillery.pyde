player1Height = 0
player2Height = 0

Round = 0 #player1 or player2
ballPos = PVector() # position of cannonball
ballVec = PVector() # velocity of cannonball
ballAccel = PVector(0, 0.1) # acceleration of cannonball
                          #由於processing.py的y軸是向下的, 所以不需要轉成負數

windAccel = PVector()

tankSize = 100 #the size of rect of the tanks

trigger = False

score1 = 0
score2 = 0

def setup():
    global player1Height, player2Height, score1, score2
    
    size(800, 600)
    
    player1Height = random(height*0.2, height*0.8)
    player2Height = height - player1Height
    
    score1 = 0
    score2 = 0
    
    reset(2)
    
def draw():
    global ballPos, ballVec, score1, score2
    
    background(30)
    
    # draw the velocity arrow
    if not trigger:
        if Round == 1:
            stroke(255, 255, 0) #框線顏色
            strokeWeight(3)  #框線粗度度
            line(100, player1Height, 100 + ballVec.x * 10, player1Height + ballVec.y * 10)    
        elif Round == 2:
            stroke(255, 255, 0) #框線顏色
            strokeWeight(3)  #框線粗度度
            line(width-100, player2Height, width-100 + ballVec.x * 10, player2Height + ballVec.y * 10)  
    
    # draw the tanks
    rectMode(CENTER)
    noStroke()  #沒有框線
    fill(255, 0, 0)
    rect(100, player1Height, tankSize, tankSize)
    fill(0, 0, 255)
    rect(width - 100, player2Height, tankSize, tankSize)
    
    # draw the cannonball
    if trigger:
        # update the cannonball
        ballVec = ballVec.add(ballAccel)
        ballVec = ballVec.add(windAccel)
        ballPos = ballPos.add(ballVec)
        
        # draw the cannonball
        noStroke() #無框線
        fill(127)  #灰色
        ellipse(ballPos.x, ballPos.y, 20, 20)
    
    # draw the ground
    rectMode(CORNERS)  #use corner to corner mode
    noStroke()  #沒有框線
    fill(0, 255, 0)
    rect(0, player1Height + tankSize/2, width/2, height)
    rect(width/2, player2Height + tankSize/2, width, height)
    
    # cannonball hit the player1 ground
    hitP1Ground = isHitGround(ballPos, PVector(0, player1Height+ tankSize/2), PVector(width/2, height))
    # cannonball hit the player1 ground
    hitP2Ground = isHitGround(ballPos, PVector(width/2, player2Height+ tankSize/2), PVector(width, height))
    # cannonball hit player1 ground or player2 ground
    if hitP1Ground or hitP2Ground:
        reset(Round)
    
    hitP1 = isHitPlayer(ballPos, PVector(100, player1Height), tankSize)
    if hitP1 and Round == 2:
        score2 += 1
        reset(2)
    hitP2 = isHitPlayer(ballPos, PVector(width-100, player2Height), tankSize)
    if hitP2 and Round == 1:
        score1 += 1
        reset(1)
    
    textSize(50)
    textAlign(CENTER, CENTER)
    if Round == 1:
        fill(255, 0, 0)
    elif Round == 2:
        fill(0, 0, 255)
    text(score1, width/4, 50)
    text(score2, width*3/4, 50)
    
def keyPressed():
    global ballVec, trigger
    if Round == 1 and not trigger:
        if key == 'W' or key == 'w':
            ballVec = ballVec.mult(1.1)
            ballVec.limit(10)
        if key == 'S' or key == 's':
            ballVec = ballVec.mult(0.9)
        if key == 'A' or key == 'a':
            ballVec = ballVec.rotate(radians(-5))
        if key == 'D' or key == 'd':
            ballVec = ballVec.rotate(radians(5))
     
    if Round == 2 and not trigger and key == CODED:
        if keyCode == UP:
            ballVec = ballVec.mult(1.1)
            ballVec.limit(10)
        if keyCode == DOWN:
            ballVec = ballVec.mult(0.9)
        if keyCode == LEFT:
            ballVec = ballVec.rotate(radians(-5))
        if keyCode == RIGHT:
            ballVec = ballVec.rotate(radians(5))
                 
    if key == ' ':
        trigger = not trigger
    if key == 'R' or key == 'r':
        setup()
            
def isHitGround(_ballPos, _topLeftCorner, _bottomRightCorner):
    if _ballPos.x > _topLeftCorner.x and _ballPos.y > _topLeftCorner.y and _ballPos.x < _bottomRightCorner.x  and _ballPos.y < _bottomRightCorner.y:
        return True
    else:
        return False
    
def isHitPlayer(_ballPos, _tankCenter, _tankSize):
    if _ballPos.x > _tankCenter.x-_tankSize/2 and _ballPos.y > _tankCenter.y-_tankSize/2 and _ballPos.x < _tankCenter.x+_tankSize/2 and _ballPos.y < _tankCenter.y+_tankSize/2:
        return True
    else:
        return False
    
def reset(_Round):
    global ballPos, ballVec, Round, trigger, windAccel
    if _Round == 1:
        ballPos = PVector(width-100, player2Height)
        Round = 2
        ballVec = PVector(-2.5, 0) #一開始指向水平右方,速度為-2.5
    elif _Round == 2:
        ballPos = PVector(100, player1Height)
        Round = 1
        ballVec = PVector(2.5, 0) #一開始指向水平右方,速度為2.5
        
    trigger = False
    windAccel = PVector(random(-0.01, 0.01), 0)

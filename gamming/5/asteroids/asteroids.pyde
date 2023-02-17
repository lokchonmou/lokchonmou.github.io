from rocket import *
from bullet import *
from rock import *

rocket = 0
bullets = []
rocks = []
enemy = 0
timer = 0
timer1 = 0

def setup():
    global rocket, bullets, rocks, enemy;
    size(800,800)
    frameRate(60)
    rocket = Rocket()
    bullets = []
    rocks = []
    enemy = Rocket()

    for i in range(3):
        rocks.append(Rock(3))
    for i in range(2):
        rocks.append(Rock(2))

def draw():
    global timer, timer1

    background(50)
    
    if (keyPressed and key == CODED):
        if (keyCode == LEFT):
            rocket.rotateRocket(-5)
        if (keyCode == RIGHT):
            rocket.rotateRocket(5)
        if (keyCode == UP):
            rocket.propulsion() 
    else:
        rocket.isPropulsion = False

    rocket.update()
    rocket.show()

    for b in bullets:
        b.update()
        b.show()
        if (b.pos.x > width or b.pos.x < 0 or b.pos.y > height or b.pos.y <0):
            bullets.remove(b)
    
    for r in rocks:
        for b in bullets:
            if (PVector.dist(b.pos, r.pos) < pow(3, r.level)*2):
                if (r.level > 1):
                    for i in range(2):
                        temp = Rock(r.level-1)
                        temp.pos = r.pos
                        rocks.append(temp)
                bullets.remove(b)
                rocks.remove(r)
                break #跳出迴圈, 不用運算全部子彈
        
    for r in rocks:
        r.update()
        r.show()
    
    enemy2rocketAngle = PVector.sub(rocket.pos, enemy.pos).heading()
    enemy.accel = PVector.fromAngle(enemy2rocketAngle).setMag(0.1)
    enemy.heading = degrees(enemy2rocketAngle)+90
    if (millis() - timer1 >= 150):
        enemy.propulsion()
        timer1 = millis()
    if (millis() - timer >= 500):
        bullets.append(Bullet(enemy.pos, enemy.accel))
        timer = millis()
    enemy.update()
    enemy.show()

def keyPressed():
    if (key == ' '):
        bullets.append(Bullet(rocket.pos, rocket.accel))

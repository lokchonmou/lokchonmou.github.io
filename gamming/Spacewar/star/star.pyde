from star import *

star1 = star2 = 0
G = 6.67E-6

def setup():
    
    global star1, star2
    size(600,600)
    star1 = Star(1000, PVector(width/2, height/4))
    star1.vec = PVector(5, 0)
    star2 = Star(1e6, PVector(width/2, height/2))

def draw():
    global star1, star2

    background(50)
    
    r = PVector.sub(star2.pos, star1.pos)
    F = PVector.mult(r.copy().normalize(), G*star1.mass*star2.mass/sq(r.mag()))
    
    noStroke()
    fill('#FFFF00')
    ellipse(star1.pos.x, star1.pos.y, 50,50)
    fill(0)
    ellipse(star2.pos.x, star2.pos.y, 50,50)

    star1.applyForce(F)
    strokeWeight(8)
    stroke('#FF0000')
    line(star1.pos.x, star1.pos.y, star1.pos.x+star1.vec.x*20, star1.pos.y+star1.vec.y*20)
    stroke('#0000FF')
    line(star1.pos.x, star1.pos.y, star1.pos.x+F.x*100, star1.pos.y+F.y*100)
   

class Rocket(object):

    def __init__(self):
        self.pos =  PVector(width/2, height/2)
        self.vec =  PVector(0,0)
        self.accel =  PVector(0,-1)
        self.heading = 0   #unit in degrees
        self.isPropulsion = False

    def show(self):
        if self.isPropulsion == True:
            fill('#FF0000')
        else:
            fill('#FFFFFF')
        scale = 10
        pushMatrix()
        translate(self.pos.x, self.pos.y)
        rotate(radians(self.heading))
        beginShape()
        vertex(0  *scale , 0    *scale)
        vertex(1  *scale , 0.6  *scale)
        vertex(0  *scale , -3   *scale)
        vertex(-1 *scale , 0.6  *scale)
        endShape()
        popMatrix()

    def rotateRocket(self, angle):
       self.heading += angle
       self.accel.rotate(radians(angle))

    def propulsion(self):
        self.isPropulsion = True
        self.accel.setMag(0.1)
        self.vec = PVector.add(self.vec, self.accel)
        self.vec.limit(6)
    
    def update(self):
        if self.isPropulsion == False:
            self.vec = PVector.mult(self.vec, 0.99)

        self.pos = PVector.add(self.pos, self.vec)
        if (self.pos.x > width):
            self.pos.x = 0
        if (self.pos.x < 0):
            self.pos.x = width
        if (self.pos.y > height):
            self.pos.y = 0
        if (self.pos.y < 0):
            self.pos.y = height    
        

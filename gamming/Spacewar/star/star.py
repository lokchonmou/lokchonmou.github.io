class Star(object):

    def __init__(self, _mass, _pos):
        self.mass = _mass
        self.pos = _pos
        self.vec = PVector()

    def applyForce(self, _force):
        self.vec = PVector.add(self.vec, _force)
        self.pos = PVector.add(self.pos , self.vec)
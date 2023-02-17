class Bullet(object):

    def __init__(self, _pos, _vec):
        self.pos =  _pos
        self.vec =  _vec.copy().setMag(4)

    def update(self):
        self.pos = PVector.add(self.pos, self.vec)

    def show(self):
        fill('#FFFF00')
        ellipse(self.pos.x, self.pos.y, 5, 5)
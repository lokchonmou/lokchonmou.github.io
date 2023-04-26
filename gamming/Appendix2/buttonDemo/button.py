class Button:
    def __init__(self, _bx, _by, _w, _h, _label):
        self.bx = _bx
        self.by = _by
        self.w = _w
        self.h = _h
        self.label = _label
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(16)

    def show(self):
        stroke('#6F8FFF')
        strokeWeight(4)
        if self.overButton():
            fill('#AAAA00')
        else:
            fill('#FFFF00')
        rect(self.bx, self.by, self.w, self.h,10,10,10,10)
        fill('#000000')
        text(self.label, self.bx, self.by)

    def overButton(self):
        if mouseX > self.bx-self.w/2 and mouseX < self.bx + self.w/2 and mouseY > self.by-self.h/2 and mouseY < self.by + self.h/2:
            return True
        else:
            return False

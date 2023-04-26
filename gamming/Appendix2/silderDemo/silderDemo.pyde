# create a silder demo using processing.py

# create a class for the slider
class Slider:
    def __init__(self, minValue, maxValue, initialValue):
        self.minValue = minValue  # minimum value of the slider
        self.maxValue = maxValue  # maximum value of the slider
        self.value = initialValue 	# current value of the slider
        self.bWidth = self.bHeight = 0  # width and height of the slider bar
        self.bXpos = self.bYpos = 0  # x and y position of the slider bar
        self.sPos = 0  # x position of the slider button
        self.sPosMin = self.sPosMax = 0  # min and max x position of the slider button
        self.isOver = False  # is the mouse over the slider button?

    def setSize(self, _bXpos, _bYpos, _bWidth, _bHeight): #set the size of the slider
        self.bXpos = _bXpos
        self.bYpos = _bYpos
        self.bWidth = _bWidth
        self.bHeight = _bHeight
        
        self.sPosMin = self.bXpos - self.bWidth / 2 #set the min and max x position of the slider button
        self.sPosMax = self.bXpos + self.bWidth / 2
        self.sPos = map(self.value, self.minValue,
                        self.maxValue, self.sPosMin, self.sPosMax) #set the x position of the slider button

    def show(self):
        fill(255)
        stroke('#6F8FFF')
        strokeWeight(4)
        rect(self.bXpos, self.bYpos, self.bWidth, self.bHeight, 10, 10, 10, 10)
        if self.isOver:
            fill('#AAAA00')
        else:
            fill('#FFFF00')
        rect(self.sPos, self.bYpos, 20, 40, 10, 10, 10, 10)

    def mousePressed(self):
        if (mouseX > self.sPos - 10 and mouseX < self.sPos + 10 and
            mouseY > self.bYpos - 20 and mouseY < self.bYpos + 20):
            self.isOver = True
        else:
            self.isOver = False

    def mouseDragged(self):
        if self.isOver:
            if mouseX > self.sPosMin and mouseX < self.sPosMax:
                self.sPos = mouseX
                self.value = map(self.sPos, self.sPosMin,
                                 self.sPosMax, self.minValue, self.maxValue)

			# snap the slider button to the min or max position if the mouse is out of the slider bar
            if mouseX < self.sPosMin:
                self.value = self.minValue
                self.sPos = map(self.value, self.minValue,
                                self.maxValue, self.sPosMin, self.sPosMax)

            if mouseX > self.sPosMax:
                self.value = self.maxValue
                self.sPos = map(self.value, self.minValue,
                                self.maxValue, self.sPosMin, self.sPosMax)

            print(self.value)

    def mouseReleased(self):
        self.isOver = False

# main program=======================================================
slider1 = Slider(0, 100, 40)
slider2 = Slider(0, 100, 60)
slider3 = Slider(0, 100, 80)


def setup():
    size(600, 200)
    rectMode(CENTER)
    slider1.setSize(width/2, height/2-height/4, 400, 20)
    slider2.setSize(width/2, height/2, 400, 20)
    slider3.setSize(width/2, height/2+height/4, 400, 20)


def draw():
    background(200)
    slider1.show()
    slider2.show()
    slider3.show()


def mousePressed():
    slider1.mousePressed()
    slider2.mousePressed()
    slider3.mousePressed()


def mouseDragged():
    slider1.mouseDragged()
    slider2.mouseDragged()
    slider3.mouseDragged()


def mouseReleased():
    slider1.mouseReleased()
    slider2.mouseReleased()
    slider3.mouseReleased()

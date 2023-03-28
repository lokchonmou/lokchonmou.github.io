class Spot(object):
    def __init__(self, _i, _j, _x, _y, _value):
        self.i = _i
        self.j = _j
        self.x = _x
        self.y = _y
        self.value = ''

    def display(self):
        stroke('#000000')
        strokeWeight(2)
        fill(self.matchColor(self.value))
        ellipse(self.x, self.y, 80, 80)

    def matchColor(self, _value):
        if _value == '':
            return '#FFFFFF'
        elif _value == 'R':
            return '#FF5641'
        elif _value == 'Y':
            return '#FFDF37' 

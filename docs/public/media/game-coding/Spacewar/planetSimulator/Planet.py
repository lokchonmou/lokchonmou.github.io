class Planet:
    AU = 149597870700.0 # AU is the astronomical unit, in meters
    G = 6.67408e-11 # G is the gravitational constant, in m^3 kg^-1 s^-2
    SCALE = 250.0 / AU # 250pixel/AU
    TIMESTEP = 3600.0*24.0 # 1 day, timestep in seconds

    def __init__(self, position, radius, color, mass):
        self.position = position
        self.radius = radius
        self.color = color
        self.mass = mass

        self.isSun = False
        self.distanceToSun = 0

        self.velocity = PVector(0, 0)

        self.orbit = []

    def draw(self):
        x = self.position.x * self.SCALE + width/2
        y = self.position.y * self.SCALE + height/2

        self.orbit.append(PVector(x, y))
        stroke(self.color)
        noFill()
        beginShape()
        for point in self.orbit:
            vertex(point.x, point.y)
        endShape()

        fill(self.color)
        noStroke()
        ellipse(x, y, self.radius*2, self.radius*2)
        
        textAlign(CENTER)
        text(nfc(self.distanceToSun,0), x, y-25)

    def attraction(self, other):
        distance = PVector.dist(self.position, other.position)
        force = self.G * self.mass * other.mass / (distance * distance)
        direction = PVector.sub(other.position, self.position).normalize()
        if other.isSun:
            self.distanceToSun = distance
        return PVector.mult(direction, force)
    
    def updatePos(self, planets):
        if not self.isSun:
            force = PVector(0, 0)
            for planet in planets:
                if planet != self:
                    force = PVector.add(force, self.attraction(planet))
            acceleration = PVector.div(force, self.mass)
            self.velocity = PVector.add(self.velocity, PVector.mult(acceleration, self.TIMESTEP))
            self.position = PVector.add(self.position, PVector.mult(self.velocity, self.TIMESTEP))
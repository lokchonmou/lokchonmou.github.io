from Planet import *

sun = earth = mars = mercury = venus = None
planets = []

def setup():
    size(800, 800)

    sun = Planet(PVector(0, 0), 30, "#FFA500", 1.98892e30)
    sun.isSun = True

    earth = Planet(PVector(-1*Planet.AU, 0), 16, "#001EFF", 5.972e24)
    mars = Planet(PVector(-1.524*Planet.AU, 0), 12, "#FF1E00", 6.39e23)
    mercury = Planet(PVector(0.387*Planet.AU, 0), 8, "#AAAAAA", 3.285e23)
    venus = Planet(PVector(0.723*Planet.AU, 0), 10, "#FFFF00", 4.867e24)

    earth.velocity = PVector(0.0, 29780.0)
    mars.velocity = PVector(0.0, 24077.0)
    mercury.velocity = PVector(0.0, 47362.0)
    venus.velocity = PVector(0.0, 35020.0)

    planets.append(sun)
    planets.append(earth)
    planets.append(mars)
    planets.append(mercury)
    planets.append(venus)

def draw():
    background(30)

    for planet in planets:
        planet.updatePos(planets)
        planet.draw()


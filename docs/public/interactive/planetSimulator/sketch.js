let sun, earth, mars, mercury, venus;
var sunMass, earthMass, marsMass, mercuryMass, venusMass;
let frameRateValue = 60;
let planets = [];
let myGUI;

function setup() {
  createCanvas(600, 600);

  resetMass();
  GUI();
  frameRate(frameRateValue);

  sun = new Planet(createVector(0, 0), 30, "#FFA500", sunMass);
  sun.isSun = true;

  earth = new Planet(createVector(-1 * Planet.AU, 0), 16, "#001EFF", earthMass);
  mars = new Planet(createVector(-1.524 * Planet.AU, 0), 12, "#FF1E00", marsMass);
  mercury = new Planet(createVector(0.387 * Planet.AU, 0), 8, "#AAAAAA", mercuryMass);
  venus = new Planet(createVector(0.723 * Planet.AU, 0), 10, "#FFFF00", venusMass);

  earth.velocity = createVector(0.0, 29780.0)
  mars.velocity = createVector(0.0, 24077.0)
  mercury.velocity = createVector(0.0, 47362.0)
  venus.velocity = createVector(0.0, 35020.0)

  planets = [sun, earth, mars, mercury, venus];


}

function draw() {

  background(30);

  frameRate(frameRateValue);

  sun.mass = sunMass;
  earth.mass = earthMass;
  mars.mass = marsMass;
  mercury.mass = mercuryMass;
  venus.mass = venusMass;


  for (let planet of planets) {
    planet.updatePos(planets);
    planet.draw();
  }
}

function GUI() {
  // 創建 GUI
  myGUI = createGui('Planet Settings').setPosition(width, 0);

  sliderRange(1.989e29, 1.989e31, 1.989e1) // set the value of sunMassSlider
  myGUI.addGlobals('sunMass');

  sliderRange(3.285e21, 3.285e28, 3.285e1) // set the value of mercuryMassSlider
  myGUI.addGlobals('mercuryMass');

  sliderRange(4.867e22, 4.867e28, 4.867e1) // set the value of venusMassSlider
  myGUI.addGlobals('venusMass');

  sliderRange(5.972e22, 5.972e28, 5.972e1) // set the value of earthMassSlider
  myGUI.addGlobals('earthMass');

  sliderRange(6.39e21, 6.39e28, 6.39e1) // set the value of marsMassSlider
  myGUI.addGlobals('marsMass');

  sliderRange(1, 60, 1) // set the value of frameRateSlider
  myGUI.addGlobals('frameRateValue');

  myGUI.show();

  // resetButton = createButton("Reset");
  // resetButton.mousePressed(resetMass);
}

function resetMass() {
  sunMass = 1.989e30;
  earthMass = 5.972e24;
  marsMass = 6.39e23;
  mercuryMass = 3.285e23;
  venusMass = 4.867e24;
  frameRateValue = 60;
}
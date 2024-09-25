let panSpeed = 5;
let birds = [];
let myPipes = [];

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  birds = [new Bird(), new Bird()];
  myPipes = [new Pipe()];
  console.log(myPipes);
}

function draw() {
  if (frameCount % 100 === 0) {
    myPipes.push(new Pipe());
  }

  if (myPipes[0].x < -myPipes[0].w) {
    myPipes.shift();
  }

  background("#70C6D5");

  birds.forEach(bird => {
    bird.update();
    bird.display();
    // console.log(bird.collide(myPipes[0]));
  });

  myPipes.forEach(pipe => {
    pipe.update(panSpeed);
    pipe.display();
  });
}

function keyPressed() {
  if (key === ' ') {
    birds[0].jump();
  }
  if (key === 'W' || key === 'w') {
    birds[1].jump();
  }
  if (key === 'R' || key === 'r') {
    setup();
  }
}
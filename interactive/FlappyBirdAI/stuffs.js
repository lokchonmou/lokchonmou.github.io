class Bird {
    constructor() {
      this.score = 0;
      this.pipeCounter = 0;
      this.birdPos = createVector(50, height/2);
      this.birdVec = createVector(0, 0);
      this.birdAcc = createVector(0, 0.3);
      this.isPass = false;
    }
  
    update() {
      this.birdVec.add(this.birdAcc);
      this.birdPos.add(this.birdVec);
      this.score += 1;
    }
  
    jump() {
      this.birdVec.y = -8;
    }
  
    display() {
      fill("#D5BB06");
      ellipse(this.birdPos.x, this.birdPos.y, 25, 25);
    }
  
    collide(_pipe) {
      let R = 25 / 2;
      let X = this.birdPos.x;
      let Y = this.birdPos.y;
  
      if (X + R > _pipe.x && X - R < _pipe.x + _pipe.w) {
        if (Y + R > _pipe.y || Y - R < _pipe.y - _pipe.gap) {
          return true;
        }
      }
  
      if (Y > height) {
        return true;
      }
  
      return false;
    }
  }
  
  class Pipe {
    constructor() {
      this.y = random(100, height - 100);
      this.h = height;
      this.w = 80;
      this.gap = 80;
      this.x = width + this.w;
    }
  
    update(_panSpeed) {
      this.x -= _panSpeed;
    }
  
    display() {
      fill(0, 204, 0);
      rect(this.x, this.y, this.w, this.h);
      rect(this.x, this.y - this.gap, this.w, -this.h);
    }
  }
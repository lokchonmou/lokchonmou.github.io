class Cat {
	maxVelocity = 7.5;
	maxAcc = 0.1;
	radius = 5.0;
	pos; velocity;

	constructor(_x, _y) {
		this.pos = new p5.Vector(_x, _y);
		this.velocity = new p5.Vector();
	}

	show() {
		noStroke();
		fill('#00FF00');
		drawingContext.shadowBlur = 0;
		if (this.velocity.mag() > this.maxVelocity / 2.) fill('#FF0000');
		if (this.velocity.mag() > 3. * this.maxVelocity / 4.) fill('#8700c6');
		ellipse(this.pos.x, this.pos.y, 15, 15);
	}

	control() {
		let acc = new p5.Vector();
		if (rat.pos.dist(this.pos) < view)
			acc = ((rat.pos.copy()).sub(this.pos)).mult(1. / rat.pos.dist(this.pos)).limit(this.maxAcc);
		else {
			acc = p5.Vector.random2D().mult(0.1);
			// this.velocity.mult(0.99);
		}

		this.velocity.add(acc).limit(this.maxVelocity);
		this.pos.add(this.velocity);

		if (this.pos.x > width || this.pos.x < 0) {
			this.pos.x = constrain(this.pos.x, 0, width);
			this.velocity.reflect(new p5.Vector(1, 0)).mult(0.85);
		}
		if (this.pos.y > height || this.pos.y < 0) {
			this.pos.y = constrain(this.pos.y, 0, height);
			this.velocity.reflect(new p5.Vector(0, 1)).mult(0.85);
		}

		for (const w of walls) {
			if (w.isTouch(this.pos.x, this.pos.y, 7.5 + 5)) {
				this.velocity.reflect(w.normal().mult(0.85));
			}
		}
	}
}
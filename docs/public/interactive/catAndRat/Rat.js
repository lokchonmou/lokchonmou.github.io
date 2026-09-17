class Rat {
	maxVelocity = 15.;
	radius = 7.5;
	pos; velocity;
	blood; maxBlood;
	startTime;
	GAMEOVER;

	constructor(_x, _y) {
		this.pos = new p5.Vector(_x, _y);
		this.velocity = new p5.Vector();
		this.blood = 20.;
		this.maxBlood = 20.;
		this.startTime = millis();
		this.GAMEOVER = true;
	}

	show() {
		noStroke();
		fill('#FFFF00');
		drawingContext.shadowBlur = 0;
		ellipse(this.pos.x, this.pos.y, 15, 15);

		// noFill();
		// strokeWeight(0.1);
		// stroke('#FFFFFF');
		// ellipse(this.pos.x, this.pos.y, view * 2, view * 2);

		noStroke();
		rectMode(CORNER);
		fill('#FFFFFF33');
		rect(width / 2 - 250, 10, 500, 20);
		fill('#FF000033');
		rect(width / 2 - 250, 10, 500 * this.blood / this.maxBlood, 20);

		if (this.GAMEOVER) {
            background('#FF000022');
			textAlign(CENTER, CENTER);
			textSize(64);
			fill('#FFFFFF');
			text("GAME OVER", width/2, height/2);
            startButton.show();
		}
	}

	control() {
		if (!this.GAMEOVER) {
			let temp = false;

			for (const w of walls) temp |= w.isCross(this.pos.x, this.pos.y, mouseX, mouseY) && w.isTouch(this.pos.x, this.pos.y, 7.5 + 5);

			if (temp) this.velocity = 0;
			else this.velocity = new p5.Vector(mouseX, mouseY).sub(this.pos).limit(this.maxVelocity);

			this.pos.add(this.velocity);

			if (millis() - this.startTime > 2000.)
				for (const c of cats)
					if (dist(c.pos.x, c.pos.y, this.pos.x, this.pos.y) < 15) {
                        background('#FFFF0022');
                        shootSound.play();
                        this.blood--;
                    }

			if (this.blood <= 0) {
				this.blood = 0;
				this.GAMEOVER = true;
			}
		}
	}
}
class wall {
	constructor(_x0, _y0, _x1, _y1) {
		this.P0 = new p5.Vector(_x0, _y0);
		this.P1 = new p5.Vector(_x1, _y1);
	}

	show() {
		stroke('#f4cd39');
		strokeWeight(10);
		line(this.P0.x, this.P0.y, this.P1.x, this.P1.y);
	}

	normal() {
		return p5.Vector.sub(this.P1, this.P0).rotate(HALF_PI).normalize();
	}

	distToPoint(_x, _y) {
		let P = new p5.Vector(_x, _y);
		let QP = p5.Vector.sub(P, this.P0);
		let n = p5.Vector.sub(this.P1, this.P0).rotate(HALF_PI);
		return abs(p5.Vector.dot(QP, n)) / n.mag();
	}

	isInWall(_x, _y) {
		let P = new p5.Vector(_x, _y);
		let P01 = p5.Vector.sub(this.P1, this.P0).normalize();
		let P10 = p5.Vector.sub(this.P0, this.P1).normalize();
		let PP0 = p5.Vector.sub(P, this.P0).normalize();
		let PP1 = p5.Vector.sub(P, this.P1).normalize();
		let result = p5.Vector.dot(P01, PP0) * p5.Vector.dot(P10, PP1);
		if (result < 0) return false;
		else return true;
	}

	orienation(x2, y2) {
		let P2 = new p5.Vector(x2, y2);
		let P21 = p5.Vector.sub(this.P1, P2).normalize();
		let P20 = p5.Vector.sub(this.P0, P2).normalize();
		let n = p5.Vector.cross(P21, P20);
		return (n.z > 0);
	}

	isCross(x2, y2, x3, y3) {
		let P23 = new wall(x2, y2, x3, y3);
		let O3_P0P1 = this.orienation(x3, y3); //orienation of P3 from P0P1
		let O2_P0P1 = this.orienation(x2, y2); //orienation of P3 from P0P1
		let O1_P2P3 = P23.orienation(this.P1.x, this.P1.y);
		let O0_P2P3 = P23.orienation(this.P0.x, this.P0.y);
		return (!O3_P0P1 && O2_P0P1 && O1_P2P3 && !O0_P2P3) || (O3_P0P1 && !O2_P0P1 && !O1_P2P3 && O0_P2P3);
	}

	isTouch(_x, _y, _r) {
		let d = this.distToPoint(_x, _y);
		let t = this.isInWall(_x, _y);
		if (t && d <= _r) return true;
		else return false;
	}


}
class Planet {
    static AU = 149597870700.0; // AU 是天文單位，單位為米
    static G = 6.67408e-11; // G 是引力常數，單位為 m^3 kg^-1 s^-2
    static SCALE = 187.5 / Planet.AU; // 187.5 像素/天文單位
    static TIMESTEP = 3600.0 * 24.0; // 1 天，時間步長以秒為單位

    constructor(position, radius, color, mass) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.mass = mass;

        this.isSun = false;
        this.distanceToSun = 0;

        this.velocity = createVector(0, 0);

        this.orbit = [];

    }

    draw() {
        let x = this.position.x * Planet.SCALE + width / 2;
        let y = this.position.y * Planet.SCALE + height / 2;

        this.orbit.push(createVector(x, y));
        // draw orbit
        stroke(this.color);
        noFill();
        beginShape();
        for (let v of this.orbit) {
            vertex(v.x, v.y);
        }
        endShape();

        // draw planet
        fill(this.color);
        noStroke();
        ellipse(x, y, this.radius * 2, this.radius * 2);

        // draw distance
        if (!this.isSun) {
            fill(255);
            // textSize(12);
            textAlign(CENTER, CENTER);
            text(this.distanceToSun.toLocaleString() + " m", x, y - 25);
        }
    }

    attraction(other) {
        let distance = p5.Vector.dist(this.position, other.position);
        let force = Planet.G * this.mass * other.mass / (distance * distance);
        let direction = p5.Vector.sub(other.position, this.position).normalize();
        if (other.isSun) {
            this.distanceToSun = distance;
        }
        return direction.mult(force);
    }

    updatePos(planets) {
        if (!this.isSun) {
            let force = createVector(0, 0);
            for (let planet of planets) {
                if (planet !== this) {
                    force = p5.Vector.add(force, this.attraction(planet));
                }
            }
            let acceleration = p5.Vector.div(force, this.mass);
            this.velocity = p5.Vector.add(this.velocity, p5.Vector.mult(acceleration, Planet.TIMESTEP));
            this.position = p5.Vector.add(this.position, p5.Vector.mult(this.velocity, Planet.TIMESTEP));

        }
    }
}
class Robot{

    params = {
        robotWidth : 30,        //default 30
        sensorNo : 7,           //default 7
        sensorSize : 4,         //default 4
        sensor_distance : 40,   //default 40
        sensor_width : 5,       //default 5
        maxAccel : .5,          //default .5  代表有跣軚, 0是完全跣軚不會行走, max是maxVel
        maxVel : 7.,            //default 7.
        Kp : 2.1,
        Kd : 1.2,                 //Core PID
    };

    id = 0;                 //the ID of the current car
    state = [];             //the state of the sensor array, true is on black line, false is on white bg
    vr=0.; vl=0.;           //velocity of the left and right wheel
    error=0; last_error=0; output;  //using for PID
    desiredVl = 0; desiredVr=0;     //after PID output, calculator the drsire velocity
    wheelWidth = 8;
    isDead = false;                 //the robot is out of range

    drift = 0;lastDrift = 0;       //drift(偏移) of the car
    timer=0; last_timer=0;
    enterTimerZone;
    score=0;

    constructor(_id, _x, _y, _theta) {
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.theta = _theta;
        for(var i = 0; i < this.params.sensorNo; i++)
        this.state[i] = false;
        ellipseMode(CENTER);
        this.enterTimerZone = true;
        this.isDead = false;

        this.timer = frameCount;
        this.last_timer = this.timer;
        this.score = 0;
    }

    updateSensor(){

        var avg=0, sum=0;
        var online = false;
        var sensor_position_x=0;
        var sensor_position_y=0;
        var thisSensorX = 0;
        var thisSensorY = 0;
        var _theta = 0;

        if (this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600 ) this.isDead = true;

        for (var i=0; i<this.params.sensorNo; i++) {
            _theta = radians(this.theta);
            thisSensorX = this.params.sensor_distance*sin(this.params.sensor_width*(i-floor(this.params.sensorNo/2))/this.params.sensor_distance);
            thisSensorY = this.params.sensor_distance*cos(this.params.sensor_width*(i-floor(this.params.sensorNo/2))/this.params.sensor_distance);
            sensor_position_x = this.x + thisSensorX*cos(_theta) + thisSensorY*sin(_theta);
            sensor_position_y = this.y + thisSensorX*sin(_theta) - thisSensorY*cos(_theta);

            var blackValue=0;
            for (var j=0; j < this.params.sensorSize; j++){
                for (var k=0; k<this.params.sensorSize; k++){
                    var c = get(int(sensor_position_x)+j-floor(j/2), +int(sensor_position_y)+k-floor(k/2));
                    blackValue += (c[0]+c[1]+c[2])/3.;
                }
            }
            blackValue = 255. - blackValue/(this.params.sensorSize*this.params.sensorSize);

            if (blackValue > 127) this.state[i] = true;
            else this.state[i] = false;

            //turn the sensor state into PID input
            if (blackValue > 127) online = true;
            //only average in values that are above a noise threshold
            if (blackValue > 20){
                avg += blackValue * (i * 1000.);
                sum += blackValue;
            }
        }
        if (!online){
            this.drift = this.lastDrift;
        }
        else {
            this.lastDrift = avg/sum;
            this.drift = this.lastDrift;
        }
    }

    setPD(_Kp, _Kd){
        this.params.Kp = _Kp;
        this.params.Kd = _Kd;
    }

    PID(){
        // PID controller////////////////////////////////
        this.error = this.drift/1000. - (this.params.sensorNo - 1)/2.;
        this.output = this.params.Kp * this.error+ this.params.Kd *(this.error - this.last_error);

        // output = params.Kp.getValueF() * input;
        this.output = constrain(this.output, -2*this.params.maxVel, 2*this.params.maxVel);
        this.last_error = this.error;

        if (this.output >0) {
            this.desiredVl = this.params.maxVel;
            this.desiredVr = this.params.maxVel - this.output;
        } else {
            this.desiredVl = this.params.maxVel + this.output;
            this.desiredVr = this.params.maxVel;
        }
    }

    drive(){
        this.desiredVl = constrain(this.desiredVl, -this.params.maxVel, this.params.maxVel);
        this.desiredVr = constrain(this.desiredVr, -this.params.maxVel, this.params.maxVel);

        this.vl = (this.desiredVl - this.vl > 0)? this.vl+ this.params.maxAccel: this.vl-this.params.maxAccel;
        this.vr = (this.desiredVr - this.vr > 0)? this.vr+ this.params.maxAccel: this.vr-this.params.maxAccel;

        this.vl = constrain(this.vl, -this.params.maxVel, this.params.maxVel);
        this.vr = constrain(this.vr, -this.params.maxVel, this.params.maxVel);

        // var R = -this.params.robotWidth*(this.vl+this.vr)/(2*(this.vr-this.vl));
        var dtheta=-(this.vr-this.vl)/this.params.robotWidth;
        var dx= (this.vr+this.vl)/2 * sin(radians(this.theta));
        var dy=-(this.vr+this.vl)/2 * cos(radians(this.theta));
        // this.x = -R*sin(radians(this.theta)) + R*sin(dtheta+radians(this.theta)) + this.x;
        // this.y =  R*cos(radians(this.theta)) - R*cos(dtheta+radians(this.theta)) + this.y;
        this.theta += degrees(dtheta);
        this.x += dx;
        this.y += dy;
    }

    show(){
        var sensor_position_x=0;
        var sensor_position_y=0;
        var thisSensorX = 0;
        var thisSensorY = 0;
        var _theta = 0;

        // draw the body of robot////////////////////////////////
        push();
        {
            stroke(0);
            strokeWeight(3);
            translate(this.x, this.y);
            rotate(radians(this.theta));
            //draw the body of car
            fill('#325AA8');
            rectMode(CORNER);
            rect(-this.params.robotWidth/2., -20.0, this.params.robotWidth, 30.);
            //draw the two wheels
            fill('#f2511f');
            rectMode(CENTER);
            rect(-this.params.robotWidth/2-this.wheelWidth/2, 0,this.wheelWidth, 20);
            rect(this.params.robotWidth/2+this.wheelWidth/2, 0,this.wheelWidth, 20);
            //draw the center line of car
            stroke('#FF00FF');
            strokeWeight(.5);
            line(-this.params.robotWidth/2.-this.wheelWidth-10, 0, this.params.robotWidth/2+this.wheelWidth/2+10, 0);
            line(0, -30, 0, 15);
            //print the id of car on the top
            fill(255); noStroke();
            textAlign(CENTER, BOTTOM);
            text(this.id, 0, 0);
        }
        pop();

        fill('#0000FF');
        noStroke();
        text(this.score, this.x+25, this.y-50);

        for (var i=0; i<this.params.sensorNo; i++) {
            _theta = radians(this.theta);
            thisSensorX = this.params.sensor_distance*sin(this.params.sensor_width*(i-floor(this.params.sensorNo/2))/this.params.sensor_distance);
            thisSensorY = this.params.sensor_distance*cos(this.params.sensor_width*(i-floor(this.params.sensorNo/2))/this.params.sensor_distance);
            sensor_position_x = this.x + thisSensorX*cos(_theta) + thisSensorY*sin(_theta);
            sensor_position_y = this.y + thisSensorX*sin(_theta) - thisSensorY*cos(_theta);
            // draw the sensor array of car
            noFill();
            strokeWeight(.5);
            stroke(0);
            ellipse(sensor_position_x, sensor_position_y, this.params.sensorSize, this.params.sensorSize);
            // draw the result of sensor array///////////////////////////////////
            var thisSensorResultX = 8.*(i-floor(this.params.sensorNo/2));
            var thisSensorResultY = 50.;
            fill(this.state[i]==true?'#FF0000':'FFFFFF');
            ellipse(this.x+thisSensorResultX, this.y-thisSensorResultY, this.params.sensorSize, this.params.sensorSize);
        }


    }

    oneLoop(){
        if (this.x >=0 && this.x <=210 && this.y <= 110 ) {
            if (!this.enterTimerZone){
                this.timer = frameCount;
                this.score = this.timer - this.last_timer;
                this.enterTimerZone = true;
                this.last_timer = this.timer;
            }
        }
        else this.enterTimerZone = false;

    }

    update(){
        if (!this.isDead){
            this.updateSensor();
            this.PID();
            this.drive();
            this.oneLoop();
        }
    }

}

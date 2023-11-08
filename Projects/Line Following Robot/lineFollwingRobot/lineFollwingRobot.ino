byte E1 = 5; // Enable pin for Left Motor
byte M1 = 4; // Control pin  for Left Motor
byte M2 = 6; // Control pin  for Right Motor
byte E2 = 7; // Enable pin for Right Motor

byte IR_sensor_pin[] = {12, 11, 10, 9, 8, A0, A1};
boolean state[] = {0, 0, 0, 0, 0, 0, 0};

byte no_of_sensors = 7;

float input, last_input, P_gain = 60.0, D_gain = 6.0, output, maxSpeed = 255;

void setup(){
	pinMode(M1, OUTPUT);
	pinMode(M2, OUTPUT);

	Serial.begin(115200);
	for(int i = 0; i < no_of_sensors; i++)
		pinMode(IR_sensor_pin[i], INPUT);
	
}

void loop(){

	/*
	// test the motor, check the wiring
	motorControl(255, 0);
	delay(3000);
	motorControl(0, 255);
	delay(3000);
	motorControl(255, 255);
	delay(3000);
	motorControl(0, 0);
	delay(3000);
	*/

	// Read and store the sensors value
	for(int i = 0; i < no_of_sensors; i++)
		state[i] = digitalRead(IR_sensor_pin[i]);

	printSensorValue();

	sensor2number();
	// Serial.println(input);

	output = P_gain * input + D_gain * (input - last_input);
	output = constrain(output, -2*maxSpeed, 2*maxSpeed);

	if (input > 0) 	motorControl(maxSpeed - output, maxSpeed);
	else			motorControl(maxSpeed, maxSpeed - abs(output));
    
	last_input = input;
	delay(10);
}

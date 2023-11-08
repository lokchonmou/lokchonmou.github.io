void motorControl(int leftSpeed, int rightSpeed){
    leftSpeed = constrain(leftSpeed, -255, 255);
    if (leftSpeed < 0) digitalWrite(M1, LOW);
    else digitalWrite(M1, HIGH);
    analogWrite(E1, abs(leftSpeed));

    rightSpeed = constrain(rightSpeed, -255, 255);
    if (rightSpeed < 0) digitalWrite(M2, LOW);
    else digitalWrite(M2, HIGH);
    analogWrite(E2, abs(rightSpeed));
}

void printSensorValue(){
    for (byte i = 0; i < no_of_sensors; i++)   
        Serial.print(state[i]);
    Serial.println();
}

void sensor2number(){
    if (state[0] == 1 && state[1] == 0 && state[2] == 0 && state[3] == 0 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 6.0;
    if (state[0] == 1 && state[1] == 1 && state[2] == 0 && state[3] == 0 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 5.0;
    if (state[0] == 0 && state[1] == 1 && state[2] == 0 && state[3] == 0 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 4.0;
    if (state[0] == 0 && state[1] == 1 && state[2] == 1 && state[3] == 0 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 3.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 1 && state[3] == 0 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 2.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 1 && state[3] == 1 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 1.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 1 && state[4] == 0 && state[5] == 0 && state[6] == 0) input = 0.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 1 && state[4] == 1 && state[5] == 0 && state[6] == 0) input = -1.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 0 && state[4] == 1 && state[5] == 0 && state[6] == 0) input = -2.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 0 && state[4] == 1 && state[5] == 1 && state[6] == 0) input = -3.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 0 && state[4] == 0 && state[5] == 1 && state[6] == 0) input = -4.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 0 && state[4] == 0 && state[5] == 1 && state[6] == 1) input = -5.0;
    if (state[0] == 0 && state[1] == 0 && state[2] == 0 && state[3] == 0 && state[4] == 0 && state[5] == 0 && state[6] == 1) input = -6.0;

    // float avg = 0, sum = 0;
    // boolean onLine = false;

    // for (byte i = 0; i < no_of_sensors; i++){
    //     avg += i * state[i];
    //     sum += state[i];
    //     onLine = onLine || state[i];
    // }
    
    // if (!onLine)    input = last_input;
    // else            input = avg/sum - (no_of_sensors - 1) / 2.0;
}
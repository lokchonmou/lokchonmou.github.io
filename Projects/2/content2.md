# 2. ESP32 + ws2812 clock

``` c++
#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// setup the wifi, replace with your network credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "WIFI_PASSWORD";

// setup the NTP server
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "0.asia.pool.ntp.org");


void setup() {
	Serial.begin(115200);
	WiFi.begin(ssid, password);
  	while (WiFi.status() != WL_CONNECTED) {
    	delay(1000);
	}
	timeClient.begin();
	// set the time offset to UTC+8
	timeClient.setTimeOffset(28800);
	// set the update interval to 1 day
	timeClient.setUpdateInterval(86400000);
}

void loop() {
	timeClient.update();
	// Serial.print(timeClient.getFormattedTime());
	Serial.print(timeClient.getHours());
    Serial.print(":");
	Serial.print(timeClient.getMinutes());
	Serial.print(":");
	Serial.println(timeClient.getSeconds());
	delay(1000);
}
```



```C++
#include <FastLED.h>

#define NUM_LEDS 60
#define DATA_PIN 5

CRGB leds[NUM_LEDS];

void setup() {
	FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
	FastLED.setBrightness(15); // 0-255
}

void loop() {
	// Fill every 5th LED with white
	for (int i = 0; i <=59; i+=5)
		leds[i] = CRGB::White;

	FastLED.show();
}
```



```C++
#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <FastLED.h>

#define NUM_LEDS 60
#define DATA_PIN 5

CRGB leds[NUM_LEDS];

// setup the wifi, replace with your network credentials
const char* ssid = "ELECA";
const char* password = "ELEC11111111";

// setup the NTP server
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "0.asia.pool.ntp.org");

int hour = 0;
int minutes = 0;
int second = 0;
unsigned long timer = 0;

void setup() {
	Serial.begin(115200);
	WiFi.begin(ssid, password);
  	while (WiFi.status() != WL_CONNECTED) {
    	delay(1000);
	}
	timeClient.begin();
	// set the time offset to UTC+8
	timeClient.setTimeOffset(28800);
	// set the update interval to 1 day
	timeClient.setUpdateInterval(86400000);

    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
    FastLED.setBrightness(15);  // 0-255
}

void loop() {
	if (millis() - timer >= 1000){
		timer = millis();
		timeClient.update();
		// Serial.print(timeClient.getFormattedTime());
		hour = timeClient.getHours();
		minutes = timeClient.getMinutes();
		second = timeClient.getSeconds();

		Serial.print(hour);
		Serial.print(":");
		Serial.print(minutes);
		Serial.print(":");
		Serial.println(second);

		// Turn off the previous time
		leds[second==0?59:second-1] = CRGB::Black;
		leds[minutes==0?59:minutes-1] = CRGB::Black;
		leds[(hour%12)*5 + (minutes/12)==0?59:(hour%12)*5 + (minutes/12)-1] = CRGB::Black;

		// Turn off the rainbow
		if (second == 1)	fill_solid(leds, NUM_LEDS, CRGB::Black);
		
		// Fill every 5th LED with white
		for (int i = 0; i <= 59; i += 5)
			leds[i] = CRGB::White;
		
		// Fill the hour, minutes and second
		leds[second] = CRGB::Blue;
		leds[minutes] = CRGB::Green;
		leds[(hour%12)*5 + (minutes/12)] = CRGB::Red;

		// If the second and minutes are overlapped
		if (second == minutes) {
			leds[second] = CRGB::Cyan;
		}
		// If the second and hour are overlapped
		if (second == (hour%12)*5 + (minutes/12)) {
			leds[second] = CRGB::Purple;
		}
		// If the minutes and hour are overlapped
		if (minutes == (hour%12)*5 + (minutes/12)) {
			leds[minutes] = CRGB::Yellow;
		}
		// If all the second, minutes and hour are overlapped
		if (second == minutes && minutes == (hour%12)*5 + (minutes/12)) {
			leds[second] = CRGB::White;
		}
		
		FastLED.show();
	}
	
	// Every minute, get a moving rainbow color
	if (second == 0) {
		for (int i = 0; i < NUM_LEDS; i++) {
			leds[i] = CHSV((i*255/NUM_LEDS-millis()/10)%255, 255, 255);

		}
		FastLED.show();
	}
}
```


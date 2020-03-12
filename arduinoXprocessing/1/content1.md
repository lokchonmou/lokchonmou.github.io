# 1. Getting start with arduino

本章主要涵蓋Arduino的四大I/O。分別是：digital output, digital input, analog input 和 analog output。

大部分的情況底下，只要把握這四大I/O，融會貫通，就能打通任督二脤，打遍天下無敵手。例如，只要把握digital input，懂得用按鍵控制，那，只要在地毯底下接入兩條導線，就能在有人走過時觸動機關；只要把金屬風鈴分別接上兩條導線，就能在有風時觸動；又例如，分別放幾顆銅釘(不同高度)在路邊，各接上導線，就能監測雨水淹浸的情況。

此凡種種，在學完本章以後，再加上想像力，就能解決生活中不少問題。

[TOC]

## Arduino UNO技術參數

![dfduino UNO](./dfduino%20UNO.png)

我們課堂用的是DFrobot出品的[DFRduino UNO R3](http://www.dfrobot.com/index.php?route=product/product&product_id=838)。

| INPUT                 | VOLTAGE            | USAGE                                                        |
| :-------------------- | :----------------- | :----------------------------------------------------------- |
| **Input Voltage**     | 7-15V              | UNO有三個電源輸入的方法：USB傳輸口(5V)， DC Jack(7-15V)和Vin腳位(7-15V)，其中DC電源插頭和Vin腳位是連在一起的。 |
| **Operating Voltage** | 5V                 | UNO工作電壓為5V，power pin有Vin, 5V, 3.3V三個電壓可供使用。<br />但記住，用5V和3.3V時電流不能太大(例如接入servo motor)，否則DC Jack旁小小的7805穩壓器會很熱，之後便會燒毀。<br />就算Vin腳位和DC Jack頭也盡量不要太高電流，UNO本來的設計不是用來供大電流用的。 |
| **Digital Input**     | 14 (pin 0 -pin 13) | 1. UNO有14隻digital的I/O插頭，透過編程可隨意控制輸入輸出。<br />2. Serial: 一般pin 0(RX) 和pin 1(TX)會留用，用作與電腦連接的接口(USB)。用以接收TTL Serial data。<br />3. UNO的pin 13連結至一粒內置LED，當 pin 腳為 HIGH 時，LED 打開，當 pin 腳為 LOW 時，LED 關閉。4. PWM: 3, 5, 6, 9, 10 和 11 共六支腳。透過[analogWrite()](http://arduino.cc/en/Reference/AnalogWrite) 函式可以提供 8-bit (0~255) 的 PWM 輸出。 |
| **Analog Input**      | 6 (A0 - A5)        | 每個提供10-bits resolution(i.e. 0~1023)                      |

## Arduino IDE與語言

Arduino 的軟體開發環境是開放源碼的 IDE (Open-source IDE)，可以在它的[官網](http://arduino.cc/en/main/software)免費下載，它所用的程式語言語法類似於 C/C++，而且 Arduino IDE 是跨平台的，有 Windows, Macintosh OSX 和 Linux 的版本。Arduino IDE 的軟體介面如下:

![螢幕快照 2015-03-31 上午10.03.02](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-03-31%20%E4%B8%8A%E5%8D%8810.03.02.png)

第一次入門，請參考[官網](http://arduino.cc/en/Guide/HomePage)的手把手入門教學或[中文版](http://coopermaa2nd.blogspot.com/2010/12/arduino.html)的入門。

### Arduino program基礎結構

Arduino program基本分為兩部分：

```c++
void setup() {
  // put your setup code here, to run once:

}
```

只會在一開始時運行一次，通常用檢設定參數。

```c++
void loop() {
  // put your main code here, to run repeatedly:

}
```

Arduino program的main function。這個function會一直重覆執行，直到電源斷開。
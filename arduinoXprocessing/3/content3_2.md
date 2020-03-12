# 3.2 Arduino digitalRead() -> Processing

[TOC]

## 黑白顯示轉換

### 效果

按下物理按鍵後，Processing的顯示屏幕會由白色轉為黑色，再按多一次，會由黑色轉為白色。

### 電路圖

![螢幕快照 2015-04-01 下午07.37.57](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-01%20%E4%B8%8B%E5%8D%8807.37.57.png)

### 程式碼

#### Arduino

```java
byte push_button = 2;
boolean button_state, last_button_state;
unsigned long button_counter;

void setup(){
        Serial.begin(115200);
	pinMode(push_button, INPUT);
}

void loop(){
	button_state = digitalRead(push_button);

	if(button_state != last_button_state && button_state == HIGH){
		button_counter++; 
	}
	
	if(button_counter % 2 == 0)  Serial.println(0);	
	else Serial.println(1);

	last_button_state = button_state;
}
```

#### Processing

```java
import processing.serial.*;
Serial myPort;

int x_position, y_position;

void setup() {
  size(512, 512);
  println(Serial.list());
  myPort = new Serial(this, Serial.list()[0], 115200);
  myPort.bufferUntil('\n');
}

void draw() {
  //此處為空
}

void serialEvent(Serial myPort){
  String myString = myPort.readStringUntil('\n');
  myString = trim(myString);

  int data[] = int(split(myString, ','));

  for (int i = 0; i < data.length; i++) {
    print(data[i] + "     ");
  }
  println();
  if (data[0] == 0)  background(0);
  else if (data[0] == 1)  background(255);
}
```

### 說明

整段程式碼幾乎和[上一章](./content3_1.html)的一樣。

Processing在Arduino中收到一個數據，非`0`就是`255`。再把這個數據用`background(data[0]);`顯示出來。

`background()`有幾種用法，Processing預設顏色模式是RGB mode：
`background(red, green, blue);`

三個數值都是介乎於0-255之間，例如`(255,0,0)`就是紅色，`(0,255,0)`就是綠色。 也可以只輸入一個0-255間的數值，代表灰度，0就是黑色，255就是白色。詳細可參考[這裡](https://processing.org/reference/background_.html)。 

## 動動腦

1. 將上面的例程改進，參考[模式轉換](../1/content1_2.html#模式轉換)，每按一下，背景顏色分別順序變成：黑、啡、紅、橙、黃、綠、藍、紫、灰、白。(p.s.  Processing本身有顏色選擇器，在"Tools --> Color Selector")
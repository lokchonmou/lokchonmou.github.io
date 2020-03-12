#1.2 digital input

本章主要講述Arduino digital輸入的用法，分別有：準位觸發(level-trigger)、邊緣觸發(edge-trigger)、自鎖和模式轉換(轉mode)。

[TOC]

## 準位觸發(level-trigger)

準位觸發是指當你按著按鍵時，Arduino才執行對應的工作，會當放手時，便會停止。

### 效果

今次例程中，當按著按鍵時， Arduino 內建的LED會開，當放手時便會關。

### 電路圖

![螢幕快照 2015-04-01 下午07.37.57](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-01%20%E4%B8%8B%E5%8D%8807.37.57.png)

### 程式碼

```java
byte LED = 13;
byte push_button = 2;

void setup(){
	pinMode(LED, OUTPUT);
	pinMode(push_button, INPUT);
}

void loop(){
	if(digitalRead(push_button) == HIGH){
		digitalWrite(LED, HIGH);
	}
	else{
		digitalWrite(LED, LOW);
	}
}
```

### 說明

按鍵按線有兩種接法，分別為上拉和下拉，效果剛好相反。

![螢幕快照 2015-04-01 下午08.00.35](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-01%20%E4%B8%8B%E5%8D%8808.00.35.png)

![螢幕快照 2015-04-01 下午08.01.04](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-01%20%E4%B8%8B%E5%8D%8808.01.04.png)

用pull-down resistor的話, 按鍵**按下**時，`2`腳收到的信號是`HIGH`, **放手**時是`LOW`。用pull-up resistor的話就剛好相反。一般會建議用==下拉==比較好，不用在編程時再將邏輯反轉，但其實Arduino本身是內置**上拉(pull-up)**電阻的，如果想減少接線，也可以使用，編程時只要小心點，試多幾次，一般上拉下拉問題都不大。

`digitalRead(push_button)` : 用來讀取`push_button`腳位(這例子是`2`腳)的狀態，如果是**放手**，就關`13`腳接著的內建LED，**按著**時就亮LED。

## 邊緣觸發(edge-trigger)

邊緣觸發是指當你按下按鍵的瞬間，Arduino執行對應的工作，即使按下之後繼續按著按鍵也不會有影響。

邊緣觸發有分兩種，**上升緣觸發**和**下降緣觸發**，即按下的一瞬觸發和放手的一瞬間觸發。

### 效果

今次例程中，當**按下**按鍵的瞬間， Arduino 內建的LED會亮一秒鐘。

### 電路圖

![螢幕快照 2015-04-01 下午07.37.57](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-01%20%E4%B8%8B%E5%8D%8807.37.57.png)

### 程式碼

```java
byte LED = 13;
byte push_button = 2;
boolean button_state, last_button_state;
unsigned long timer;

void setup(){
	pinMode(LED, OUTPUT);
	pinMode(push_button, INPUT);
}

void loop(){
    //=== 1 ===================================
	button_state = digitalRead(push_button);

    //=== 2 ===================================
	if(button_state != last_button_state && button_state == HIGH){
	    timer = millis();
	}
	
    //=== 3 ===================================
	last_button_state = button_state;
	
    //=== 效果 =================================
	if(millis() - timer <=1000)    digitalWrite(LED, HIGH);
	else     digitalWrite(LED, LOW);
}
```

### 說明

這程式的結構分為三個部分：

1. `button_state = digitalRead(push_button);`
2. `if(button_state != last_button_state && button_state == HIGH){	` 
	`}`
3. `last_button_state = button_state;`



第一部分是用一個`boolean`變數`button_state`紀錄下`push_button`(即`2`腳)的狀態。

第二部分， `!= `即為不等於(詳見[這裡](https://www.arduino.cc/reference/en/))，`button_state`不等於`last_button_state`即按下去的一瞬間，兩個`boolean`才會不同，而`button_state == HIGH`，即上升緣觸發，如果要下降緣觸發，就設`button_state == LOW`。

第三部分，`last_button_state = button_state `要放在`loop()`的最下方，讓每一個`loop()`的循環更新一次。



如果有兩個`push_button`，就應該是：

1. `button_state0 = digitalRead(push_button0);`
	`button_state1 = digitalRead(push_button1);`
2. `if(button_state0 != last_button_state0 && button_state0 == HIGH){`
	`}`
	`if(button_state1 != last_button_state1 && button_state1 == HIGH){`
	`}`
3. `last_button_state0 = button_state0;`
	`last_button_state1 = button_state1;`

這二、三段可以在中間插入其他程式碼。



又如果，要兩個按鍵的工作互不干擾，就不能用`delay()`作為延時，所以，上述程式碼需要結合前一章的[多工作業](./content1_1.html#arduino-多工作業)，改成以下：

![螢幕快照 2015-04-13 下午04.34.31](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-13%20%E4%B8%8B%E5%8D%8804.34.31.png)

所以最終你會見到程式碼分為4個主要小段: 

```java
//=== 1 ===================================
button_state = digitalRead(push_button);

//=== 2 ===================================
if(button_state != last_button_state && button_state == HIGH){
    timer = millis();
}

//=== 3 ===================================
last_button_state = button_state;

//=== 效果 =================================
if(millis() - timer <=1000)    digitalWrite(LED, HIGH);
else     digitalWrite(LED, LOW);
```

## 自鎖

電子電路的物理按鍵，有一種是自鎖開關，即按下時會觸發某事，再按多一下時才解除，在Arduino中，一樣可以用一顆普通的按鍵，用程式做到這效果。 

### 效果

今次例程中，當按下按鍵時，Ardunio內建的LED會亮起，當再按下時便會關。

### 電路圖

![螢幕快照 2015-04-01 下午07.37.57](./%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202015-04-01%20%E4%B8%8B%E5%8D%8807.37.57.png)

### 程式碼

```java
byte LED = 13;
byte push_button = 2;
boolean button_state, last_button_state;
unsigned long button_counter;

void setup(){
	pinMode(LED, OUTPUT);
	pinMode(push_button, INPUT);
}

void loop(){
	button_state = digitalRead(push_button);

	if(button_state != last_button_state && button_state == HIGH){
		button_counter++; 
	}
	
    //==== 新增==================================================
	if(button_counter % 2 == 0)	digitalWrite(LED, LOW);
	else digitalWrite(LED, HIGH);
	//==========================================================
    
	last_button_state = button_state;
}
```

### 說明

這程式碼包括[上一節edge-trigger](#邊緣觸發(edge-trigger))的三個部分。再在中間加插了一段：

```java
if (button_counter % 2 == 0)	digitalWrite(LED, LOW);
else digitalWrite(LED, HIGH);
```

`button_counter % 2`的意思就是將`button_counter`除`2`，取其餘數，餘數等於`0`，即是雙數，餘數等於`1`，即是單數，用單雙數去轉換LED的開關。

## 模式轉換

模式轉換是融會了上兩個例程之後的效果。用Arduino時如果要做顯示，我們一般會用現成的LCD模組顯示，但LCD一般只有兩行，每行16個字母，所以要顯示很多資訊時，會加一個按鍵，每按一下就翻下一版。

### 效果

今次例程中，當按下按鍵時，`LED1`和`LED2`會跟隨二進制的模式分別亮起，即`00`, `01`, `10`, `11`四個模式。

### 電路圖

$R_1 = 10k \Omega , R_2 = 560\Omega$

![circuit-1](./circuit-1.png)

### 程式碼

```java
byte LED[] = {8, 9};
byte push_button = 2;
boolean button_state, last_button_state;
unsigned long button_counter;

void setup(){
	pinMode(LED[0], OUTPUT);
	pinMode(LED[1], OUTPUT);
	pinMode(push_button, INPUT);
}

void loop(){
	button_state = digitalRead(push_button);

	if(button_state != last_button_state && button_state == HIGH){
		button_counter++; 
	}
	

	if(button_counter % 4 == 0)	{
		digitalWrite(LED[0], LOW);
		digitalWrite(LED[1], LOW);
	}
	else if(button_counter % 4 == 1){
		digitalWrite(LED[0], LOW);
		digitalWrite(LED[1], HIGH);
	}
	else if(button_counter % 4 == 2){
		digitalWrite(LED[0], HIGH);
		digitalWrite(LED[1], LOW);
	}
	else if(button_counter % 4 == 3){
		digitalWrite(LED[0], HIGH);
		digitalWrite(LED[1], HIGH);
	}

	last_button_state = button_state;
}
```

### 說明

承[上一節自鎖](#自鎖)，

```java
if(button_counter % 4 == 0)	{
		digitalWrite(LED[0], LOW);
		digitalWrite(LED[1], LOW);
	}
	else if(button_counter % 4 == 1){
		digitalWrite(LED[0], LOW);
		digitalWrite(LED[1], HIGH);
	}
	else if(button_counter % 4 == 2){
		digitalWrite(LED[0], HIGH);
		digitalWrite(LED[1], LOW);
	}
	else if(button_counter % 4 == 3){
		digitalWrite(LED[0], HIGH);
		digitalWrite(LED[1], HIGH);
	}
```

在把餘數的概念發展開去，就可以變成模式轉換，上例是有4個模式，如果只需要3個模式或者要5個模式，就將`%4`分別轉成`%3`和`%5`。

## 動動腦

1. 試根據第二個例題的[edge-trigger](#邊緣觸發(edge-trigger))，用兩個按鍵，分別控制兩粒LED，按鍵1按下時，LED1亮1秒，按鍵2按下時，LED2亮1秒，互相不會干擾，即，LED1計時中，按鍵2仍能正常運作。

2. 承上題的線路，再加多兩顆LED，結合[例程3自鎖](#自鎖)和[例程4模式轉換](#模式轉換)，當每按下按鍵1一下時，LED跑馬燈向右走一步，每按下按鍵2一下時，LED跑馬燈向左走一步。

	![4led](4led.png)
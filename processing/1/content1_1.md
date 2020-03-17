# 1.1 Button

由於Processing的易用性，製作互動軟件和動畫都十分方便。但當上手了之後，總有人會問，既然用來做互動這麼方便，哪有否辦法製作一些簡單的用戶介面(GUI)，用來配合自己的程式或者用來控制Arduino呢?

答案是肯定的。Processing[官方](https://processing.org/reference/libraries/#gui)推薦的擴展library裡面，就有一欄是專門推薦現是的GUI library，比較出名的有G4P和ControlP5，ControlP5的用法比較簡單直接，而且由輸入到輸出，由介面的頁面到視窗都有，而G4P甚至有一個專門的GUI builder讓你可以用拖拉的方法去編排介面，早期我自己都很常用這兩個library，但這兩個library都有一個特點:醜。

<img src="./%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202020-03-17%20%E4%B8%8B%E5%8D%882.57.23.png" alt="G4P截圖" style="zoom: 25%;" /><img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202020-03-17%20%E4%B8%8B%E5%8D%882.57.52.png" alt="ControlP5截圖" style="zoom:25%;" />



後來在一位學生的幫助和啟發下，決定自己建立自己的GUI class，作為挑戰自己和給自己的練習題。

[TOC]

## Button Class

```java
class Button{
    float xpos, ypos, bWidth, bHeight;
    String label;
    int tSize;
    boolean isChecked = false;
    boolean selfLock = false;

    Button (float x, float y, float bW, float bH, String l){
        xpos = x;
        ypos = y;
        bWidth = bW;
        bHeight = bH;
        label = l;
        tSize = 12;
    }
    Button (float x, float y, float bW, float bH, String l, int tS){
        xpos = x;
        ypos = y;
        bWidth = bW;
        bHeight = bH;
        label = l;
        tSize = tS;
    }

    Button (float x, float y, float bW, float bH, String l, int tS, boolean _selfLock){
        xpos = x;
        ypos = y;
        bWidth = bW;
        bHeight = bH;
        label = l;
        tSize = tS;
        selfLock = _selfLock;
    }

    public boolean mousePressed(){
        boolean isOverRect = overRect();
        if (isOverRect) {
            if (selfLock) isChecked = !isChecked;
        }
        return isOverRect;
    }

    void display(){
        rectMode(CENTER);
        strokeWeight(6);
        stroke(isChecked? #000000 : #89A3FF);
        fill(overRect()?#D6CF49:#FFFCA7);
        rect(xpos, ypos, bWidth, bHeight, 0, 10, 0, 10);
        fill(0);
        textSize(tSize);
        textAlign(CENTER, CENTER);
        text(label, xpos, ypos);
    }

    boolean overRect() {
        if (mouseX >= xpos-bWidth/2 && mouseX <= xpos+bWidth/2
            && mouseY >= ypos-bHeight/2 && mouseY <= ypos+bHeight/2) return true;
        else return false;
    }

}
```

<img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202020-03-17%20%E4%B8%8B%E5%8D%883.02.47.png" alt="螢幕截圖 2020-03-17 下午3.02.47" style="zoom:50%;" />

我自己的習慣，會建立一個分頁tag，之後將整個class貼上去，在主頁上再加上其他code，那就比較簡潔易整理。

## 應用範例

```java
Button b1, b2, b3;

void setup(){
    size(600,200);
    pixelDensity(displayDensity());
    //Button (float x, float y, float bW, float bH, String l){
    b1 = new Button(width/4, height/2, 120, 50, "demo button 1");
    //Button (float x, float y, float bW, float bH, String l, int tS)
    b2 = new Button (width/2, height/2, 120, 50, "demo button 2", 16);
    //Button (float x, float y, float bW, float bH, String l, int tS, boolean _selfLock)
    b3 = new Button (width/4 * 3, height/2, 120, 50, "demo button 3", 16, true);
}

void draw(){
    b1.display();
    b2.display();
    b3.display();
}

void mousePressed(){
    if (b1.mousePressed()) println("b1 is pressed");
    if (b2.mousePressed()) println("b2 is pressed");
    if (b3.mousePressed()) println("b3 is pressed, " + "i am " + b3.isChecked);

}
```

![螢幕截圖 2020-03-17 下午3.08.20](./%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202020-03-17%20%E4%B8%8B%E5%8D%883.08.20.png)

###新增

在這個button class之內，有3個方法可以建立按鍵，分別為:

1. `Button (float x, float y, float bW, float bH, String l)` :
	`x`和`y`分別是button的中心座標;
	`bw`和`bH`是按鍵的寬和高;
	`l`則是按鍵需要顯示的文字。
2. `Button (float x, float y, float bW, float bH, String l, int tS)`: 
	`x`和`y`分別是button的中心座標;
	`bw`和`bH`是按鍵的寬和高;
	`l`則是按鍵需要顯示的文字;
	`tS`是textSize，文字顯示的大小。
3. `Button (float x, float y, float bW, float bH, String l, int tS, boolean _selfLock)`:
	`x`和`y`分別是button的中心座標;
	`bw`和`bH`是按鍵的寬和高;
	`l`則是按鍵需要顯示的文字;
	`tS`是textSize，文字顯示的大小;
	`_selfLock`用`true`或者`false`輸入，表示是否一個自鎖按鍵。

###顯示

三個方法所新增的按鍵，都需要在另外加一個`.display()`作為按鍵顯示的udate狀態。

###按鍵

按鍵本身內置了mousePressed function，但只作為一個function而不是mousePressed事件只是刻意的同名，方便紀憶而已，所以要在主程式的mousePressed event中，加入:`if (b1.mousePressed()) println("b1 is pressed");`，以便在按下按鍵下進行相關的動作。
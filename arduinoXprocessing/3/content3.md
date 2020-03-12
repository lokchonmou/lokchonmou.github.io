# 3. Arduino X Processing

[TOC]

## Getting started with Processing

Processing可免費和開源的。可以在其[官網](https://processing.org/download/)下載。Processing專門為電子藝術和視覺互動設計而創建。Processing語言建立在JAVA語言的基礎上，所以可用JAVA的library，但語法上有所簡化和易於圖形編程。

由於本篇主要介紹Arduino如何與Processing溝通，基礎的Processing教學在[這裡](https://processing.org/tutorials/) (官網英文版教學，十分詳盡)或者可以參考[Getting started with Processing](https://books.google.com/books/about/Getting_Started_with_Processing.html?id=RzDjk8u7rfAC&source=kp_cover) (這本書，十分易上手的入門書，亦有pdf版提供，但市面有點難找)。

如果想快速建立漂亮的Processing用戶介面或顯示，可能參考[Processing常用模組]()。

## Processing IDE 與語言

Processing的開發環境(IDE)可在其[官網](https://processing.org/download/)下載。而且Processing是跨平台的，有 Windows, Macintosh OSX 和 Linux 的版本。你甚至可以利用第三方軟件，在Android上編寫Processing程式，令你所寫的程式變成Android app。Processing的開發介面如下：

<img src="./%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202020-03-12%20%E4%B8%8B%E5%8D%884.54.42.png" alt="螢幕截圖 2020-03-12 下午4.54.42" style="width:50%;" />

###Processing語言基礎結構

Processing的基礎結構與Arduino類似，一樣分兩個主要部分。setup()只會運行一次。而Arduino中的loop()函數，在Processing中則變成draw()。

### 第一支Processing程式

#### 效果

圓形會跟隨mouse的位置出現，而按下mouse左鍵會令圓形的顏色改變。

#### 程式碼

``` java
void setup() {
  size(580, 120);  
}

void draw() {
  if (mousePressed) {
    fill(0,0,255);
  }
  else{
    fill(255, 0, 0);
  }
  ellipse(mouseX, mouseY, 20, 20);
}
```

#### 說明

`size(580, 120); ` : 就是設定Processing的顯示視窗的大小。580像素寬，120像素高。

`mousePressed` : mouse按下會回傳`TRUE`，非按下回傳`FALSE`。

`fill(0,0,255);` : 是把圓形填色，三個數字分別代表紅，綠，藍。0為最少, 255最大。

`ellipse(mouseX, mouseY, 20, 20);` : ellipse是畫橢圓形，頭兩個是橢圓形圓心位置，後兩個數值是橢圓形的寬和高。

其他常用指令請參考[這裡](https://processing.org/reference/)。

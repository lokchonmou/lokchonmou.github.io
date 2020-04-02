#0. 前言與安裝

這個系列所寫的都是Processing的class，原本Processing是有人開發了Matrix的library，叫做papaya，功能也十分齊全，但我希望重新再寫一個，原因是papaya library所有的數值都是用float而非double去儲存，好幾次我做robotics應用時，matrix多次運算後發現其精度降低了不少。其二是希望只用class來寫而不靠java library來做，方便有需要時整個轉移，例如可以使用在P5.js的javascript上，或者之後轉移成Arduino的firmware應用。

## 下載

可以在[這裡](../Matrix.pde)下載整個pde檔。

## 使用

下載來的pde檔是不能直接用的，你可以在你的項目中加入分頁貼上。或者放在你的項目檔內: 例如你的檔案叫做matirxDemo，那麼你應該有一個folder叫做`matrixDemo`，需在`matrixDemo`之中，又有pde檔`matrixDemo/matrixDemo.pde`，在這個folder之中貼上下載來的pde檔:`matrixDemo/Matrix.pde`，最後則如下圖:

<img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202020-04-02%20%E4%B8%8B%E5%8D%886.12.45.png" alt="螢幕截圖 2020-04-02 下午6.12.45" style="zoom:50%;" />

在第一個頁面`matrixDemo`中，輸入:

```java
Matrix Mat = new Matrix();

void setup() {
    Mat.Print(Mat.EYES(3));
    exit();
}

void draw() {
}
```

如果沒有告訴你錯誤，而run後得出來的結果為:

```
1.0	0.0	0.0	
0.0	1.0	0.0	
0.0	0.0	1.0
```

則說明沒有錯誤。
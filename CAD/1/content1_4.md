#1.4 Basic Drawing

本章將會介紹一個基礎的3d圖形(主要由2d sketch組成)，讓同學熟習使用不同的面的2d sketch組合成一個3d圖形，介紹完之後，在本章的最下面會有幾條練習題。

[TOC]

## 1. Bracket

 [Bracket Drawing v6.pdf](Bracket Drawing v6.pdf) 

<a href="image20210913110350355.png" target="_blank"><img src="image20210913110350355.png" style="zoom:75%;" /></a>

###Step 1

1. 用hotkey`s`快速搜尋
2. 搜尋`new component`建立一個新的元件

<img src="fusion41.gif" alt="fusion41" style="zoom:50%;" />

###Step 2

1. 用`new sketch`在xz平面上建立一個新的2d sketch

<img src="fusion42.gif" alt="fusion42" style="zoom:50%;" />

2. 用hotkey`c` 和`r`建立圓形和長方形
  **💡利用hotkey `d` 來標示尺寸**

<img src="fusion43.png" alt="fusion43" style="zoom:50%;" />

3. 利用2d約束，將長方形相切和固定，之後就可以繼續跟據尺寸劃餘下的部分

<img src="fusion44.gif" alt="fusion44" style="zoom:50%;" />

<img src="fusion45.png" alt="fusion45" style="zoom:50%;" />

4. 用hotkey`e`擠出實體，尺寸為`32.5`，最好選擇對稱，方便另一個面的編輯(也可以不用對稱)

<img src="fusion46.gif" alt="fusion46" style="zoom:50%;" />

###Step 3

1. 在右側的面建立一個2d sketch

<img src="fusion47.gif" alt="fusion47" style="zoom:50%;" />

2. 跟據尺寸，劃中心線和一個圓形
3. 中心線可以用hotkey `x` 來將實線轉換成作圖線
4. 兩邊的斜角有兩種方法去劃:
	1. 一是先劃好一邊，再用`mirror`
	2. 另一個方法是隨意劃好兩邊的線，再用2d約束令其對稱

<img src="fusion48.gif" alt="fusion48" style="zoom:50%;" />

<img src="fusion49.gif" alt="fusion49" style="zoom:50%;" />

5. 最後用hotkey `e` 選擇去切去的部分，用`to object`指定後面的面切去

<img src="fusion410.gif" alt="fusion410" style="zoom:50%;" />

### Step 4

1. 在上方的面建立一個2d sketch

<img src="fusion411.gif" alt="fusion411" style="zoom:50%;" />

2. 建立一條中心線

3. 用hotkey `x` 將線轉成作圖線

4. 隨意劃兩個圓

5. 用2D 約束，將圓指定為相等，垂直和對稱
	💡 你也可以劃好一邊後用`mirror`將其鏡像
	
6. 之後指定其餘的尺寸

<img src="fusion412.gif" alt="fusion412" style="zoom:50%;" />

<img src="fusion413.png" alt="fusion413" style="zoom:50%;" />

7. 用hotkey `e`，將兩個孔切掉，跟之前一樣，用`to object`

<img src="fusion414.gif" alt="fusion414" style="zoom:50%;" />

### Step 5

1. 最後，用hotkey `f`，選擇fillet工具，選取三條邊，將其修`2mm`半徑

<img src="fusion415.gif" alt="fusion415" style="zoom:50%;" />

------

## 2. Guide block

 [Guide block Drawing v3.pdf](Guide block Drawing v3.pdf) 

<a href="fusion416.png" target="_blank"><img src="fusion416.png" style="zoom:75%;" /></a>

### Step 1

1. 用hotkey `s` 搜尋`new component`開一個新的component

<img src="fusion417.gif" alt="fusion417" style="zoom:50%;" />

2. 搜尋`sketch`，在xy平面上開一個新的sketch

3. 搜尋`center rectangle`，在中心點建立一個任意大小的長方形

<img src="fusion418.gif" alt="fusion418" style="zoom:50%;" />

4. 用hotkey `d`，標示長方形尺寸

<img src="fusion419.png" alt="fusion419" style="zoom:50%;" />

5. 用hotkey `e`，擠出長方形高度為`5mm`

<img src="fusion420.png" alt="fusion420" style="zoom:50%;" />

### Step 2

1. 在長方形的上方建立一個new sketch

<img src="fusion421.png" alt="fusion421" style="zoom:50%;" />

2. 用`center rectangle`，畫一個稍為小一點的長方形

<img src="fusion422.gif" alt="fusion422" style="zoom:50%;" />

3. 擠出高度`20mm`

<img src="fusion423.png" alt="fusion423" style="zoom:50%;" />

### Step 3

1. 在右側的面建立一個new sketch

<img src="fusion424.png" alt="fusion424" style="zoom:50%;" />

2. 用hotkey `r`隨意畫一個長方形

3. 之後用2d約束的midPoint將方形貼齊到中點

4. 用`d`標示尺寸

<img src="fusion425.gif" alt="fusion425" style="zoom:50%;" />

5. 用hotkey `e`切去中心的位置，選擇`to object`選左側的面

<img src="fusion426.png" alt="fusion426" style="zoom:50%;" />

### Step 4

1. 在正面的的面建立一個new sketch

<img src="fusion427.png" alt="fusion427" style="zoom:50%;" />

2. 任意劃兩條切角的線，再用對稱約束將兩條線指定對稱

<img src="fusion428.gif" alt="fusion428" style="zoom:50%;" />

<img src="fusion429.png" alt="fusion429" style="zoom:50%;" />

3. 用`e`將角落切去，切去時選擇用`to object`

<img src="fusion430.gif" alt="fusion430" style="zoom:50%;" />

## 3. 練習題

下面的題目, 每個格為10x10mm

<img src="image-20220530150541546.png" alt="image-20220530150541546" style="width:45%;" /><img src="image-20220530150609997.png" alt="image-20220530150609997" style="width:45%;" />

<img src="image-20220530150723707.png" alt="image-20220530150723707" style="width:45%;" /><img src="image-20220530150751115.png" alt="image-20220530150751115" style="width:45%;" />

<img src="image-20220530151438949.png" alt="image-20220530151438949" style="width:45%;" /><img src="image-20220530151557698.png" alt="image-20220530151557698" style="width:45%;" />

<img src="image-20220530151640990.png" alt="image-20220530151640990" style="width:45%;" />

<img src="image-20220530154626720.png" alt="image-20220530154626720"  />

Hints:

1. 先不用理會圓角位置, 建立一個大概的側視圖, 然後標示尺寸, 之後對稱擠出

![image-20220530155531093](image-20220530155531093.png)

2.  圖則中的`Ø20 THRU ALL ⌵24X82º` 即直徑20mm的孔countersink(沉孔)82º, fusion360有個後簡單的鑽孔指令, 就是`holes`, hotkey `H`, 選取選左邊直邊作為reference, 距離32mm, 選取上面的水平邊為另一reference, 距離31mm, 深度(`Extents`)選`All`, `Hole Type` 選擇第三個沉孔`Countersink`, `Hole Tap Type`即孔是否要攻螺絲牙, 今次不用, 所以選第一個`Simple`, Drill Point就是鑽孔的尾端是平還是尖, 今次選哪一個都可以, 因為孔是完全穿的

![image-20220601174113685](image-20220601174113685.png)

3. 其他的孔可以用sketch劃好後用extrude減去, 或用hole指令去完成都可以, 而修角則可用`chamfer` 指令去做, 最後用fillet來修圓角

![image-20220530160228432](image-20220530160228432.png)
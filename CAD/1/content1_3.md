#1.3 2D constraints

Fusion360跟AutoCAD/rhino等最大的分別，是它的特徵編輯性，情況更加像**數學幾何**。相反，AutoCAD和rhino是用座標系統去做編輯的。

舉一個例子，如果用AutoCAD/rhino等，劃一條相切兩個圓的線，線的儲存方法是紀錄線段的頭尾兩點的座標，但如果兩個圓的尺寸和位置有所改變，**切線是不會跟著變的**。但特徵編輯軟件的特色，是更接近**數學幾何的邏輯**，切線是紀錄線的幾何特性是相切，所以即使圓的尺寸和座標變動，線段也會相切兩個圓。

[TOC]

##2D constraints(約束)

以下是fusion360的2D約束:

![2dconstraints](image20210913091628458.png)

### Horizontal/Vertical(水準/垂直)

顧名思義就是將點選的物件保持水準或垂直，物件可以是直線或兩個點。

<img src="fusion12.gif" alt="fusion12" style="zoom:50%;" />

<img src="fusion13.gif" alt="fusion13" style="zoom:50%;" />

###Coincident(重合)

將兩個點約束在一起，或將點約束到曲線上。

<img src="fusion14.gif" alt="fusion14" style="zoom:50%;" />

### Tangent(相切)

將與圓形或弧形將接的線，移動到切於圓形或弧形的位置。

<img src="fusion15.gif" alt="fusion15" style="zoom:50%;" />

### Equal(相等)

調整所旗的兩條直線(或圓形、弧形)的長度與半徑大小，使之相等。善用equal約束，可以十分方便地調整螺絲孔的大小，例如由M3螺絲轉成M2螺絲，只需要改變一個參數即可。

<img src="fusion16.gif" alt="fusion16" style="zoom:50%;" />

###Parallel(平行)

使所旗的線彼此互相平行。

<img src="fusion17.gif" alt="fusion17" style="zoom:50%;" />

### Perpendicular(垂直)

使所選的線互相垂直。

<img src="fusion18.gif" alt="fusion18" style="zoom:50%;" />

### Fix/Unfix(固定/取消固定)

將點、直線或曲線鎖定要固定點或位置，或鎖定其長度。
❗***<u>盡量避免使用這個功能</u>***

<img src="fusion19.gif" alt="fusion19" style="zoom:50%;" />

### MidPoint(中點)

約束兩條(或以上)線段的中點位置。

<img src="fusion110.gif" alt="fusion110" style="zoom:50%;" />

### Concentric(同心)

約束兩個圓形、橢圓或弧線的圓心在同一點上。

<img src="fusion111.gif" alt="fusion111" style="zoom:50%;" />

### Collinear(共線)

使兩條或以上的線段位於同一條線(或延伸線)上。

<img src="fusion112.gif" alt="fusion112" style="zoom:50%;" />

### Symmetry(對稱)

約束所選的圖元，使其在旗取的一條線兩邊互相對稱。
💡  此功能跟`mirror`功能是一樣的，分別在於這功能是所劃好兩邊的圖形再提定對稱

<img src="fusion113.gif" alt="fusion113" style="zoom:50%;" />

### Curvature(平滑)

約束一條曲線，使其與另一條曲線、直線、圓弧相接並保持連續性。
💡 *此功能適用於貝茲曲線*

<img src="fusion114.gif" alt="fusion114" style="zoom:50%;" />

## 練習

### 練習1

![2dSketch9](2dSketch9.gif)


1. 首先跟據其大約外型, 用hotkey `L`, 劃出大約的型狀

<img src="2dSketch1.gif" alt="2dSketch1" style="zoom:50%;" />


2. 用`Horizontal/Vertical(水準/垂直)`或者`Perpendicular(垂直)`工具, 確保所有線都是垂直或水平的

<img src="2dSketch2.gif" alt="2dSketch2" style="zoom:50%;" />

3. 用`Collinear(共線)`工具, 將"腳"設定成同一水平

<img src="2dSketch3.gif" alt="2dSketch3" style="zoom:50%;" />

4. 用`Equal(相等)`工具將"腳"的寬度設定成相等

<img src="2dSketch4.gif" alt="2dSketch4" style="zoom:50%;" />

5. 用hotkey `D`, 設定左下角的水平線為`20`
6. 之後設定左下角的小垂直線為`25`高

<img src="2dSketch5.gif" alt="2dSketch5" style="zoom:50%;" />

7. 其他尺寸跟據下圖標示, 記得確認一下全部線都變成黑色

<img src="2dSketch6.gif" alt="2dSketch6" style="zoom:50%;" />

8. 用hotkey `C`劃兩個圓形
9. 用`Horizontal/Vertical(水準/垂直)`工具點選兩個圓心, 令圓形水平
10. 用`Equal(相等)`工具將兩個圓的尺寸設定成相等

<img src="2dSketch7.gif" alt="2dSketch7" style="zoom:50%;" />

11. 最後設定圓形的尺寸和位置

<img src="2dSketch8.gif" alt="2dSketch8" style="zoom:50%;" />

12. 最後，用`s`搜尋`extrude`，或者直接用hotkey `e`或者`q`來叫出擠出命令，擠出10mm厚。

<img src="image-20230328093927930.png" alt="image-20230328093927930" style="zoom:40%;" />



### 練習2

![2dSketch14](2dSketch14.gif)

1. 用hotkey `L`和用hotkey `S`搜尋`3 point arc`, 劃出大概形狀(可以用mouse右鍵招出快速指令重覆上一次的指令)

<img src="2dSketch10.gif" alt="2dSketch10" style="zoom:50%;" />

2. 之後用`L`劃一條中心線, 用hotkey `X`將其變成作圖線
3. 用`Tangent(相切)`工具令所有圓都相切(如果左手邊的圓跟我的不同, 未有相切, 都要選擇令其相切)

<img src="2dSketch11.gif" alt="2dSketch11" style="zoom:50%;" />

4. 用`Coincident(重合)`工具令右下的圓形圓心跟橫線重合
5. 用`Symmetry(對稱)`工具, 先分別點選要對稱物件, 最後點選對稱線, 令整個圖形完全對稱

<img src="2dSketch12.gif" alt="2dSketch12" style="zoom:50%;" />

6. 用hotkey `C`劃兩個圓形, 用`Concentric(同心)`工具令圓形跟左右兩隻"耳仔"同心(或者你可以一開始就點選兩隻耳仔的圓心作為圓心)
7. 用`Equal(相等)`工具將兩個圓形限制成同一尺寸

<img src="2dSketch13.gif" alt="2dSketch13" style="zoom:50%;" />

8. 最後就可以用hotkey `D`標示全部尺寸，確保每一條線都是黑色

<img src="2dSketch14.gif" alt="2dSketch14" style="zoom:50%;" />

9. 最後用`extrude`擠出`10mm`
10. <img src="image-20230328094324369.png" alt="image-20230328094324369" style="zoom:40%;" />

### 練習3

![2dSketch21](2dSketch21.gif)

1. 由於圖形是對稱的, 所以跟之前一樣, 以原點為起點, 大約劃一下圖形的外形

<img src="2dSketch15.gif" alt="2dSketch15" style="zoom:50%;" />

2. 如果有些線沒有水平/垂直, 可以用`Horizontal/Vertical(水準/垂直) `或`Perpendicular(垂直)`工具令其水平/垂直(我的圖除了最後一條線外都是水平/垂直的)
3. 最後一條線, 可以用`Perpendicular(垂直)`工具垂直最左手邊的垂直線或用`Horizontal/Vertical(水準/垂直) `工具強制其水平, 或像我的方法用`Collinear(共線)`工具
4. 劃一條穿過原點的中心線, 用hotkey `X`將其變成作圖線

<img src="2dSketch16.gif" alt="2dSketch16" style="zoom:50%;" />

5. 用`Symmetry(對稱)`工具令所有垂直線對稱
6. 用`Collinear(共線)`工具將水平線變成同一水平

<img src="2dSketch17.gif" alt="2dSketch17" style="zoom:50%;" />

7. 之後就可以用hotkey `D`標示全部尺寸, 今次部分尺寸要選點到點之間的距離標示<img src="2dSketch18.gif" alt="2dSketch18" style="zoom:50%;" />

8. 之後用hotkey `S`搜尋`center rectangle`劃一個30x50的長方形, 長方形頂部距離最高點為20

<img src="2dSketch19.gif" alt="2dSketch19" style="zoom:50%;" />

9. 最後, 用`center to center slot`指令劃槽, 一般機械部件, 這種兩頭圓形中間長形的形狀稱為`slot`, 常見的機械部件軟件都會有這個指令
10. 之後就可以用對稱工具令slot對稱，最後標示尺寸

<img src="2dSketch20.gif" alt="2dSketch20" style="zoom:50%;" />

11. 接著就可以擠出`10mm`

<img src="image-20230328094729773.png" alt="image-20230328094729773" style="zoom:40%;" />

### 練習4 

以下3題用到, `Tangent(相切)`限制, `3-point arc`, `line`, `circle`

<img src="image-20220308201351801.png" alt="image-20220308201351801" style="width:45%;" />

<img src="image-20230328101818749.png" alt="image-20230328101818749" style="width:45%;" /><img src="image-20230328101845204.png" alt="image-20230328101845204" style="width:45%;" />

###練習5



<img src="image-20220308204627751.png" alt="image-20220308204627751" style="width:45%;" />

<img src="image-20230328102541602.png" alt="image-20230328102541602" style="width:45%;" /><img src="image-20230328102605141.png" alt="image-20230328102605141" style="width:45%;" />

###練習6

<img src="image-20220308205155202.png" alt="image-20220308205155202" style="width:45%;" />

<img src="image-20230328102813137.png" alt="image-20230328102813137" style="width:45%;" /><img src="image-20230328102836635.png" alt="image-20230328102836635" style="width:45%;" />

### 練習7

以下3題用到 `Symmetry(對稱)`限制, `Tangent(相切)`限制, `center rectangle`, `3-point arc`, `line`, `circle`

<img src="image-20220309110038369.png" alt="image-20220309110038369" style="width:45%;" />

### 練習8

<img src="image-20220309102033227.png" alt="image-20220309102033227" style="width:45%;" />

首先全部用`center rectangle`去劃，再去擠出，不要刪掉本身的輔助線，否則所有關係就會切斷。

<img src="image-20230328095210708.png" alt="image-20230328095210708" style="width:45%;" /><img src="image-20230328095239958.png" alt="image-20230328095239958" style="width:45%;" />

### 練習9

<img src="image-20220311122325621.png" alt="image-20220311122325621" style="width:45%;" />

這一條可以在2d sketch就已經劃`R10`的四分一圓，或者擠出後再用`fillet`指令修圓角

<img src="image-20230328103051997.png" alt="image-20230328103051997" style="width:45%;" /><img src="image-20230328103124797.png" alt="image-20230328103124797" style="width:45%;" />

### 練習10

以下幾題如有需要，可以先劃圓和線，不需要在2d sketch中做trim和fillet，在立體中做，可大幅減少錯誤

<img src="image-20220308193820988.png" style="width:45%;" /><img src="image-20230328100013625.png" alt="image-20230328100013625" style="width:45%;" />

### 練習11

<img src="image-20220309105129862.png" alt="image-20220309105129862" style="width:45%;" />

==不要在2d sketch中用fillet去修圓角，否則所有的黑線會變回藍線==

<img src="image-20230328100239034.png" alt="image-20230328100239034" style="width:45%;" /><img src="image-20230328100311706.png" alt="image-20230328100311706" style="width:45%;" />



###練習12

<img src="image-20220309182914898.png" alt="image-20220309105129862" style="width:45%;" />

==不要在立體中用trim，否則黑色的關係線會掉失==

<img src="image-20230328101258927.png" alt="image-20230328101258927" style="width:45%;" /><img src="image-20230328101421826.png" alt="image-20230328101421826" style="width:45%;" />

###練習13

<img src="image-20220310122246576.png" alt="image-20220310122246576" style="width:45%;" />

你可以在2d sketch中用`3 point arc`來繪制4個弧去擠出，或者像我一樣，首先不理會4個弧，擠出後再用`fillet`去補。

<img src="image-20230328113209685.png" alt="image-20230328113209685" style="width:45%;" /><img src="image-20230328113920796.png" alt="image-20230328113920796" style="width:45%;" />

###練習14

Harder problem. 這兩題在立體再fillet會容易後多。

<img src="image-20220308203714210.png" alt="image-20220308203714210" style="width:45%;" />

<img src="image-20230328114616781.png" alt="image-20230328114616781" style="width:45%;" /><img src="image-20230328114659569.png" alt="image-20230328114659569" style="width:45%;" />

<img src="image-20230328114924108.png" alt="image-20230328114924108" style="width:45%;" /><img src="image-20230328115022317.png" alt="image-20230328115022317" style="width:45%;" />

###練習15

<img src="image-20220310124055307.png" alt="image-20220310124055307" style="width:45%;" />

<img src="image-20230328115245008.png" alt="image-20230328115245008" style="width:45%;" /><img src="image-20230328115329604.png" alt="image-20230328115329604" style="width:45%;" />

<img src="image-20230328115444080.png" alt="image-20230328115444080" style="width:45%;" /><img src="image-20230328115525667.png" alt="image-20230328115525667" style="width:45%;" />

<img src="image-20230328115623826.png" alt="image-20230328115623826" style="width:70%;" />


#1.3 2D constraints

Fusion360跟autocad/rhino等最大的分別，是它的特徵編輯性，情況更加像**數學幾何**。相反，autocad和rhino是用座標系統去做編輯的。

舉一個例子，如果用autocad/rhino等，劃一條相切兩個圓的線，線的儲存方法是紀錄線段的頭尾兩點的座標，但如果兩個圓的尺寸和位置有所改變，**切線是不會跟著變的**。但特徵編輯軟件的特色，是更接近**數學幾何的邏輯**，切線是紀錄線的幾何特性是相切，所以即使圓的尺寸和座標變動，線段也會相切兩個圓。

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
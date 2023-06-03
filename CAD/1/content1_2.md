#1.2 2D Sketch

[TOC]

## New Sketch

- [ ] 在工具列上方點選`new sketch`按鍵，或使用快速鍵`s`搜尋`new sketch`

- [ ] 選擇要建立2d sketch的面，今次練習不同的2d約束，選哪一個面都沒有關係
	- 之後就但見到介面有少許不同，變成2d專用的介面

- 我們在工具列由左至右逐個講解

<img src="fusion17.png" alt="fusion17" style="zoom:50%;" />

<img src="fusion18.png" alt="fusion18" style="zoom:50%;" />

## Create工具

- 第一個是create工具列，提供最常用的2D繪圖工具，類似於AutoCAD或Rhino
- 包括線(line)、矩形(rectangle)、圓形(circle)、弧形(arc)、多邊形(polygon)、橢圓形(ellipse)、點(point)、文字(text)
- 其他特別的工具有slot(槽形工具)、Spline(控制點曲線)、Conic Curve(圓錐曲線)
- 快速創建的工具有: Mirror(鏡像)、Circular Pattern(圓形陣列)和Rectangular Pattern(矩形陣列)
	💡 ***使用這三個工具請慎用，fusion360不擅長2d sketch，如果太大量的話會直接死機，盡量變成3d圖之後再使用3d的mirror和pattern***

<img src="13095459.png" alt="13095459"  />

- Project(投影)/ include: 將並非在這個sketch中的圖元投影在這個sketch中，而intercept就是將2d sketch的平面相交對應立體所得到的切面

<img src="fusion116.gif" alt="fusion116" style="width:45%;" /><img src="fusion117.gif" alt="fusion117" style="width:45%;" />

## 編修工具

- ❗***<u>不要</u>使用2d編修工具如fillet, chamfer, trim, scale, move/copy***:

	- fusion360等特徵編輯軟件不擅長2d 編輯，會十分容易死機

	- 所有2d編輯是沒有歷史的，之後要修改會非常麻煩

	- 一經2d編輯的話，本來的2d 約束關係很大可能就會消失

- Offset(偏移): 偏移點選的圖元，十分常用
	💡offset出來的圖元是不能再offset的，要點選元始圖元才能繼續offset

- Change Parameters：設定變數，方便修改相關數值
	- 可一次修改所有相對應的值
	- 例如：設定螺絲孔徑為3mm，改用2mm螺絲時，只需在此修改一次，所有孔徑即時更新

![100935](100935.png)

## 草圖顏色

在繪畫2d草圖時，會發現有不同的顏色，代表不同的特性:

1. 藍色: 代表線段、圖形沒有完全受約束，可以任意拖動
2. 黑色: 代表線段、圖形完全約束。
	💡**請經常確保2d草圖的線都是黑色的，那麼改變參數時少不會容易出錯**
3. 橙色虛線: 未完全約束的作圖線
	💡作圖線可以用hotkey`x`來快速轉換
4. 黑色虛線: 完全約束的作圖線
5. 紫色實線/虛線: 投影圖元
6. 綠色實線/虛線: 鎖定的圖元，應盡量避免使用

<img src="fusion115.gif" alt="fusion115" style="zoom:50%;" />

## 特別提示

- 💡 ***使用mirror和pattern時注意，fusion360不擅長2d sketch，如果太大量的話會直接死機，盡量變成3d圖之後再使用3d的mirror和pattern***

- 💡 ***Fusion360所有的sketch都是有特徵的，所以你會發現甚少會使用copy & paste功能，如果真的有需要copy & paste，可開另一個sketch，再project之前的sketch去新的sketch***

- ❗ ***<u>不要</u>使用2d編修工具如fillet, chamfer, trim, scale, move/copy***
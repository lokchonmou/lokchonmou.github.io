

# 1.5 Advance 3D drawing

如果你打開Fusion360上方的工具列，你會發現有很多各式各樣的工具，這些工具在繪圖時會非常有幫忙，本章會介紹幾個常用的工具。

[TOC]

## 1. Plane & axis

輔助平工具是常用的工具之一，其中幾個常用的包括:

![fusion51](fusion51.png)

1. Offset Plane: 指定一個平行於點選面的偏移平面
2. Midplane: 指定兩個平面的中間面，對於用mirror feature十分有用
3. Plane through Two Edges/ Plane through Three Points: 常用於指定一個平面，將立體切開

其他功能用到的時候再講解。

###練習題1

<img src="image-20220530162442507.png" alt="image-20220530162442507" style="zoom:75%;" />





1. 首先在正視圖建立底座

<img src="image-20220530161248922.png" alt="image-20220530161248922" style="zoom:50%;" />

2. 對稱擠出65mm

<img src="image-20220530161317601.png" alt="image-20220530161317601" style="zoom:50%;" />

3. 用`Plane at angle`建立一個30度的面



<img src="fdahgjk.gif" alt="fdahgjk" style="zoom:50%;" />

4. 在這個面建立sketch, 繪畫後就可以用extrude擠出



<img src="image-20220530161842815.png" alt="image-20220530161842815" style="zoom:50%;" />



<img src="fdahgjk1.gif" alt="fdahgjk1" style="zoom:50%;" />

### 練習題2

每個格的尺寸為10x10mm

<img src="image-20220530164054092.png" alt="image-20220530164054092" style="zoom:67%;" />

1. 首先在正面建立方形和指定斜面的尺寸

<img src="image-20220530163256134.png" alt="image-20220530163256134" style="zoom:50%;" />

2. 整個方形連同斜面擠出40

<img src="image-20220530163311299.png" alt="image-20220530163311299" style="zoom:50%;" />

3. 在側面建立sketch, 指定另外斜面的尺寸

<img src="image-20220530163332181.png" alt="image-20220530163332181" style="zoom:50%;" />

4. 將兩個sketch都顯示出來(如果它自動隱藏了的話), 用`plane thought 3 points`

<img src="fdahgjk2.gif" alt="fdahgjk2" style="zoom:50%;" />

5. 用`split body`指令將方形切開, 之後就可以將平面和不要的角隱藏

<img src="fdahgjk3.gif" alt="fdahgjk3" style="zoom:50%;" />



## 2. Mirror & Pattern

對於重覆性高，但完全相同的動作, 可以用mirror和pattern來快速完成。

### 練習題1

![image-20220601102151547](image-20220601102151547.png)

1. 在xy平面建立一個`new sketch`, 用`center rectangle`劃一個`130x80mm`的方形, 之後用   `extrude`擠出`50mm`高

<img src="image-20220601103016049.png" alt="image-20220601103016049" style="width:45%;" /><img src="image-20220601103051915.png" alt="image-20220601103051915" style="width:45%;" />

2. 在方形的頂部建立一個`new sketch`, 用hotkey `R`劃一個`30x25mm`方形, 之後用   `extrude`減去`30mm`深

<img src="image-20220601103301111.png" alt="image-20220601103301111" style="width:45%;" /><img src="image-20220601103343233.png" alt="image-20220601103343233" style="width:45%;" />

3. 之後可以用`mirror`指令, 選擇`type`為`feature`, `objects`為剛剛的減去feature, `mirror plane`則選擇yz平面(如果因物件擋住了yz平面的話, 可以zoom遠一點或旋轉一下)
4. 重覆`mirror`指今, 今次點選的`objects`為減去feature和剛剛的`mirror`指令, `mirror plane`則為xz平面

<img src="fdahgjk4.gif" alt="fdahgjk4" style="width:45%;" /><img src="fdahgjk5.gif" alt="fdahgjk5" style="width:45%;" />

5. 用`hole`指令(hotkey `H`)開啟鑽孔工具, 點選右下角, 由於沒有事先開sketch來定點, 可以用`reference`來指定距離邊緣多少, 看看圖則, 分別為`15mm`和`12mm`, 
5. hole的深度(`Extents`)選`All`, `Hole Type` 選擇中間的平底孔`Counterbore`, `Hole Tap Type`即孔是否要攻螺絲牙, 今次不用, 所以選第一個`Simple`, Drill Point就是鑽孔的尾端是平還是尖, 今次選哪一個都可以, 因為孔是完全穿的
5. 看圖則, 孔的要求是`4 HOLES Ø8 THRU ALL ⌴Ø18 ↧3`, `Ø8 THRU ALL`即直徑8, 完全鑽穿, `⌴Ø18 ↧3` 即平底孔直徑18mm, 深度3mm

<img src="fdahgjk6.gif" alt="fdahgjk6" style="width:60%;" /><img src="image-20220601171701680.png" alt="image-20220601171701680" style="width:35%;" />



8. 4個孔可以跟上面一樣mirror兩次來完成, 或用另一個指令`rectangular pattern`, 方形矩陣功能可以一次過複製多個功能, 而且用矩陣呈現
8. `type`選`feature`, `objects`選擇剛剛的hole feature, `Directions `可以選初始向哪一邊, 我是選x軸, `Distance type`選`Spacing`, 兩個距離分別是100和56mm

<img src="image-20220601173249910.png" alt="image-20220601173249910" style="width: 60%;" /><img src="image-20220601173315711.png" alt="image-20220601173315711" style="width:35%;" />

10. 中間的圓孔可以用new sketch劃兩個半圓用擠出減去, 或簡單地用hole指令完成

   <img src="image-20220601175838025.png" alt="image-20220601175838025" style="zoom:50%;" />

11.  最後兩個螺絲孔, 都是用`holes`指令, 距離邊緣15mm, 在中線上, 即距離邊緣40mm, `hole type`選第一個`simple`, `hole tap type`選第三個`tapped`, 即個孔都是攻牙, 所以`Thread Offset`選第一個, `Drill Point`選尖尾的, 圖則上是M12x1.5即M12螺絲, 絲距為1.5mm, 最後選`Modeled`就可以見到模型有螺絲紋

<img src="image-20220601180411189.png" alt="image-20220601180411189" style="zoom:50%;" />

12.  接著緣著yz平面, mirror這個螺絲孔, `Compute Option`要用`Optimized`才會將螺絲孔一次過mirror

<img src="image-20220601182653305.png" alt="image-20220601182653305" style="zoom:80%;" />

13. 在前面建立`new sketch`, 用`extrude`減去

    <img src="image-20220601181302659.png" alt="image-20220601181302659" style="width: 60%;" /><img src="image-20220601181342549.png" alt="image-20220601181342549" style="width: 35%;" />

14. 最後選取需要做fillet的邊, 修圓角2mm

<img src="image-20220601181813753.png" alt="image-20220601181813753" style="width:45%;" /><img src="image-20220601181850640.png" alt="image-20220601181850640" style="width:45%;" />


## 3. Shell

Shell為十分好用的薄殼功能，點選作為開口的面，指定厚度，就能做到一個碗一樣的容器，省卻offset再將立體相減的步驟。

<img src="fusion55.gif" alt="fusion55" style="zoom:33%;" />

試試完成下面的題目:

###練習題1



![image-20220602115633509](image-20220602115633509.png)

Hints: 

<img src="image-20220602120548881.png" alt="image-20220602120548881" style="width:45%;" /><img src="image-20220602120046616.png" alt="image-20220602120046616" style="width: 45%;" />

<img src="image-20220602120115590.png" alt="image-20220602120115590" style="width:45%;" /><img src="image-20220602120128374.png" alt="image-20220602120128374" style="width:45%;" />

<img src="fdahgjk7.gif" alt="fdahgjk7" style="width:45%;" />

<img src="image-20220602120244112.png" alt="image-20220602120244112" style="width:45%;" /><img src="image-20220602120309330.png" alt="image-20220602120309330" style="width:45%;" />



## 4. Loft

Loft 是其中一個常用的成型工具。對於常見的喉管連接工件，因喉管有不同尺寸，有圓有方，如果製作一個連接器，就需要劃一個上下圓上方的立體，如果用一般手則去劃會非常麻煩，但常見的CAD圖軟件都有一個叫loft的功能，將不同造型的面連接。

如下圖例子，loft可以直接將兩個面相接，也可以指定一條需要穿過的中心線。

<img src="fusion58.gif" alt="fusion58" style="zoom:33%;" />

試試下面這兩題:

### 練習題1

<img src="image-20220602121449150.png" alt="image-20220602121449150" style="width:50%;" /><img src="image-20220602121522403.png" alt="image-20220602121522403" style="width:45%;" />



1. 在xy平面建立一個半徑`170mm`的圓, 擠出`40mm`

<img src="image-20220602123652258.png" alt="image-20220602123652258" style="width:45%;" /><img src="image-20220602123704727.png" alt="image-20220602123704727" style="width:45%;" />



2. 用`offset plane`, 點選剛剛的圓形頂部, offset `315mm`
3. 在剛剛的offset plane建立`new sketch`, 劃一個直徑`170mm`的圓, 並距離原點`225mm`

<img src="image-20220602123842630.png" alt="image-20220602123842630" style="width:45%;" /><img src="image-20220602123944252.png" alt="image-20220602123944252" style="width:45%;" />



4. 用`loft`功能, 點選剛劃的圓和圓柱的頂部, `guide type`選擇不需要`Rails`

<img src="image-20220602123453774.png" alt="image-20220602123453774" style="zoom:45%;" />



5. 將170mm直徑的圓擠出40mm, 之後就可以用`mirror`功能, 選擇剛剛的兩個`features`做鏡像

<img src="image-20220602134316999.png" alt="image-20220602134316999" style="width:45%;" /><img src="image-20220602134343597.png" alt="image-20220602134343597" style="width:45%;" />



6. 最後用`shell`功能造成簿殼, 要穿孔的面分別為頂的兩個圓和底部的圓, 選擇`inside ` `2mm`

   <img src="image-20220602134531662.png" alt="image-20220602134531662" style="width:45%;" /><img src="fdahgjk9.gif" alt="fdahgjk9" style="width:45%;" />

<img src="fdahgjk8.gif" alt="fdahgjk8" style="zoom:50%;" />

### 練習題2

<img src="image-20220606103313365.png" alt="image-20220606103313365" style="zoom:80%;" />

## 5. Revolve

旋轉成型工具就有點似現實世界中的車床般，透過緣著一個軸旋轉一個profile成型。

<img src="fusion511.gif" alt="fusion511" style="zoom:33%;" />

試試以下這兩題:

###練習題1

3D 打印軸承。

軸承為眾多機械零件中十分重要的一環, 但由於軸承的尺寸是固定的, 在設計製作時必須首先考量軸承的尺寸才能決定創作物的尺寸, 而且軸承尺寸越大, 價錢就會幾何級數上升。對於一些精度和轉速都不高的應用場合, 可考慮使用現成的Ø4.5 的不繡鋼珠自製3D 打印軸承。

<img src="image-20220606110454114.png" alt="image-20220606110454114" style="zoom:80%;" />


1. 首先在正面(我的是xz平面)建立一個`new sketch`, 跟據圖則建立一個`6x6 center rectangle`, 邊緣距離原點20mm(因軸承內徑為40mm, 半徑則為20mm), 一個`Ø4.8 cirlce`, 之後就可以補上中心線, 建立兩條對稱線留空0.5mm空隙
1. 用`revolve`指令緣z軸轉360度建立實體(如果見到一個藍色和一個橙色的revolve指令, ==***<u>選擇藍色的, 藍色才是實體</u>***==, 橙色的revolve只會建立一個曲面)

<img src="image-20220606111438238.png" alt="image-20220606111438238" style="width:45%;" /><img src="image-20220606111511423.png" alt="image-20220606111511423" style="width:45%;" />



3. 在xy平面建立`new sketch`, 用hotkey `p`投影兩條邊變成兩個點, 之後補一條中線, 就可以劃一個Ø4.8的圓
4. 用擠出工具減去上面的孔

<img src="image-20220606112340758.png" alt="image-20220606112340758" style="width:45%;" /><img src="image-20220606112408298.png" alt="image-20220606112408298" style="width:45%;" />



5. 用`chamfer`工具, 選擇圓的4邊修倒角0.5mm

<img src="image-20220606112730659.png" alt="image-20220606112730659" style="width:45%;" /><img src="image-20220606112742341.png" alt="image-20220606112742341" style="width:45%;" />



6. 用`sphere`指令, 在原點建立一個Ø4.5的球體
7. 用`move`指令, 將球體向x軸移動`23mm`

<img src="image-20220606112915853.png" alt="image-20220606112915853" style="width:45%;" /><img src="image-20220606112954437.png" alt="image-20220606112954437" style="width:45%;" />



8. 最後就可以利用`circular pattern`工具, 將球體旋轉複製30份

<img src="image-20220606113233036.png" alt="image-20220606113233036" style="zoom:50%;" />



###練習題2

第二題則為常見於3d打印機的8mm直線軸承, 請自行完成。

<img src="image-20220606113755190.png" alt="image-20220606113755190" style="zoom:60%;" /><img src="image-20220606113808241.png" alt="image-20220606113808241" style="width:40%;" />

## 6. Sweep

掃掠成型(Sweep)工具是指將一個profile緣著一條軌跡掃掠。

<img src="fusion513.gif" alt="fusion513" style="zoom:33%;" />

###練習題1

![111_1](111_1.png)

1. 首先在正面(xz平面)建立一個`new sketch`, 跟據圖則先劃管的中心線

<img src="image-20220606115238379.png" alt="image-20220606115238379" style="zoom: 50%;" />



2. 在yz平面上建立`new sketch`, 跟據圖則, 劃管的外直徑, 即Ø25的圓

<img src="image-20220606115320815.png" alt="image-20220606115320815" style="width:45%;" /><img src="image-20220606115635556.png" alt="image-20220606115635556" style="width:45%;" />



3. 用`sweep`指令, 用圓形作為`Profile`, 用管的中心線為`Path`, 建立管的實體

<img src="image-20220606115456955.png" alt="image-20220606115456955" style="zoom:50%;" />



4. 用`shell`指令, 點選管的兩頭, 建立2.5mm厚度的管殼

<img src="image-20220606115738958.png" alt="image-20220606115738958" style="zoom:50%;" />



5. 在管的末端, 建立new sketch, 跟據圖則所示劃出接法蘭的尺寸Ø45的圓, 用hotkey `E`擠出7.5mm

<img src="image-20220606115901801.png" alt="image-20220606115901801" style="width:45%;" /><img src="image-20220606120041439.png" style="width:45%;" />



6. 接著, 在法蘭的表面開一個`new sketch`, 跟據圖則劃出六個接口的螺絲孔
7. 用hotkey `E`減去, `Extrude type`選用`to object`, 點選法蘭後面的面

<img src="image-20220606120228464.png" alt="image-20220606120228464" style="width:45%;" /><img src="image-20220606120257088.png" alt="image-20220606120257088" style="width:45%;" />



8. 最後, 重覆剛才的步驟, 在管的另一面建立相同的法蘭即可

<img src="image-20220606120421460.png" alt="image-20220606120421460" style="zoom:50%;" />

### 練習題2

這題你需要用到`plane along path`

<img src="Inkedfusion51_LI.jpg" alt="Inkedfusion51_LI" style="zoom:55%;" />

![222_1](222_1.png)



## 7. 混合練習

以下題混合幾個常用的造型工具。

### 練習題1

 [screwdriver Drawing v8.pdf](screwdriver Drawing v8.pdf) 

<img src="fusion517.png" alt="fusion517" style="zoom:100%;" />

<iframe width="560" height="315" src="https://www.youtube.com/embed/X-XfcftiMkY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


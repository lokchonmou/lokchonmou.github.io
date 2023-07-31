# Sumo Robot

本節是介紹如何去組裝一隻相撲機械人。做好後效果如下:

<img src="image-20230612111644775.png" alt="image-20230612111644775" style="zoom:80%;" />

[TOC]

## Step 1: 準備工作/檔案

- 下載本次所用到的零件zip檔
- ***解壓縮***
- 於Fusion左邊欄點擊`upload`鍵
- 將解壓後的檔案拖動到`Drag and Drop Here`，或按`Select Files`找到路徑上傳

<div style="font-size: 16px; text-align: CENTER; background: #FFFF00"><a href="SumoComponent.zip">SumoComponent.zip</a></div>

<img src="image-20230417102737030.png" alt="image-20230417102737030" style="zoom:80%;" />

<img src="image-20230417103121527.png" alt="image-20230417103121527" style="width:45%;" /><img src="image-20230417103138530.png" alt="image-20230417103138530" style="width:45%;" />

## Step 2: 建立小車底盤

###繪製底盤

<img src="Screenshot 2022-03-14 142246.png" alt="Screenshot 2022-03-14 142246" style="width:45%;" /> <img src="Screenshot 2022-03-14 142311.png" alt="Screenshot 2022-03-14 142311" style="width:45%;" />

- 開始一個新的設計
- 開一個new component
- 名字叫`bottom`



<img src="Screenshot 2022-03-14 142341-16472534115661.png" alt="Screenshot 2022-03-14 142341" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 142411-16472534165382.png" alt="Screenshot 2022-03-14 142411" style="width:45%;" />

- 確保小黑點在bottom這個component旁邊
- 開一個`new sketch`
- 下圖是我們底板的圖則
	- 我會一步一步教你繪畫，熟練後就要靠自己了

<img src="image-20230606110748944.png" alt="image-20230606110748944" style="zoom:67%;" />



- 先用快捷鍵`r`，隨意繪劃一個長方形
- 用快捷鍵`l`，繪劃一條垂直中線
- 在工具列上方找到`Coincident`![coincident icon](constraint-coincident.png)重合限制
	- 將中線釘在原點上

<img src="image-20230606101746797.png" alt="image-20230606101746797" style="width:45%;" /><img src="image-20230606101837636.png" alt="image-20230606101837636" style="width:45%;" />



- 使用快捷鍵`s`搜尋`change parameters`

- 在右上方找到`User Parameter`鍵

- 在`Add User Parameter`介面中，填寫以下資訊：

	- `Name`: 變數名字，只能為英文字母，不能有空格
	- `Unit`: 單位，例如`mm`、`cm`等，若無單位可忽略此欄位
	- `Expression`: 設定的值，例如`10`、`15`等，也可以使用公式，例如`10*2.54`表示10英吋轉換成公分
	- `Comment`: 注解，可以忽略

- 根據圖4的內容，開設`thickness`、`carLength`、`carWidth`、`gearBoxLength`、`gearBoxWidth`、`ballCastorLength`6個參數

<img src="Screenshot 2022-03-14 143148.png" alt="Screenshot 2022-03-14 143148" style="WIDTH:45%;" /><img src="image-20230606102804131.png" alt="image-20230606102804131" style="width:45%;" />

<img src="Screenshot 2022-03-14 143228.png" alt="Screenshot 2022-03-14 143228" style="WIDTH:35%;" /><img src="image-20230606103019568.png" alt="image-20230606103019568" style="width:55%;" />



- 圖一：
	- 將長方形的長和寬分別設為`carLength`和`carWidth`
	- 長方形的底到原點距離返為`gearBoxLength`
	- 確保所有草稿線都是黑色，表示完全定義
- 圖二：
	- 由原點劃一條水平作圖線到長方形邊(用快捷鍵`x`可以將實線變成作圖線)
	- 在作圖線隨意位置劃一個`center rectangle`和兩個圓
- 圖三：
	- 在剛才的`center rectangle`，劃一條垂直中線
	- 用上方工具列的限制工具，選用`equal` ![equal icon](constraint-equal.png)將兩個圓設成相等，用`Symmetry`![symmetry icon](constraint-symmetry.png)設定與中線對稱
	- 標記相圖3的尺寸，最左手邊標記成`gearBoxWidth`，方便之後調試參數
- 圖四:
	- 用快捷鍵`s`搜尋`mirror`，對圖3所劃內容鏡像到右手邊

<img src="image-20230606103859258.png" alt="image-20230606103859258" style="width:45%;" /><img src="image-20230606102015921.png" alt="image-20230606102015921" style="width:45%;" />

<img src="image-20230606104218744.png" alt="image-20230606104218744" style="width:45%;" /><img src="image-20230606102217970.png" alt="image-20230606102217970" style="width:45%;" />



- 在圖的上方，緣中線繪劃以下圖形
- 記得善用限制工具`equal` ![equal icon](constraint-equal.png)和`Symmetry`![symmetry icon](constraint-symmetry.png)

<img src="image-20230606110706663.png" alt="image-20230606110706663" style="zoom:67%;" />



- 完後後褪出2D草圖
- 用快捷鍵`e`擠出`thickness`的厚度
- 用快捷鍵`f`將四個角修成3mm半徑的圓角，這樣實物切割出來時才不會割手

<img src="image-20230606110845455.png" alt="image-20230606110845455" style="width:45%;" /><img src="image-20230606110929998.png" alt="image-20230606110929998" style="width:45%;" />



最後，在零件樹按滑鼠右鍵，選擇`Ground`，設定底板為Ground後，拖動底板就不會動，所有的joint都以底板為基礎

<img src="Screenshot 2022-03-14 143856.png" alt="Screenshot 2022-03-14 143856" style="zoom:60%;" />

### 插入底盤零件

- **<u>將小黑點退回最上層</u>**
- 在左手邊找到預備步驟時所上傳的零件
- 將零件之一的「牛眼輪」拖入當前的圖則畫面中
- 用快捷鍵`j`，組合「牛眼輪」和底盤


<div style="text-align: CENTER"><img src="Screenshot 2022-03-14 143522-16472540795493.png" alt="Screenshot 2022-03-14 143522" style="width:33%;" /><img src="image-20230606105710270.png" alt="image-20230606105710270" style="width:33%;" />
</div>
<img src="image-20230606105803816.png" alt="image-20230606105803816" style="width: 45%;" /><img src="image-20230606111054277.png" alt="image-20230606111054277" style="width:45%;" />



- 拖曳零件中的`70093L`至當前畫面
- 點選左邊的零件樹中的`70093L`並按下滑鼠右鍵
- 選擇`剛體群組(Rigid Group)`，這樣在拖曳齒輪箱時就不會整個散開
- 最後用快捷鍵`j`將齒輪箱和底板連接

<img src="image-20230606111259719.png" alt="image-20230606111259719" style="width:45%;" /><img src="image-20230606111328707.png" alt="image-20230606111328707" style="width:50%;" />

<img src="image-20230606111406545.png" alt="image-20230606111406545" style="width:45%;" />



- 同樣地，將`70093R`和`tamiya 56mm sport tire`拖動到當前畫面中
- 用零件樹對著剛拖放入來的組件按滑鼠右鍵
- 用`Rigid Group`將零件剛性組合
- 最後用快捷鍵`j`將它們組合到底板上
	- `tamiya 56mm sport tire`組合時，要對著齒輪箱六角軸的中心，再偏移`15mm`
	- 在進行`joint`時，去到`motion`頁面，選擇類型為` revolving joint`

<img src="image-20230606111457653.png" alt="image-20230606111457653" style="width:50%;" />

<img src="Screenshot 2022-03-14 144205.png" alt="Screenshot 2022-03-14 144205" style="width:45%;" /><img src="image-20230606111542122.png" alt="image-20230606111542122" style="width:45%;" />


## Step 3: 繪製和組裝小車第二層板

### 繪畫小車頂板

- **<u>將小黑點退回最外層</u>**
- 開一個新組件，用快捷鍵`s`搜尋`new component`或按下上方工具列的圖示
- 命名為`top`

<img src="image-20230606111715644.png" alt="image-20230606111715644" style="width:50%;" />



- **<u>將小黑點放到新的 `top` 元件旁邊</u>**
- 點擊 `offset plane` 按鈕
	- 或用快捷鍵`s`搜尋`offset plane`
- 在小車的底板表面上，定一個偏移 `40mm` 的平面
	- 工場只提供 `20mm` 和 `8mm` 兩種六角柱子，如果需要其他高度，可以組合使用或使用 3D 列印墊高

<img src="image-20230606111904068.png" alt="image-20230606111904068" style="width:45%;" /><img src="image-20230606112000008.png" alt="image-20230606112000008" style="width:45%;" />



- 在新的 `offset plane` 上點擊 `new sketch`。
- 使用快捷鍵 `p` 或者搜尋 `project`，將底板投影到這個面上

<img src="image-20230606112102805.png" alt="image-20230606112102805" style="width:45%;" /><img src="image-20230606112303689.png" alt="image-20230606112303689" style="width:45%;" />



- 圖一：
	- 在左側零件樹中，點擊眼睛圖示，隱藏除了 `top` 以外的其他零件
	- 畫一條水平線，然後使用快捷鍵 `d`，將水平線與底線的距離設置為 `60mm`
- 圖二：
	- 選擇安裝齒輪箱的 4 個圖形和 2 個方形
	- 使用快捷鍵 `x` 將它們變成作圖線
	- 畫一個任意形狀的長方形
- 圖三：
	- 將剛才畫的長方形使用快捷鍵 `x` 變成作圖線
	- 用快捷鍵 `d` 標示尺寸，每個邊距離外框 `5mm`
	- 在四個角上畫上 `3mm` 的圓
		- 使用限制工具 `equal`![equal icon](constraint-equal.png)（等長)的工具，只需要標示一個圓，其他使用 `equal` ![equal icon](constraint-equal.png)工具指定相等就可以
- 圖四：
	- 使用快捷鍵 `e` 將其擠出到設置的 `thickness` 厚度
- 圖五：
	- 使用快捷鍵 `f` 將頂板剩餘的兩個尖角修成 `3mm` 半徑的圓

<img src="image-20230606112450050.png" alt="image-20230606112450050" style="width:45%;" /><img src="image-20230606112545691.png" alt="image-20230606112545691" style="width:45%;" />

<img src="image-20230606112723830.png" alt="image-20230606112723830" style="width:45%;" /><img src="image-20230606112812734.png" alt="image-20230606112812734" style="width:45%;" />

<img src="image-20230606113047174.png" alt="image-20230606113047174" style="width:45%;" />

### 插入Arduino UNO

- 確認小黑點仍在 `top` 的元件旁邊。
- 在 `top` 上面的平面上，開啟一個新的草圖
- 用快捷鍵`s`搜尋`change parameter`，設定兩個新的參數，分別為`unoX`和`unoY`，用來設定Arduino UNO板的相對位置

<img src="Screenshot 2022-03-14 145403.png" alt="Screenshot 2022-03-14 145403" style="zoom:45%;" /><img src="image-20230606114115703.png" alt="image-20230606114115703" style="width:45%;" />



- 圖一為Arduino UNO板孔距的尺寸
	- 由於頂板上的零件距離 Arduino UNO 的第四個孔太近，因此不需要開孔
	- UNO的設計單位是英吋，所以轉成毫米並非整數
- 圖二：根據圖一中 Arduino UNO 板的尺寸，在頂板上畫上三個直徑為 `3mm` 的圓
	- 使用限制工具 `equal`![equal icon](constraint-equal.png)（等長)的工具，只需要標示一個圓，其他使用 `equal` ![equal icon](constraint-equal.png)工具指定相等就可以
	- 輸入`unoX`和`unoY`參數，設定Arduino UNO板距離頂板的左側和底側尺寸
- 圖三：使用快捷鍵 `e`，將剛才畫的三個圓從頂板上減去

<img src="Screenshot 2022-03-14 145653.png" alt="Screenshot 2022-03-14 145653" style="width:35%;" /><img src="image-20230606114208144.png" alt="image-20230606114208144" style="width:45%;" />

<img src="Screenshot 2022-03-14 145923.png" alt="Screenshot 2022-03-14 145923" style="width:45%;" />



- 在零件樹中找到 `top` 零件，點擊三角形圖示打開零件樹，將隱藏了的 `sketch4` 顯示
- 選擇草圖上的四個直徑為 `3mm` 的圓，使用快捷鍵 `e`，將它們貫穿到底板上，為底板開四個孔

<img src="image-20230606114442833.png" alt="image-20230606114442833" style="zoom: 50%;" />



- 將 `Arduino UNO` 板從庫存中拖入當前畫面
- 在零件樹中找到 `Arduino UNO` 零件，按下滑鼠右鍵，並選擇 `Rigid Group`
- 使用快捷鍵 `j` 將 `Arduino UNO` 板固定在頂板上，並將其偏移 `20mm`

<img src="Screenshot 2022-03-14 150119.png" alt="Screenshot 2022-03-14 150119" style="width:55%;" /><img src="Screenshot 2022-03-14 150148.png" alt="Screenshot 2022-03-14 150148" style="width:35%;" />

<img src="image-20230607132946406.png" alt="image-20230607132946406" style="width:45%;" />

### 按入六角柱

- 圖一：
	- **<u>將小黑點移動到最上層</u>**
	- 使用快捷鍵 `s` 搜索 `new component`，開啟一個名為 `double hex` 的新元件
- 圖二：
	- **<u>確保小黑點在剛才新開的 `double hex` 元件旁</u>**
	- 庫存中拖入 `hex spacer M3x20`，並使用 `ctrl+c`/`ctrl+v` 複製一份
- 圖三：
	- 使用快捷鍵 `j` 將兩個六角柱組合在一起

<img src="Screenshot 2022-03-14 150401.png" alt="Screenshot 2022-03-14 150401" style="WIDTH:55%;" /><img src="Screenshot 2022-03-14 150504.png" alt="Screenshot 2022-03-14 150504" style="WIDTH:35%;" />

<img src="Screenshot 2022-03-14 150528.png" alt="Screenshot 2022-03-14 150528" style="width:55%;" />



- `joint `設定完成後，將**<u>小黑點移回最上層</u>**
- 複製 `double hex` 元件三份
- 使用快捷鍵 `J`，將這四個元件組合到小車底盤上

<img src="Screenshot 2022-03-14 150654.png" alt="Screenshot 2022-03-14 150654" style="WIDTH:35%;" /><img src="image-20230417111522425.png" alt="image-20230417111522425" style="width:55%;" />



- 圖一：

	- **<u>確保小黑點在最上層</u>**
	- 打開其中一個 `double hex` 元件，選擇其中一個 `hex spacer M3X20`

- 圖二：使用`ctrl+c`/`ctrl+v`複製三份

- 圖三：使用快捷鍵 `j`，將這三個六角柱組裝到 Arduino UNO 板上

	<img src="image-20230607133230591.png" alt="image-20230607133230591" style="width:30%;" /><img src="image-20230607133156532.png" alt="image-20230607133156532" style="width:30%;" /><img src="image-20230607133644765.png" alt="image-20230607133644765" style="width: 38%;" />

**組裝完成後，請確認所有零件已經固定，不會移動，可輕輕拖動零件確認**

## Step 4: 安裝sensor、電池

### 為底盤開孔

- 接下來，我們會為小車安裝電池組和邊緣傳感器
- 使用快捷鍵`s`搜尋`change parameter`，新增三個參數`sensorX`、`sensorY`和`batteryY`，分別用來指定邊緣傳感器和電池組的位置

<div style="text-align: CENTER"><img src="image-20230607134343084.png" alt="image-20230607134343084" style="width:33%;" /><img src="Screenshot 2022-03-14 151404.png" alt="Screenshot 2022-03-14 151404" style="width:30%;" /></div>

<img src="image-20230607134746583.png" alt="image-20230607134746583" style="width:50%;" />



- 圖一：

	- **<u>將小黑點放到``bottom` 旁邊</u>**

	- 在小車底盤表面開啟一個新的草圖
	- 對`bottom`外的組件隱藏

- 圖二：
	- 繪製對地面的邊緣感測器安裝孔
	- 需要額外加一個槽來穿電線，因此劃一個`8x8mm`的方形
	- 安裝孔距離底板頂部和底板邊緣分別為參數`sensorX`和`sensorY`
- 圖三：
	- 在底板繪製一條中線
	- 將剛才第二步所繪製的圖形鏡像到另一邊

<img src="image-20230417112156133.png" alt="image-20230417112156133" style="width:45%;" /><img src="image-20230607134932021.png" alt="image-20230607134932021" style="width:28%;" />



<img src="image-20230607135138592.png" alt="image-20230607135138592" style="width:45%;" />



- 在中線上，使用快捷鍵`s`搜尋指令`center rectangle`劃一個長方形
- 在隨意位置劃一條水平線，使用幾何限制`Midpoint`![midpoint icon](constraint-midpoint.png)指定水平線到長方形的中心點
- 在水平線兩端劃兩個直徑為`3mm`的圓
	- 使用幾何限制 `equal`![equal icon](constraint-equal.png)（等長)工具，只需要標示一個圓即可
- 將長方形的底部和底板的底邊距離標注為參數`batteryY`
- 最後將剛才所劃的圖形，使用快捷鍵`e`從底板中減去

<img src="image-20230607140634450.png" alt="image-20230607140634450" style="width:45%;" /><img src="image-20230607140731737.png" alt="image-20230607140731737" style="width:45%;" />



### 插入和安裝底盤sensor和電池架

- 圖一：
	- 在零件庫中拖曳兩個邊緣感測器`Line Sensor`和電池組`Battery Shell`
	- 記得拖曳後，在零件樹中，對這三個組件分別按滑鼠右鍵，選擇`Rigid Group`，這樣一旦移動或連接，就不會散開
- 圖二：
	- 使用快捷鍵 `J`，將邊緣感測器組合到底盤上
		- 注意感測器45度倒角的方向應該安裝向著小車的前方
		- 將感測器向下偏移`3mm`。實際安裝時，需要使用3mm的墊圈將感測器抬高，以避免壓彎電線腳。
- 圖三：
	- 安裝好兩個邊緣感測器後，可以安裝電池架
	- 全部組合完成後，可以在左邊的零件樹按下「眼睛」圖示，將全部零件顯示
	- 圖三是安裝好的效果

<img src="image-20230608082854964.png" alt="image-20230608082854964" style="width:45%;" /><img src="image-20230608083303465.png" alt="image-20230608083303465" style="width:45%;" />

<img src="image-20230608083537152.png" alt="image-20230608083537152" style="width:45%;" />



### 為頂板開孔和安裝sensor

- 接下來，安裝尋找敵人的紅外線傳感器
- 用快捷鍵`s`搜尋`change parameter`，新增兩個參數`IRSensorX`和`IRSensorY`，用來指定紅外線傳感器的位置

<div style="text-align: CENTER"><img src="Screenshot 2022-03-14 154808.png" alt="Screenshot 2022-03-14 154808" style="width:30%;" /><img src="image-20230608095813295.png" alt="image-20230608095813295" style="width:50%;" /></div>



- 圖一：
	- **<u>小黑點移動到零件`top` 旁邊</u>**
	- 在頂板的表面，使用 `create new sketch` 創建一個新的草圖
	- 隱藏頂板上的 Arduino UNO 板和三條六角柱，以方便操作

- 圖二：
	- 在頂板上劃一條中線，使用快捷鍵 `x` 將其轉換成作圖線
	- 隨意繪製一個直徑為 `3mm` 的圓
	- 將其與頂板左側和底部的距離分別設置為 `IRSensorX` 和 `IRSensorY`
	- 使用指令 `mirror` 鏡像到另一側
	- 在中線上繪製一個圓，使用幾何限制 `Horizontal/Vertical` ![horizontal/vertical icon](constraint-horiz-vert.png)將其與另外兩個圓對齊，使用 `Equal` ![horizontal/vertical icon](constraint-horiz-vert.png)指令使三個圓的尺寸相同
	- 最後將這三個圓用快捷鍵`e`從頂板中減去


<img src="image-20230608095453257.png" alt="image-20230608095453257" style="width:45%;" /><img src="image-20230608100112602.png" alt="image-20230608100112602" style="width:45%;" />



- 圖一、二：
	- **<u>將小黑點移動到最上層</u>**
	- 隱藏頂板 `top` 以外的零件，以方便操作
	- 從零件庫中拖曳三個 `IR Sensor (FC51)` 到畫面中
- 圖三：
	- 使用快捷鍵 `J`，將三個  `IR Sensor (FC51)`  感測器組合到頂板
	- 左右兩側的感測器應該向左右45度指向
	- *記得將感測器向上偏移`3mm`，實際安裝時，需要使用3mm的墊圈將感測器抬高，以避免壓彎電線腳*

<img src="image-20230608100830730.png" alt="image-20230608100830730" style="width:45%;" /><img src="Screenshot 2022-03-14 160003.png" alt="Screenshot 2022-03-14 160003" style="width:45%;" />

<img src="image-20230608101146942.png" alt="image-20230608101146942" style="width:45%;" />



## Step 5: 製作前擋板和鏟

來到這一步，機械人已基本完成，有基本的功能，接下來最後一步要製作前方的檔板和鏟，第一個步驟是要先製作用以安裝前方檔板的支架。

###製作3D打印支架

- **<u>將小黑點移動到最上層</u>**
- 使用快捷鍵`s`搜尋`new component`，新建一個名為`triangle`的元件
- 將`triangle`和`bottom`以外的零件隱藏
- 確認小黑點在新建的元件旁邊，然後在`YZ`平面上新建一個草圖

<img src="image-20230608101812150.png" alt="image-20230608101812150" style="width:45%;" /><img src="image-20230608101955683.png" alt="image-20230608101955683" style="width:45%;" />



- 使用快捷鍵`p`投影底板的頂端
- 按照圖二的尺寸設計三角形支架
- 用快捷鍵`e`擠出
	- `Direction`選擇`Symmetric`
	- `Measurement`選擇兩邊的總長度
	- 擠出厚度為`10mm`

<img src="image-20230608102058607.png" alt="image-20230608102058607" style="width:45%;" /><img src="image-20230608102350934.png" alt="image-20230608102350934" style="width:45%;" />

<img src="image-20230608102504334.png" alt="image-20230608102504334" style="width:45%;" />



- 確認小黑點在`triangle`旁邊
- 隱藏除了`triangle`以外的其他元件
- 點選30度的斜面，使用快捷鍵`s`搜尋`new sketch`開一個新的草圖
- 劃一條中線，然後繪製兩個直徑為`3mm`的圓，尺寸參考圖二
- 使用快捷鍵`e`，減去深度為`10mm`

<img src="image-20230612095122448.png" alt="image-20230612095122448" style="width:45%;" /><img src="image-20230612095312862.png" alt="image-20230612095312862" style="width:45%;" />

<img src="image-20230612095354125.png" alt="image-20230612095354125" style="width:45%;" />



- 重複上述步驟，在45度的斜面上開啟新的草圖
- 畫出兩條中線，在表面上繪製兩個直徑為`3mm`的圓，尺寸參考圖一
- 使用快捷鍵`e`，向下減去深度為`10mm`

<img src="image-20230612095542989.png" alt="image-20230612095542989" style="width:45%;" /><img src="image-20230612095637236.png" alt="image-20230612095637236" style="width:45%;" />



- 這個三角架要安裝在底板上，因此底部需要開孔
- 在`triangle`底部開啟一個新的草圖
- 畫出一條中線，在底部繪製兩個直徑為`3mm`的圓
- 由圖三可見，由於另外兩個面已經有螺絲孔，因此底部的圓需要向後移動一點，以免與其他穿孔相撞

<img src="image-20230612100237460.png" alt="image-20230612100237460" style="width:45%;" /><img src="image-20230612100316645.png" alt="image-20230612100316645" style="width:45%;" />

<img src="image-20230612100419807.png" alt="image-20230612100419807" style="width:45%;" />



### 安裝三角支架到底板

- 在零件樹中找到`bottom`底板，點擊「眼睛」圖示，重新顯示

- 把小黑點移動到`bottom`旁邊

- 在底板表面上開啟一個新的草圖

	<img src="image-20230612100510083.png" alt="image-20230612100510083" style="width:45%;" /><img src="image-20230612100644024.png" alt="image-20230612100644024" style="width:45%;" />



- 用快捷鍵`s`搜尋`change parameter`
- 新增兩個參數`triangleX`和`triangleY`，用來設定三角支架的位置

<img src="image-20230613134513356.png" alt="image-20230613134513356" style="width:45%;" />



- 在底板的草圖上劃一條中線
- 畫兩條任意的水平線
	- 指定水平線高度為`triangleY`和`10mm`
- 在這兩條水平線上畫兩個圓
	- 指定其中一個直徑為`3mm`
	- 使用幾何限制工具`equal`![equal icon](constraint-equal.png)使兩個圓相等
	- 使用幾何限制工具`Horizontal/Vertical` ![horizontal/vertical icon](constraint-horiz-vert.png)將其與另一個圓垂直對齊
	- 用`mirror`指令將這兩個圓鏡像到另一側
- 最後使用快捷鍵`e`，從底板上減去這四個圓

<img src="image-20230613134643619.png" alt="image-20230613134643619" style="width:45%;" /><img src="image-20230612102956370.png" alt="image-20230612102956370" style="width:45%;" />



- **將小黑點退回最上層**
- 用`ctrl+c`/`ctrl+v`複製`triangle`一份
- 使用快捷鍵`j`，將其分別組合到底板上

<img src="image-20230612101234261.png" alt="image-20230612101234261" style="width:45%;" /><img src="image-20230612103154273.png" alt="image-20230612103154273" style="width:45%;" />



### 繪製鏟和前擋板

- **<u>確保小黑點移回最上層</u>**
- 開啟一個新元件，並命名為`front plane`
- 在三角形支架的30度斜面（左邊或右邊都可以）開啟一個新的草圖

<img src="image-20230612103344352.png" alt="image-20230612103344352" style="width:45%;" /><img src="image-20230612103612573.png" alt="image-20230612103612573" style="width:45%;" />



- 使用快捷鍵`p`，投影兩側的三角支架
- 穿過原點畫出一條中心線，在這個面上繪製一個長方形，使其頂部通過30度斜面的頂部
- 然後使用快捷鍵`e`，擠出厚度為`thickness`

<img src="image-20230612103706799.png" alt="image-20230612103706799" style="width:45%;" /><img src="Screenshot 2023-06-12 103848.png" alt="Screenshot 2023-06-12 103848" style="width:45%;" />

<img src="image-20230612104247196.png" alt="image-20230612104247196" style="width:50%;" />



- 圖一：在45度斜面上開啟一個新的草圖
- 圖二：投影兩側的45度斜面和**前方鏟板的頂部邊緣**到這個草圖中
- 圖三：
	- 繪製一個長方形，一邊為剛才的投影線，寬為`70mm`
	- 再使用`e`快捷鍵擠出厚度為`thickness`
- 圖四：
	- 將視角轉到側視圖，**<u>觀察並確保兩塊板並沒有重疊相撞</u>**
	- 之後可以使用快捷鍵`j`將鏟和擋板組合到三角支架上
		- 因為鏟和擋板都是同一個元件的兩個實體，所以在拖動時這兩塊板會一起拖動，這是正常的
		- 我沒有示範組裝過程的截圖，請您自行完成

<img src="image-20230612104347794.png" alt="image-20230612104347794" style="width:45%;" /><img src="Screenshot 2022-03-14 171823.png" alt="Screenshot 2022-03-14 171823" style="width:45%;" />

<img src="Screenshot 2022-03-14 172106.png" alt="Screenshot 2022-03-14 172106" style="width:45%;" /><img src="Screenshot 2022-03-14 172642.png" alt="Screenshot 2022-03-14 172642" style="width:45%;" />



### 為前擋板開孔，讓偵敵紅外線sensor能穿過

- 圖一：
	- 確認小黑點在`front plane`旁邊
	- 打開零件樹的箭頭，將前檔板隱藏
- 圖二：
	- 選擇指向前方的紅外線傳感器的平面，並在上面開啟一個新的草圖
	- 在紅外線傳感器的LED和接收器的兩個圓的中心之間，繪製一個直徑`15mm`圓形

<img src="image-20230612110101604.png" alt="image-20230612110101604" style="width:45%;" /><img src="image-20230612110314805.png" alt="image-20230612110314805" style="width:45%;" />



- 使用快捷鍵`e`擠出工具，將這個圓形擠出一個新的實體，距離可以隨意設定，只要比底盤長即可
- 擠出時，在工具列的`taper angle`選擇`5 deg`
	- 使得擠出的面積越來越大
	- 錐度角的設定應該要根據你所使用的傳感器的發散角度來決定
	- 我使用的是5度的錐度角，這是基於我過去的經驗設定的

<img src="image-20230612110644767.png" alt="image-20230612110644767" style="width:50%;" />

 

- 圖一：
	- 繼續確保小黑點在`front plane`旁邊
	- 將前擋板顯示出來（`front plane`-->`body5`）
	- 在前擋板表面開啟一個新的草圖
- 圖二、三：
	- 使用快捷鍵`s`搜索`intersect`命令
	- 這個命令用於獲取所選實體與當前平面的相交線

<img src="image-20230612110947501.png" alt="image-20230612110947501" style="width:45%;" /><img src="image-20230612111124576.png" alt="image-20230612111124576" style="width:45%;" />

<img src="image-20230612111159449.png" alt="image-20230612111159449" style="width:45%;" />



###為前擋板開孔

- 根據這個橢圓形的中心點，我們可以知道傳感器射出的紅外線會落在前擋板的哪個位置
- 在相對的位置開槽，才不會阻礙紅外線的發射和接收
- 以橢圖圖心，繪劃一個`35x35mm`的正方形
- 使用快捷鍵`e`擠出工具將其減去，完成開槽

<img src="image-20230612111329919.png" alt="image-20230612111329919" style="width:45%;" /><img src="image-20230612111412222.png" alt="image-20230612111412222" style="width:45%;" />



<div style=" color:red">恭喜，設計應該已經大致完成了。為了確保設計沒有錯誤或會相撞的問題：<ul><li>拖動每個零件，以確定它們正確地組裝在一起</li><li>使用Fusion 360的<code>interference</code>指令，可以自動計算模型是否有干擾（即相撞）的問題</li></ul></div>

<img src="image-20230612111644775.png" alt="image-20230612111644775" style="zoom:50%;" />

## Step 6: 微調功課

- **<u>請確保將小黑點移回最上層</u>**
- 使用快捷鍵`s`搜尋`Section Analysis`指令
- 選擇世界座標系下的YZ平面（或您的機械人的側面平面）
- 使用截面工具將機械人切成兩半，以方便觀察

<img src="image-20230612112227922.png" alt="image-20230612112227922" style="width:45%;" /><img src="image-20230612112346334.png" alt="image-20230612112346334" style="width:45%;" />



這個模型存在以下問題：

1. 30度的擋板需要增長，以便更好地發揮鏟的效果。此外，需要添加一層薄金屬或膠片令其更貼地

2. 對地的邊緣傳感器（`Line Sensor`）需要更靠前，以便更早地檢測到前方是否為場外，並停車

3. 三角支架需要移後，或將小車的長度縮減，如果不移後，30度的鏟加長後，整車就會超過200mm，==會犯規不能作賽==

4. 對敵紅外線傳感器需要往前移
	- 這樣前擋板就不需要開那麼大的槽
	
	- 而且能紅外線傳感器的檢測距離有限，越前越能提早感測到敵人
	
		

- **<u>可以用快捷鍵`s`搜尋`change parameter`，上述所提到需要修改的尺寸，事前都已設定成參數，只要修改參數，相關的零件位置就會改變。</u>**
- **<u>==輸出生產前，使用Fusion 360的<code>interference</code>指令，計算模型是否有干擾（即相撞）的問題==</u>**

<img src="Screenshot 2023-06-12 112851.png" alt="Screenshot 2023-06-12 112851" style="zoom:50%;" />




# 2.2 Advanced box

- 對於一些比較大型的作品，單單用膠片組成一個盒，但十分容易斷開
- 如果轉用厚膠片，作品又會變得重，厚板加工亦較困難
- 這時候，就可以試試用組合鋁架去做骨幹，以確保其硬度

[TOC]

##檔案

- 下載檔案（為`step`檔）
- 解壓下載的檔案
- 在 Fusion 左邊欄尋找 `Upload` 鍵
- 上載檔案到 Fusion 中應用

[useful robotics component step.zip](useful_robotics_component_step.zip)

<img src="advbox14.gif" alt="advbox14" style="zoom:50%;" />

## 1. 繪畫盒子的六面

1. 建立盒的六個面
	- 可以參考[上一章](./content2_1.html#1-建立盒子內部尺寸 ) 的第一節和第二節。
2. 之後就可以用`change parameter`
	- 將盒子內部的長寬高設定成下表中的數值

<img src="image-20220610104616486.png" alt="image-20220610104616486" style="zoom:80%;" />

<img src="image-20220610105201818.png" alt="image-20220610105201818" style="zoom:50%;" />

## 2. 繪製鋁架

### 鋁支架小知識

下圖是一個鋁架的真實圖

<img src="Aluminium_Profile_Cube.jpg" alt="Aluminium Extrusion - Proto-PIC" style="zoom:50%;" />

- 這類鋁架的連接方式一般分為兩種
	- 一種是三角形的連接件
		- 三角形的好處是比較結實，對於大型的結構會比較受力
		- 但缺點是外露出來影響外觀
			<img src="large-16548296110601.png" alt="Aluminium Corner Bracket 2028 | 3D CAD Model Library | GrabCAD" style="zoom:50%;" />
			https://grabcad.com/library/aluminium-corner-bracket-2028-1
	- 另一種是L型的連接件。L型連接件的用法是藏在槽入面, 不會外露出來。
	<img src="https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/e39e8a2dd7aa325a263ab2e938b129bc/large.jpg" alt="L-joint (2020, 3030) | 3D CAD Model Library | GrabCAD" style="zoom:100%;" /><img src="large-16548296342264.jpeg" alt="L-joint (2020, 3030) | 3D CAD Model Library | GrabCAD" style="zoom:50%;" />
	https://grabcad.com/library/l-joint-2020-3030-1



- 一個方形鋁架由12條組成
	- 分成三種尺寸對應盒子的長寬高
	- 因鋁支架有厚度，鋁支架的長度視乎組合的前後次序，不會完全等於盒的長寬高。
- 固定膠板在鋁條表面時
	- 2020鋁條的槽通常使用`M5`螺絲
	- 配合T型絲母固定。

<img src="T-Type-M4-Nut-For-20X20-Aluminium-Profile-10-Pcs.png" alt="Buy T Type M4 Nut For 20X20 Aluminium Profile Online at Best Price" style="zoom:50%;" />





### 繪製鋁架(長)

1. 隱藏 `left` 部件 (component)

2. 使用快捷鍵 `I`
	- 可以量度盒子內部尺寸
	- 盒子內部尺寸為 `300mm`

<img src="image-20220610105232307.png" alt="image-20220610105232307" style="zoom:50%;" />

3. 使用 `insert derive` 功能
	- 將整支鋁支架作為 `component` derive 入檔案中

<img src="advbox1.gif" alt="advbox1" style="zoom:50%;" />

4. 使用 hotkey `I` 來量度
	- 盒子內部為 `300mm`
	- 鋁支架長度為 `250mm`
	- 需要加長 `50mm`

<img src="image-20220610110028591.png" alt="image-20220610110028591" style="zoom:50%;" />

5. ==將小黑點放到剛才的鋁支架 `component` 旁==
6. 使用 hotkey `E` 將鋁支架擠出 `50mm`
	- 不用另外加新的草圖。

<img src="image-20220610110059920.png" alt="image-20220610110059920" style="width:45%;" /><img src="image-20220610110124397.png" alt="image-20220610110124397" style="width:45%;" />

7. ==將小黑點退回最上層==
	- 使用 hotkey `J` 來做組合
		- 選擇鋁架中間的孔和 `back` 內側的角
		- 在右邊的 offset 中：
			- offset X 為 `-10mm-thickness`
			- offset Y 為 `-10mm`
		- 視乎組合時的次序和方向，XY 和正負可能跟原文有所不同
		- 作用是要讓鋁支架剛好藏在盒的內側

<img src="image-20220610110229796.png" alt="image-20220610110229796" style="width:45%;" /><img src="image-20220610110351273.png" alt="image-20220610110351273" style="width:45%;" />

8. ==確保小黑點是在最上層==
	- 點選一下 `2020 Aluminium v1:1`
		- 使用 `ctrl-C` 和 `ctrl-V` 複製貼上

<img src="image-20220610110501935.png" alt="image-20220610110501935" style="zoom:50%;" />

9. 重覆上述步驟, 組合另一邊

<img src="image-20220610110559902.png" alt="image-20220610110559902" style="width:45%;" /><img src="image-20220610120822909.png" alt="image-20220610120822909" style="width:45%;" />

10. 重覆上面步驟兩次，就能像下圖一樣, 先組合四條鋁條

<img src="image-20220610153123797.png" alt="image-20220610153123797" style="zoom:50%;" />

11. 將盒的六個面都顯示出來（如果隱藏了的話）
	- 使用 `interference` 指令
	- 確認所有零部件有否因組合錯誤而不小心重疊

<img src="advbox2.gif" alt="advbox2" style="zoom:50%;" />



###繪製鋁架(寬)

1. 使用 `insert derive` 功能
	- 將另一條未加長的鋁條作為 `component` derive 入檔案中
	- ***不能使用剛剛的鋁條複製貼上，因為一旦有一條修改，全部都會修改為同一長度***

<img src="image-20220610153531020.png" alt="image-20220610153531020" style="zoom:50%;" />

2. 使用 hotkey `I` 來量度
	- 因鋁條兩邊的寬度，尺寸需要減去鋁條寬度
	- 原本 `200mm` 的盒子寬度減去兩條鋁條，尺寸為 `160mm`
	- 因此 `250mm` 的鋁條今次要減去 `90mm`

<img src="image-20220610153625355.png" alt="image-20220610153625355" style="width:45%;" /><img src="image-20220610153701824.png" alt="image-20220610153701824" style="width:45%;" />

3. 鋁條的圓弧邊緣沒有中心線，所以很難用它們來連接
	- 使用鋁條中心的孔，join `right` 膠板的角
	- 在右邊的 offset 中：
		- offset X 為 `-10mm`
		- offset Y 為 `-10mm`
		- offset Z 為 `20mm`
	- 視乎組合時的次序和方向，XY 和正負可能跟原文有所不同

<img src="image-20220610154032317.png" alt="image-20220610154032317" style="width:45%;" /><img src="image-20220610154120564.png" alt="image-20220610154120564" style="width:45%;" />

4. ==確保將小黑點褪回最上層==
	- 點選剛剛的 `component`
		- 使用 `ctrl-C` 複製，使用 `ctrl-V` 貼上
	- 跟之前的步驟一樣
		- 複製 4 份，joint 4 次就可以了

<img src="advbox3.gif" alt="advbox3" style="zoom:50%;" />

5. 複製和組合好後
	- 將之前隱藏了的 `component` 都顯示出來
	- 使用 `interference` 指令
		- 確認所有零部件有否因組合錯誤而不小心重疊

<img src="advbox4.gif" alt="advbox4" style="zoom:50%;" />



### 繪製鋁架(高)

1. 使用 `Insert Derive` 功能
	- 導入第三款的鋁支架
	- 作為 `component` derive 入檔案中

<img src="image-20220610160711629.png" alt="image-20220610160711629" style="zoom:50%;" />

2. 使用快捷鍵 `I`
	- 量度盒子內部 `80mm` 的高
	- 減去兩支支架後，剩餘 `40mm`
	- 因此，`250mm` 的支架需要減去 `210mm`
3. ==將小黑點選至鋁條==
	- 使用快捷鍵 `E` 減去 `210mm`
	- 如果發現其他東西也一起被減去，可以開啟 `Object to Cut` 選項
		- 只點選現在的 `component`
		- 或者先隱藏其他 `component`，減完後再重新顯示出來

<img src="image-20220610160753189.png" alt="image-20220610160753189" style="width:45%;" /><img src="image-20220610160842191.png" alt="image-20220610160842191" style="width:45%;" />



4. 將鋁條組合到 `top` 的膠板底部
	- 選擇 `offset`，尺寸如右圖

<img src="image-20220610160924989.png" alt="image-20220610160924989" style="width:55%;" /><img src="image-20220610161009950.png" alt="image-20220610161009950" style="width:35%;" />

5. 複製貼上和重複步驟4次後
	- 將12條鋁條都製作和組合好
6. 開啟隱藏的 `component`
	- 將它們都顯示出來
7. 使用 `Interference` 指令
	- 檢查所有零部件是否因組合錯誤而不小心重疊

<img src="advbox5.gif" alt="advbox5" style="zoom:50%;" />



##最後組合和開孔

###最後組合

1. 完成上面的步驟後，確認沒有問題
	- 拖動盒子，確認哪些板末已經完全組合

<img src="advbox6.gif" alt="advbox6" style="zoom:50%;" />

2. 使用 hotkey `J` 來組合起來
	- 記得不要組合到鋁條，要將膠板和膠板的角組合起來
	- 如果對位時十分困難
		- 可以在組合時，指著特定的面
		- 之後按著 `ctrl` 鍵，就能鎖在該面上

<img src="advbox8.gif" alt="advbox8" style="zoom:50%;" />

<img src="advbox9.gif" alt="advbox9" style="zoom:50%;" />

3. 完成後再拖動一下, 確保全部的膠板和鋁條都完整組合起來

<img src="advbox7.gif" alt="advbox7" style="zoom:50%;" />

###開孔

1. ==選取小黑點到 `right` 旁==
	- 在表面上開一個`new sketch`
	- 先將 `right` 的 `body` 隱藏起來
	- 使用 快捷鍵`P` 將鋁條的槽投影到 sketch 上
	- 之後再將 `body` 重新顯示

<img src="advbox10.gif" alt="advbox10" style="zoom:50%;" />

2. 根據圖片開 4 個孔

	- 不必完全跟隨給定的尺寸

	- 如果擔心膠板中間沒有螺絲固定會彎曲
		- 可以在中間加多一個螺絲孔

<img src="image-20220613091211185.png" alt="image-20220613091211185" style="width:50%;" /><img src="image-20220613091308072.png" alt="image-20220613091308072" style="width:45%;" />

3. 之後可以使用 快捷鍵`E` 來開孔	
	- 選用 `To Object`點選到另一邊
	- 在 `Objects to Cut` 中，只點選 `right` 和 `left`
		- 否則中間的鋁條也會開孔

<img src="image-20220613091506801.png" alt="image-20220613091506801" style="zoom:50%;" />

4. 重複之前的步驟
	- ==點選 `component Back` 的小黑點==
		- 在表面上開一個`new sketch`
		- 先隱藏 `body`
		- 再 `project `幾個槽和孔

<img src="advbox11.gif" alt="advbox11" style="zoom:50%;" />

5. 這時你有兩個選擇
	- 可以像上面一樣
		- 在槽上開孔
		- 用 T 型嫘絲將膠板固定在槽上
	- 或者安裝在 2020 鋁條的頂孔
		- 但頂孔本身沒有任何螺絲紋
		- 購買時要跟賣家確認是否可以代為攻螺絲紋
		- 有些 2020 鋁條的頂孔可能會大一點
			- 要確認攻的是 M5 還是 M6
			- 要攻多深

<img src="image-20220613092526409.png" alt="image-20220613092526409" style="zoom:50%;" />

6. 之後就可以開孔
	- 一樣使用 `To Object` 一次過開兩塊板
	- 但記得不要讓中間的鋁條也開孔

<img src="image-20220613092658316.png" alt="image-20220613092658316" style="zoom:50%;" />

7. 之後的步驟也是一樣, 這裡就不冗述, 只出配圖

<img src="advbox12.gif" alt="advbox12" style="zoom:50%;" />

<img src="image-20220613093906555.png" alt="image-20220613093906555" style="zoom:50%;" />

<img src="image-20220613094011322.png" alt="image-20220613094011322" style="zoom:50%;" />



##完成

<img src="advbox13.gif" alt="advbox13" style="zoom:50%;" />


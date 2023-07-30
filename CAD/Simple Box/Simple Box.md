#Simple Box

- 最終成品是一個用`3mm`膠片組成的簡單盒子
- 可以使用`component`來分別組裝盒子的六面
- 盒子可以使用3D打印的連接件連接，不需要使用膠水

<img src="imagesss39.gif" alt="imagesss39" style="zoom:80%;" />


[TOC]

##1. 建立盒子內部尺寸

1. 使用快捷鍵`s`搜尋`new component`

	- 開一個新的`component`，名字叫`inner`(可以隨便改名)

	- 這個`component`用來表示盒子內部尺寸

	- 只需修改這個尺寸，整個盒子尺寸就會跟著改變

	- ==要確保開啟新的`component`之後，黑點在`inner`右邊==，代表`inner`是當前的`active`元件

<img src="imagesss1.gif" alt="imagesss1" style="zoom: 50%;" />

2. 使用快捷鍵`s`搜尋`parameter`
	- 會出現`change parameter`指令
	- Fusion 360可以設定參數，類似寫程式設定一些參數，只要修改參數整個模型就會跟著修改
2. 試著開一個參數`width`
	- 預設單位為mm
	- `Expression Value`即參數的值先設定為`80`

<img src="imagesss2.gif" alt="imagesss2" style="zoom:50%;" />

4. 之後就可以依照下表, 開試另外3個參數
	- 分別為盒子的長、寬、高, 和膠板的厚度

<img src="imagesss3.gif" alt="imagesss3" style="zoom:67%;" />

5. 按下`OK`之後, 在xy平面建立`new sketch`
	- 使用`center rectangle`在原點建立一個長方形
	- 尺寸分別為剛剛設定的`width`和`length`
	- 打上這個變數的名稱，尺寸就會自動更新

<img src="imagesss4.gif" alt="imagesss4" style="zoom:50%;" />

6. 擠出一個方形, 高度為`height`

<img src="imagesss5.gif" alt="imagesss5" style="zoom:50%;" />

## 2. 繪畫外圍六塊膠板

1. ==***<u>將小黑點褪回最上層, 如下圖紅色圈著的部分</u>***==。

2. 使用快捷鍵`s`搜尋`new component`
	- 建立一個名為`right`的`component`

<img src="imagesss6.gif" alt="imagesss6" style="zoom:50%;" />

3. ==***<u>確保小黑點在right的右邊</u>***==, 代表現在正編輯這個component。
	- 建立一個`new sketch`
	- 使用快捷鍵`P`，投影`inner`的右邊到這個`sketch`
	- 使用快捷鍵`E`，擠出，厚度為`thickness`

<img src="imagesss7.gif" alt="imagesss7" style="zoom:50%;" />

4. ==***<u>將小黑點褪回最上層</u>***==
	- 重覆上面的步驟
	- 今次建立一個叫`left`的component

<img src="imagesss8.gif" alt="imagesss8" style="zoom:50%;" />

5. 在`inner` box的左邊建立一個`new sketch`
	- 使用快捷鍵`P`投影
	- 使用快捷鍵`E`擠出，厚度為`thickness`

<img src="imagesss9.gif" alt="imagesss9" style="zoom:50%;" />

6. ==***<u>將小黑點褪回最上層</u>***==
	- 今次建立一個叫`front`的component

7. 在`inner` box的正面建立一個`new sketch`
	- 使用快捷鍵`P`投影
	- 這次要將左右兩塊膠板的側面都要一起投影

8. 之後就可以使用快捷鍵`E`來擠出，厚度為`thickness`

<img src="imagesss10.gif" alt="imagesss10" style="zoom:50%;" />

9. ==***<u>將小黑點褪回最上層</u>***==
	-  在`inner` box的背面建立一個叫`back`的``new component`
	- 在這個`back`中，建立一個`new sketch`
	    - 使用快捷鍵`P`投影
	    - 記得要將左右兩塊膠板的側面都要一起投影
	- 之後就可以使用快捷鍵`E`來擠出，厚度為`thickness`

<img src="imagesss11.gif" alt="imagesss11" style="zoom:50%;" />

10. ==***<u>將小黑點褪回最上層</u>***==
	- 在`inner` box的頂部建立一個`new component`叫`top`
	- 在這個`top`中，建立一個`new sketch`
		- 使用快捷鍵`P`投影
		- 這次要將正面、背面、左面和右面的膠板頂視一起投影
	- 之後就可以使用快捷鍵`E`來擠出，厚度為`thickness`

<img src="imagesss12.gif" alt="imagesss12" style="zoom:50%;" />

11. ==***<u>將小黑點褪回最上層</u>***==
	- 在`inner` box的頂部建立一個`new component`叫`bottom`
	- 在這個`bottom`中，建立一個`new sketch`
		- 使用快捷鍵`P`投影
		- 要將正面、背面、左面和右面的膠板底視一起投影
	- 之後就可以使用快捷鍵`E`來擠出，厚度為`thickness`

<img src="imagesss13.gif" alt="imagesss13" style="zoom:50%;" />

## 3. 繪畫3D打印的連接器

1. ==***<u>將小黑點褪回最上層</u>***==
	- 開一個`new component`，名叫`connector`（或自訂名稱）

<img src="imagesss14.gif" alt="imagesss14" style="zoom:50%;" />

2. 將`inner`、`right`、`front`、`bottom`等`component`都隱藏起來，方便操作（或者其他面也可以，總之只保留3個面）
3. 在盒子的內側面，建立一個`new sketch`
	- 使用快捷鍵`P`投影盒子的內側線段
	- 然後劃一個15x15的直角三角形

<img src="imagesss15.gif" alt="imagesss15" style="zoom:50%;" />

4. 用快捷鍵`E`，擠出`15mm`

<img src="imagesss16.gif" alt="imagesss16" style="zoom:50%;" />

5. 使用`shell`功能
	- 點選下圖的兩個面
	- 造成一個`inner shell` `2.5mm`的連接件

<img src="imagesss17.gif" alt="imagesss17" style="width:45%;" /><img src="imagesss18.gif" alt="imagesss18" style="width:45%;" />

6. 在連接件的內側建立螺絲孔
	- 如果需要`M3`螺絲配絲母，就開`3.2mm`圓
	- 如果是用`M3`自攻螺絲，不用絲母的話，就開`2.9mm`圓
	- 如果不確定是否會用絲母，建議使用`change parameter`指令
		- 開一個變數例如叫`screwSize`
		- 全部圓都用`screwSize`來定，這樣要修改就方便很多

<img src="imagesss19.gif" alt="imagesss19" style="width:45%;" /><img src="imagesss20.gif" alt="imagesss20" style="width:45%;" />

7. 在左邊和上面兩側都穿孔：
	- 先建立一條對角線
	- 在對角線的中點劃一個`3.2mm`的圓
	- 使用快捷鍵`E`減去

<img src="imagesss21.gif" alt="imagesss21" style="width:45%;" /><img src="imagesss22.gif" alt="imagesss22" style="width:45%;" />

## 4. 在六個面開孔用來安裝連接件

1. ==將小黑點選到component `top`==
	- 在`top`的底部建立一個`new sketch`
	- 使用快捷鍵`P`投影螺絲孔
2. 劃兩條中心線
	- 使用`mirror`指令將剛投影的圓鏡像兩次到4個角
3. 使用快捷鍵`E`擠出指令
	- 將四個圓孔減去

<img src="imagesss23.gif" alt="imagesss23" style="zoom:50%;" />

<img src="imagesss24.gif" alt="imagesss24" style="zoom:50%;" />

4. ==將小黑點選到`component` `left`==
	- 在`left`的建立一個`new sketch`
	- 使用快捷鍵`P`投影螺絲孔
	- 劃兩條中心線
	- 使用`mirror`指令將剛投影的圓鏡像兩次到4個角
	- 使用快捷鍵`E`，擠出指令，將四個圓孔減去
5. ==將小黑點選到`component` `back`==
	- 在`back`的建立一個`new sketch`
	- 使用快捷鍵`P`投影螺絲孔
	- 劃兩條中心線
	- 使用`mirror`指令將剛投影的圓鏡像兩次到4個角
	- 使用快捷鍵`E`，擠出指令，將四個圓孔減去

<img src="imagesss25.gif" alt="imagesss25" style="zoom:50%;" />

<img src="imagesss26.gif" alt="imagesss26" style="zoom:50%;" />

6. 將小黑點褪回最上層
	- 將六個面的膠板都顯示出來

<img src="imagesss27.gif" alt="imagesss27" style="zoom:50%;" />

7. 已經建立頂板的四個孔，底板要再建立四個
	- 不需要重新投影再劃，可以使用歷史回索
		- 在下方的歷史中，找到當初在頂板開孔的擠出`feature`
		- 雙點，將`One side`變成`Two sides`
		- 另一邊擠出就可以擠出到底板的下方
		- 記得要將`Objects To Cut`開出來，點選要連底板也減去

<img src="imagesss28.gif" alt="imagesss28" style="zoom:50%;" />

8. 右邊和前面的板也一樣，可以使用歷史回索
	- 在下方的歷史中，找到當初在`left`和`back`開孔的擠出`feature`
	- 雙點，將`One side`變成`Two sides`
	- 另一個擠出就可以擠出到右邊或前面板
	- 記得要將`Objects To Cut`開出來，點選要連板也減去

<img src="imagesss29.gif" alt="imagesss29" style="zoom:50%;" />

## 5. 組裝整個盒子

- *使用快捷鍵`J`或搜尋`Joint`指令*
- *`Joint`只適用於`component`和`component`之間*
- *點選圓孔時可以按著`ctrl`鍵來鎖定要點選的平面*



1. 將6個面的膠板移開一下
2. 使用快捷鍵`J`來做組裝
	- 點選連接器的孔的外側
	- 接著點選膠板對應的孔

<img src="imagesss30.gif" alt="imagesss30" style="zoom:50%;" />

3. 將另外兩個面的膠板都組裝起來
	- 記得，連接器不是對稱的，三個孔對應的面不能亂
4. 組裝好後可以輕輕拖動一下
	- 你會發現三塊板都會一起動

<img src="imagesss31.gif" alt="imagesss31" style="zoom:50%;" />

4. 確保小黑點是在最上層
	- 輕按一下`connector:1`
	- 之後使用快捷鍵`ctrl-c`複製
	- 再使用快捷鍵`ctrl-v`貼上
	- 你會發現貼上的`connector:2`是原地貼上的
	- 可以將其移開一下放便之後組裝

5. 重複使用快捷鍵`ctrl-c`複製
	- 再使用快捷鍵`ctrl-v`貼上
	- 我們共需要4個`connector`

<img src="imagesss32.gif" alt="imagesss32" style="zoom:50%;" />

6. 使用快捷鍵`J`組裝起來
	- 首先將4個`connector`都組裝在`back`的膠板
	- 記得`connector`是不對稱的，要組裝好在對應的面
	- 點選兩個點後可以旋轉角度

<img src="imagesss33.gif" alt="imagesss33" style="zoom:50%;" />

7. 之後將另外幾塊未組裝的膠板移開一下方便組裝
	- 使用快捷鍵`J`將餘下的板組裝起來

<img src="imagesss34.gif" alt="imagesss34" style="zoom:50%;" />

8. 按住`shift`鍵
	- 點一下`connector:1`
	- 再點一下`connector:4`
	- 就可以一次選擇4個`connector`
9. 之後使用快捷鍵`ctrl-c`複製
	- 再使用快捷鍵`ctrl-v`貼上
	- 貼上後可以移動和旋轉一下方便一會再組裝

<img src="imagesss35.gif" alt="imagesss35" style="zoom:50%;" />

10. 之後可以做4次`Joint`
	- 分別將4個`connector`組裝到頂板或側板

<img src="imagesss36.gif" alt="imagesss36" style="zoom:50%;" />

11. 最後，將正面的板組裝到隨意一個`connector`就完成
12. 完成後試著輕輕拖動一下，整個盒都會一起動就正確了

<img src="imagesss37.gif" alt="imagesss37" style="zoom:50%;" />

## 6. 利用Parameter改變盒子大小和板厚

1. 最後，試一試修改盒子的寬為`100mm`，長為`80mm`，板厚為`5mm`
2. 看一看模型有沒有錯誤警告
3. 如果沒有就完成，可以正確提交

<img src="imagesss38.gif" alt="imagesss38" style="zoom:50%;" />

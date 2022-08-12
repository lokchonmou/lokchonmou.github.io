#2.1 Simple Box 

最終成品是一個用`3mm`膠片組成的簡單盒子。本節會教大家做用component來分別組裝盒子的六面。盒子再用3d打印的連接件連接，不需要膠水。

<img src="imagesss39.gif" alt="imagesss39" style="zoom:80%;" />


[TOC]

##1. 建立盒子內部尺寸

1. 用hotkey `s`搜尋`new component`，開一個新的component，名字叫`inner`(可以隨便改名)，為盒子內部尺寸，之後只要修改這個尺寸，則全個盒子尺寸都會修改。==確保開新component之後，黑點在inner右邊，代表active==

<img src="imagesss1.gif" alt="imagesss1" style="zoom: 50%;" />

2. 搜尋`parameter`, 就會找到`change parameter`指令, fusion360可以設定參數, 有點類似寫程式設定一此參數, 只要修改參數整個模型就會跟著修改
2. 試著開一個參數`width`, 預設單位為mm, `Expression Value`即參數的值先設定為`80`

<img src="imagesss2.gif" alt="imagesss2" style="zoom:50%;" />

4. 之後就可以依照下表, 開試另外3個參數, 分別為盒子的長、寬、高, 和膠板的厚度

<img src="imagesss3.gif" alt="imagesss3" style="zoom:67%;" />

5. 按下ok之後, 在xy平面建立`new sketch`, 用`center rectangle`在原點建立一個長方形, 尺寸分別為剛剛的`width`和`length`, 將這個變數名稱打在尺寸上就會得出相應的尺寸

<img src="imagesss4.gif" alt="imagesss4" style="zoom:50%;" />

6. 擠出一個方形, 高度為`height`

<img src="imagesss5.gif" alt="imagesss5" style="zoom:50%;" />

## 2. 繪畫外圍六塊膠板

7. ==***<u>將小黑點褪回最上層, 如下圖紅色圈著的部分</u>***==。
8. 用`new component` 建立一個名為`right`的component

<img src="imagesss6.gif" alt="imagesss6" style="zoom:50%;" />

9. ==***<u>確保小黑點在right的右邊</u>***==, 代表現在正編輯這個component。建立new sketch, 用hotkey `P`, 投影inner box的右邊到這個sketch, 之後用hotkey `E`, 擠出, 厚度為`thickness`

<img src="imagesss7.gif" alt="imagesss7" style="zoom:50%;" />

10. ==***<u>將小黑點褪回最上層</u>***==, 重覆上面的步驟, 今次建立一個叫`left`的component

<img src="imagesss8.gif" alt="imagesss8" style="zoom:50%;" />

11. 重覆, 在inner box的左邊建立一個new sketch, 用hotkey `P`投影, 用hotkey `E`擠出厚度`thickness`

<img src="imagesss9.gif" alt="imagesss9" style="zoom:50%;" />

12. ==***<u>將小黑點褪回最上層</u>***==,  今次建立一個叫`front`的component
13. 在inner box的正面建立一個`new sketch`, 用hotkey `P`投影, 今次要將左右兩塊膠板的側面都要一起投影
14. 之後就可以用hotkey `E`來擠出, 厚度為`thickness`

<img src="imagesss10.gif" alt="imagesss10" style="zoom:50%;" />

15. ==***<u>將小黑點褪回最上層</u>***==, 重覆上面12-14的步驟, 不過今次換成背面

<img src="imagesss11.gif" alt="imagesss11" style="zoom:50%;" />

16. ==***<u>將小黑點褪回最上層</u>***==, 重覆上面的步驟, 今次換成inner box的頂, 而且投影時, 要連正面和背面的膠板頂視一起投影

<img src="imagesss12.gif" alt="imagesss12" style="zoom:50%;" />

17. ==***<u>將小黑點褪回最上層</u>***==, 接著就是底部的膠板

<img src="imagesss13.gif" alt="imagesss13" style="zoom:50%;" />

## 3. 繪畫3D打印的連接器

18. ==***<u>將小黑點褪回最上層</u>***==, 開一個`new component`, 名叫`connector`, 或你喜歡你名字

<img src="imagesss14.gif" alt="imagesss14" style="zoom:50%;" />

19. 將component `inner`, `right`, `front`, `bottom`都隱藏起來放便操作(或者其他面也可以, 總之只保留3個面)
20. 在盒子的內側面, 建立一個`new sketch`, 用hotkey `P `投影盒子的內側線段, 然後劃一個15x15的直角三角形如下圖

<img src="imagesss15.gif" alt="imagesss15" style="zoom:50%;" />

21. 用hotkey `	E`擠出`15mm`

<img src="imagesss16.gif" alt="imagesss16" style="zoom:50%;" />

22. 擠出後用`shell`功能, 點選下圖的兩個面, 造成一個inner shell` 2.5mm`的連接件

<img src="imagesss17.gif" alt="imagesss17" style="width:45%;" /><img src="imagesss18.gif" alt="imagesss18" style="width:45%;" />

23. 之後在連接件的內側建立螺絲孔
    - 如果你需要M3螺絲配絲母, 就開`3.2mm`圓
    -  如果是用M3自攻螺絲, 不用絲母的話, 就開`2.9mm`圓
    - 如果你不確定自己會否用絲母, 我會建議你用`change parameter`指令, 開一個變數例如叫`screwSize`, 全部圓都用`screwSize`來定, 那麼要修改就方便很多

<img src="imagesss19.gif" alt="imagesss19" style="width:45%;" /><img src="imagesss20.gif" alt="imagesss20" style="width:45%;" />

24. 之後在左邊和上面兩側都穿孔: 先建立一條對角線, 在對角線的中點劃一個`3.2mm`的圓, 就可以用hotkey `E`減去

<img src="imagesss21.gif" alt="imagesss21" style="width:45%;" /><img src="imagesss22.gif" alt="imagesss22" style="width:45%;" />

## 4. 在六個面開孔用來安裝連接件

25. ==***<u>將小黑點接到component `top`</u>***==, 在`top`的底部建立一個`new sketch`, 用hotkey `P`投影螺絲孔
26. 之後劃兩條中心線, 用`mirror`指令將剛投影的圓鏡像兩次到4個角
27. 接著用hotkey `E`擠出指令, 將四個圓孔減去

<img src="imagesss23.gif" alt="imagesss23" style="zoom:50%;" />

<img src="imagesss24.gif" alt="imagesss24" style="zoom:50%;" />

28. 重覆剛才的步驟, 在component `left`和`back`都建立四個螺絲孔(==記得建立sketch之前, 要將小黑點選到對應的component==)

<img src="imagesss25.gif" alt="imagesss25" style="zoom:50%;" />

<img src="imagesss26.gif" alt="imagesss26" style="zoom:50%;" />

29. 三面都劃好螺絲孔後, 就可以將小黑點褪回上最層。將六個面的膠板都顯示出來

<img src="imagesss27.gif" alt="imagesss27" style="zoom:50%;" />

30. 已經建立頂板的四個孔, 底板要再建立四個, 是不需要投影再劃的。Fusion360有歷史回索, 只需要在下方的歷史中, 找到當初在頂板開孔的擠出feature, 雙點, 就可以將`One side`變成`Two sides`, 另一個擠出就可以擠出到底板的下方, 記得要將`Objects To Cut` 開出來, 點選要連底板也減去

<img src="imagesss28.gif" alt="imagesss28" style="zoom:50%;" />

31. 右邊和前面的板也一樣。

<img src="imagesss29.gif" alt="imagesss29" style="zoom:50%;" />

## 5. 組裝整個盒子

- *Hotkey `J`就是`Joint`的簡寫, 你可以搜尋`Joint`指令也可以*
- *Joint只適用於component和component之間*
- *點選圓孔時可以按著`ctrl`鍵來鎖定要點選的平面*



32. 將6個面的膠板移開一下。用hotkey `J`來做組裝。點選連接器的孔的外側, 接著點選膠板對應的孔

<img src="imagesss30.gif" alt="imagesss30" style="zoom:50%;" />

33. 重覆, 將另外兩個面的膠板都組裝起來, 記得, 連接器不是對稱的, 三個孔對應的面不能亂, 組裝好後可以輕輕拖動一下, 你會發現三塊板都會一起動

<img src="imagesss31.gif" alt="imagesss31" style="zoom:50%;" />

34. ==確保小黑點是在最上層==, 輕按一下`connector:1`, 之後用hotkey `ctrl-c`複製, 再用`ctrl-v`貼上, 你會發現貼上的`connector:2`是原地貼上的, 可以將其移開一下放便之後組裝。
35. 重覆 `ctrl-c`複製, 再用`ctrl-v`貼上, 我們共需要4個`connector`

<img src="imagesss32.gif" alt="imagesss32" style="zoom:50%;" />

36. 用hotkey `J`組裝起來, 首先將4個connector都組裝在`back`的膠板, 記得connector是不對稱的,  要組裝好在對應的面, 點選兩個點後可以旋轉角度

<img src="imagesss33.gif" alt="imagesss33" style="zoom:50%;" />

37. 之後將另外幾塊未組裝的膠板移開一下方便組裝。用hotkey `J` 將餘下的板組裝起來。

<img src="imagesss34.gif" alt="imagesss34" style="zoom:50%;" />

38. 之後可以按著`shift`鍵, 點一下`connetor:1`, 再點一下`connetor:4`, 就可以一次過選4個connector, 之後用 `ctrl-c`複製, 再用`ctrl-v`貼上, 貼上後可以移動和旋轉一下方便一會再組裝

<img src="imagesss35.gif" alt="imagesss35" style="zoom:50%;" />

39. 之後可以做4次joint, 分別將4個connector組織到頂板或側板

<img src="imagesss36.gif" alt="imagesss36" style="zoom:50%;" />

40. 最後, 將正面的板組織到隨意一個connector就完成。完成後試著輕輕拖動一下, 整個盒都會一起動就正確了。

<img src="imagesss37.gif" alt="imagesss37" style="zoom:50%;" />

## 6. 利用Parameter改變盒子大小和板厚

41. 最後, 試一試修改盒子的寬為`100mm`, 長為`80mm`, 板厚為`5mm`, 看一看模型有沒有錯誤警告, 沒有就完成可以正確提交

<img src="imagesss38.gif" alt="imagesss38" style="zoom:50%;" />

# 2.2 Advanced box

對於一些比較大型的作品, 單單用膠片組成一個盒, 但十分容易斷開, 如果轉用厚膠片, 作品又會變得重, 厚睇板加工亦較困難。這時候, 就可以試試用組合鋁架去做骨幹, 以確保其硬度。

[TOC]

##檔案

本次會應用到的檔案(以下為step檔)，下載**解壓**後，在fusion左邊欄尋找"upload"鍵，就能上載到fuison中應用

[useful robotics component step.zip](useful_robotics_component_step.zip)

<img src="advbox14.gif" alt="advbox14" style="zoom:50%;" />

## 1. 繪畫盒子的六面

1. 第一步為建立盒的六個面，這一步就不再重覆了，[上一章](./content2_1.html#1-建立盒子內部尺寸 ) 的第一節和第二節。
2. 之後就可以用`change parameter`, 將盒子內部的長寬高設定成下表

<img src="image-20220610104616486.png" alt="image-20220610104616486" style="zoom:80%;" />

<img src="image-20220610105201818.png" alt="image-20220610105201818" style="zoom:50%;" />

## 2. 繪製鋁架

### 鋁支架小知識

下圖是一個鋁架的真實圖

<img src="Aluminium_Profile_Cube.jpg" alt="Aluminium Extrusion - Proto-PIC" style="zoom:50%;" />

這類鋁架的連接方式一般分為兩種, 一種是三角形的連接件。三角形的好處是比較結實，對於大型的結構會比較受力。但缺點是外露出來影響外觀



<img src="large-16548296110601.png" alt="Aluminium Corner Bracket 2028 | 3D CAD Model Library | GrabCAD" style="zoom:50%;" />

https://grabcad.com/library/aluminium-corner-bracket-2028-1

另一種是L型的連接件。L型連接件的用法是藏在槽入面, 不會外露出來。

<img src="https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/e39e8a2dd7aa325a263ab2e938b129bc/large.jpg" alt="L-joint (2020, 3030) | 3D CAD Model Library | GrabCAD" style="zoom:100%;" /><img src="large-16548296342264.jpeg" alt="L-joint (2020, 3030) | 3D CAD Model Library | GrabCAD" style="zoom:50%;" />

https://grabcad.com/library/l-joint-2020-3030-1



一個方形的鋁架應該由12條所組成, 總共分成三種尺寸, 對應盒子的長寬和高, 但當然, 因鋁支架本身也是有厚度的, 視乎組合的前後次序, 鋁支架的長度不會完全等於盒的長寬高。



要在鋁條表面固定膠板, 2020鋁條的槽通用是`M5`螺絲, 配合T型絲母固定

<img src="T-Type-M4-Nut-For-20X20-Aluminium-Profile-10-Pcs.png" alt="Buy T Type M4 Nut For 20X20 Aluminium Profile Online at Best Price" style="zoom:50%;" />





### 繪製鋁架(長)

3. 將component `left`先隱藏起來
4. 用hotkey `I` 就能量度尺寸, 盒子內部尺寸為`300mm`

<img src="image-20220610105232307.png" alt="image-20220610105232307" style="zoom:50%;" />



5. 用`insert derive`功能, 將整支鋁支架作為`component`dervie入檔案中

<img src="advbox1.gif" alt="advbox1" style="zoom:50%;" />



6. 用hotkey `I` 來量度, 剛才盒子內部為`300mm`, 而這支鋁支架長度為`250mm`, 即需要加長`50mm`

<img src="image-20220610110028591.png" alt="image-20220610110028591" style="zoom:50%;" />



7. 將小黑點放到剛才的鋁支架component旁, 用hotkey `E` 將友架擠出`50mm`(今次可以不用另外加new sketch)

<img src="image-20220610110059920.png" alt="image-20220610110059920" style="width:45%;" /><img src="image-20220610110124397.png" alt="image-20220610110124397" style="width:45%;" />



8. 將小黑點退回最上層，用hotkey `J` 來做組合。我選擇了鋁架中間的孔, 另一個點則選擇了`back`內側的角, 在右邊的offset中, offset X  `-10mm-thickness`, offset Y `-10mm`, 視乎你組合時的次序和方向, 你的XY和正負可能跟我的有點差別, 但作用都是要鋁支架剛好藏在盒的內側

<img src="image-20220610110229796.png" alt="image-20220610110229796" style="width:45%;" /><img src="image-20220610110351273.png" alt="image-20220610110351273" style="width:45%;" />



9. ==確保小黑點是在最上層==, 點選一下`2020 Aluminium v1:1`, 用`ctrl-C`和`ctrl-V`複雜貼上

<img src="image-20220610110501935.png" alt="image-20220610110501935" style="zoom:50%;" />



10. 跟剛剛一樣, 組合另一邊

<img src="image-20220610110559902.png" alt="image-20220610110559902" style="width:45%;" /><img src="image-20220610120822909.png" alt="image-20220610120822909" style="width:45%;" />



11. 重覆上面步驟兩次，就能像下圖一樣, 先組合四條鋁條

<img src="image-20220610153123797.png" alt="image-20220610153123797" style="zoom:50%;" />



12. 將盒的六個面都顯示出來(如果隱藏了的話), 用`interference`指令看看所有零部件有否因組合錯誤而不小心重疊了

<img src="advbox2.gif" alt="advbox2" style="zoom:50%;" />



###繪製鋁架(寬)

13. 重新再用`insert derive`功能, derive另一條末加長的鋁條入這個檔案中(不能用剛剛的鋁條複製貼上, 鋁條的尺寸有一條修改的話, 全部都會修改為同一長度)

<img src="image-20220610153531020.png" alt="image-20220610153531020" style="zoom:50%;" />



14. 用hotkey `I` 來量度一下尺寸, 今次因鋁條兩邊的寬度, 所以量度下, 原本`200mm`的盒子寬度, 減去兩條鋁條, 尺寸為`160mm`, 所以`250mm`的鋁條, 今次要減去`90mm`

<img src="image-20220610153625355.png" alt="image-20220610153625355" style="width:45%;" /><img src="image-20220610153701824.png" alt="image-20220610153701824" style="width:45%;" />



15. 由於鋁條的邊都是fillet過, 又沒有中線, 十分難用鋁條join鋁條, 所以跟之前一樣, 我會用鋁條中心的孔, join `right `膠板的角, offset X 為`-10mm`, offset Y 為`-10mm`, offset Z 為`20mm`

<img src="image-20220610154032317.png" alt="image-20220610154032317" style="width:45%;" /><img src="image-20220610154120564.png" alt="image-20220610154120564" style="width:45%;" />



16. ==確保將小黑點褪回最上層==, 點選剛剛的component, 用`ctrl-C`複製, 用`ctrl-V`貼上
17. 跟之前的步驟一樣, 只要複製4份, joint 4次就可以了, 這裡就不再冗述

<img src="advbox3.gif" alt="advbox3" style="zoom:50%;" />



18. 複製和組合好後, 將之前隱藏了的component都顯示出來, 用`interference`指令看看所有零部件有否因組合錯誤而不小心重疊了

<img src="advbox4.gif" alt="advbox4" style="zoom:50%;" />



### 繪製鋁架(高)

19. 用`insert derive` 指今再導入第三款的鋁支架

<img src="image-20220610160711629.png" alt="image-20220610160711629" style="zoom:50%;" />



20. 用hotkey `I `量度, 盒子內部`80mm`的高, 減去兩支支架後, 現在只需要`40mm`, 所以250mm的支架需要減去`210mm`
21. 將小黑點選至鋁條, 用hotkey `E` 來減去210mm, 如果這時發覺連同其他東西都一起減去, 就可以選`object to cut`打開後, 只點選現在這個component(如右圖), 或先隱藏其他component, 減完後再重新顯示出來

<img src="image-20220610160753189.png" alt="image-20220610160753189" style="width:45%;" /><img src="image-20220610160842191.png" alt="image-20220610160842191" style="width:45%;" />



22. 跟之前一樣, 鋁條組合去膠板上, 尺寸上比較容易掌握, 所以現在組合到`top`的膠板底部, 之後選擇offset如右圖

<img src="image-20220610160924989.png" alt="image-20220610160924989" style="width:55%;" /><img src="image-20220610161009950.png" alt="image-20220610161009950" style="width:35%;" />



23. 複製貼上和重複步驟4次後, 就能將12條鋁條都製作和組合好, 之後開隱藏的component都顯示出來,  用`interference`指令看看所有零部件有否因組合錯誤而不小心重疊了

<img src="advbox5.gif" alt="advbox5" style="zoom:50%;" />



##最後組合和開孔

###最後組合

24. 完成上面的步驟後, 確認沒有問題, 就可以拖動一下盒子, 這時你就能知道有哪些板末完全組合

<img src="advbox6.gif" alt="advbox6" style="zoom:50%;" />



25. 用hotkey `J` 來組合起來, 但記著不要組合到鋁條, 要將膠板和膠板的角組合起來
    (如果對位時十分困難, 可以在組合時, 指著特定的面, 之後按著`ctrl`鍵, 就能鎖在該面上)

<img src="advbox8.gif" alt="advbox8" style="zoom:50%;" />

<img src="advbox9.gif" alt="advbox9" style="zoom:50%;" />



26. 完成後再拖動一下, 確保全部的膠板和鋁條都完整組合起來

<img src="advbox7.gif" alt="advbox7" style="zoom:50%;" />

###開孔

27. ==將小黑點選到`right`旁==, 在表面開一個`new sketch`, 先將`right`的body隱藏起來, 用hotkey `P`將鋁條的槽投影到sketch上, 之後就可以將body重新顯示

<img src="advbox10.gif" alt="advbox10" style="zoom:50%;" />



28. 跟據下圖開4個孔, 你不一定要完全跟我的尺寸, 如果怕膠板中間沒有螺絲固定會彎曲, 可以在中間也加入螺絲孔

<img src="image-20220613091211185.png" alt="image-20220613091211185" style="width:50%;" /><img src="image-20220613091308072.png" alt="image-20220613091308072" style="width:45%;" />



29. 之後可以用hotkey `E` 來開孔, 可以選用`To Object`, 點選到另一邊, 但這時會連中間的鋁條也會開孔, 所以在`Objects to Cut`中, 只點選`right` 和`left`

<img src="image-20220613091506801.png" alt="image-20220613091506801" style="zoom:50%;" />



30. 重複, 點選component `Back`的小黑點, 在表面開一個`new sketch`, 先隱藏起body, 再project幾個槽和孔

<img src="advbox11.gif" alt="advbox11" style="zoom:50%;" />



31. 這時你有兩個選擇, 可以好像上面一樣, 在槽上開孔, 用T型嫘絲將膠板固定在槽上, 或者安裝在2020鋁條的頂孔(==但頂孔本身是沒有任合螺絲紋的, 購買的時候要跟賣家確認是否可以代為攻螺絲紋, 有的2020的頂孔可以會大一點的, 所以要確認是攻M5 還是M6, 要攻多深==)

<img src="image-20220613092526409.png" alt="image-20220613092526409" style="zoom:50%;" />



32. 之後就可以開孔, 一樣, 用`To Object`一次過開兩塊板, 但記得不要連中間的鋁條也開孔

<img src="image-20220613092658316.png" alt="image-20220613092658316" style="zoom:50%;" />



33. 之後的步驟也是一樣, 這裡就不冗述, 只出配圖

<img src="advbox12.gif" alt="advbox12" style="zoom:50%;" />

<img src="image-20220613093906555.png" alt="image-20220613093906555" style="zoom:50%;" />

<img src="image-20220613094011322.png" alt="image-20220613094011322" style="zoom:50%;" />



##完成

<img src="advbox13.gif" alt="advbox13" style="zoom:50%;" />


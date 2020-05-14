#2.1 Simple Box 

最終成品是一個用3mm膠片組成的簡單盒子。本節會教大家做用component來分別組裝盒子的六面。而盒子本身使用入榫，用六角銅柱安裝固定，不需要膠水。

![image30](./image30.gif)

##教學

1. 用hotkey 's'搜尋"new component"，開一個新的component，名字叫"inner"(可以隨便改名)，為盒子內部尺寸，之後只要修改這個尺寸，則全個盒子尺寸都會修改。==確保開新component之後，黑點在inner右邊，代表active==

![image1](./image1.gif)

2. 開一個new sketch，開了後確認一下新的sketch在inner中，點xy平面

![image2](./image2.gif)

3. 用's'搜尋"center rectangle"，在原點畫一個方型。用hotkey 'd'來定義尺寸100x100mm

![image3](./image3.gif)

4. 用hotkey 'e'來extrude擠出成型。高度是40mm(<u>注意工場六角柱只有8mm和20mm兩種尺寸，所以必須為這兩個尺寸的組合，否則需要加膠圈墊高</u>)

![image4](./image4.gif)

5. ==點選標題右邊的黑點==，按's'，搜尋'new component'，再開一個叫"top"的component。

![image5](./image5.gif)

6. 開一個new sketch, 點選inner的頂部, 用hotkey 'r'劃一個比inner大少許的方型

![image6](./image6.gif)

7. 按hotkey 's', 搜尋"change parameter"

![image7](./image7.gif)

8. 定義一個叫"thickness"為3mm的膠板厚度，這個參數在任何時候修改，都能立刻改變整個設計，之後會十分方便。

![image8](./image8.gif)

9. 定義外面的方型offset為"thickness*2"

![image9](./image9.gif)


10. 用hotkey 'r', 畫一個"thickness x 20mm"的長方型，作為榫位

![image10](./image10.gif)

11. 用kotkey 'L'，畫兩條中心線，並用hotkey 'x'將其變為輔助線

![image11](./image11.gif)

12. 用kotkey 'S'，搜尋"mirror", object選擇方型, 對稱線mirror line選擇要對稱的中心線

![image12](./image12.gif)

13. 重覆幾次直至四邊都有2個方型榫位，最後定義榫位間的距離，直到全部線段都是黑色，黑色線即已完全定義

![image13](./image13.gif)

14. 按hotkey' e'，extrude擠出頂板，厚度為thickness

![image14](./image14.gif)

15. 習慣將四個角fillet一下, 大約3-4mm，否則造出來的盒會很難拿上手，fillet最好是擠出立體後再做，沒那麼易錯

![image15](./image15.gif)

16. 按回標題旁邊的黑點，退出"top"這個component

![image16](./image16.gif)

17. 在標題為active的大前題下，開一個新的component叫bottom

![image17](./image17.gif)
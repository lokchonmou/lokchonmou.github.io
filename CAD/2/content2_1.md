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

18. 開一個新的sketch，點選inner的底部，並用hotkey 'p'，project投影頂板到底板

![image18](./image18.gif)

19. 用hotkey 'E'，擠出厚度thickness

![image19](./image19.gif)

20. 選回主標題旁邊的黑點，將active放到根目錄，按hotkey 's'搜尋"new component"，開一個新的component叫"back"

![image20](./image20.gif)

21. 在back的面，開一個新的sketch, 用hotkey 'p'或者用's'搜尋"project"，投影inner的背面和榫位的方型

![image21](./image21.gif)

22. 用hotkey 'e'擠出厚度為"thickness"的板

![image22](./image22.gif)

23. 退回標題的active黑點, 重覆以上步驟, 在front正面投影project和擠出extrude出與背面一樣的板

![image23](./image23.gif)

24. 在標題目錄開一個新的component叫left, 在inner的左邊點選開一個new sketch, 今次除了投影上下的榫位，也要把前後板的厚度點選，不然出來的盒子，旁邊會少了一角

![image24](./image24.gif)

25. 重覆以上步驟，把右邊right的板都造好，檢查一下總共有7個component，包括inner和6個面，如果不小心之前忘記先新增component再extrude body, 可以在左邊的欄中找到該body，按滑鼠右鍵把該body轉成component

![image25](./image25.gif)

26. 用hotkey 'j'去joint接合膠板，joint有很多種，最常見的就是ridge joint，就是直接將兩個component好似用膠水般黏合，如果中途問你之前move後是否要capture position，可以選yes，即紀錄move後的位置

![image26](./image26.gif)

27. 在全部joint好之後可以把這個capture position在歷史欄中刪除

![image27](./image27.gif)

28. 在歷史欄中，找回原本top板的sketch，double click進入修改，用offset定位，加入4個3mm的鑽孔，用來安裝固定的六角柱

![image28](./image28.gif)

29. 將offset後的線點選，用hotkey 'X'轉成輔助線，最後就可以在四邊畫四個3mm的孔用來安裝固定的六角柱，在歷史欄中的extrude中重新點選，不要extrude那4個圓，就會多了4鑽孔

![image29](./image29.gif)

30. 重覆以上步驟，在底板也加入4個鑽孔(可以直接用hotkey 'p'把頂板的孔project到底板，確保上下是一致的)

![image30](./image30.gif)

完成。如果有需要，可以先退回歷史修改尺寸或加入其他設計，或者在這個步驟後再加新的sketch去修改。
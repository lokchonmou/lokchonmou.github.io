# 2.6 Sumo Robot

本節是介紹如何去組裝一隻相撲機械人。做好後效果如下:

<img src="Screenshot 2022-03-14 174220.png" alt="Screenshot 2022-03-14 174220" style="zoom:80%;" />

[TOC]

## Step 1: 準備工作/檔案

本次會應用到的檔案(以下為step檔)，下載**解壓**後，在fusion左邊欄尋找"upload"鍵，就能上載到fusion中應用

[useful robotics component step.zip](useful_robotics_component_step.zip)

以下展示如何下載、解壓和上傳:

<img src="upload.gif" style="zoom:50%;" />

## Step 2: 建立小車底盤

###繪製底盤

<img src="Screenshot 2022-03-14 142246.png" alt="Screenshot 2022-03-14 142246" style="width:45%;" /> <img src="Screenshot 2022-03-14 142311.png" alt="Screenshot 2022-03-14 142311" style="width:45%;" />

1. 開始一個新的設計
2. 開一個new component
2. 名字叫`bottom`



<img src="Screenshot 2022-03-14 142341-16472534115661.png" alt="Screenshot 2022-03-14 142341" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 142411-16472534165382.png" alt="Screenshot 2022-03-14 142411" style="width:45%;" />

1. 確保小黑點在bottom這個component旁邊
2. 開一個`new sketch`



![Screenshot 2022-03-14 143037](Screenshot 2022-03-14 143037.png)

1. 底盤尺寸可參考上面的圖
2. <u>*尺寸不用完全一樣一模, 尤其是機械人的長和寬, 畫好後之後可以修改的*</u>

<img src="Screenshot 2022-03-14 143148.png" alt="Screenshot 2022-03-14 143148" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 143228.png" alt="Screenshot 2022-03-14 143228" style="WIDTH:45%;" />

1. 搜尋`change parameters`
2. 開一個新的變數叫`thickness`, 值為`3mm`



<img src="Screenshot 2022-03-14 143251 (2)_LI.jpg" alt="Screenshot 2022-03-14 143251 (2)_LI" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 143337.png" alt="Screenshot 2022-03-14 143337" style="width:45%;" />

1. 將底板擠出`thickness`的厚度
2. 習慣地將擠出好的板做fillet, 實物切割出來時才不會割手



<img src="Screenshot 2022-03-14 143856.png" alt="Screenshot 2022-03-14 143856" style="zoom:60%;" />

最後，在零件樹按滑鼠右鍵，按下`Ground`，`Ground`後拖動底板就不會動，所有的joint都以底板為準。



###插入底盤零件

<img src="Screenshot 2022-03-14 143522-16472540795493.png" alt="Screenshot 2022-03-14 143522" style="width:45%;" /><img src="Screenshot 2022-03-14 143554-16472542153901.png" alt="Screenshot 2022-03-14 143554" style="width:45%;" />

<img src="Screenshot 2022-03-14 143639.png" alt="Screenshot 2022-03-14 143639" style="WIDTH:60%;" />


1. ==將小黑點褪回第一層==
2. 將`ball castor CY 15A` 拖入當前檔案中
2. 按`ok`



<img src="Screenshot 2022-03-14 143704.png" alt="Screenshot 2022-03-14 143704" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 143814.png" alt="Screenshot 2022-03-14 143814" style="WIDTH:45%;" />

1. 對著左手邊的零件樹的`ball castor`按滑鼠右鍵
2. 找到`Rigid Group`按下(因上傳的是`*.step`檔，所有的零件都沒有joint的關係，所以一移動就會散開，所以要先做`Rigid Group`將其全部組成一group)
3. 用hotkey `J`，將牛眼輪連接到底板，墊高`3mm`(實際組裝時用3mm墊圈墊高)



<img src="Screenshot 2022-03-14 144242.png" alt="Screenshot 2022-03-14 144242" style="width:45%;" /><img src="Screenshot 2022-03-14 144205.png" alt="Screenshot 2022-03-14 144205" style="width:45%;" />

1. 其他零件都一樣:
   1. 先拖到當前畫面，接`ok`;
   2. 再做`Rigid Group`
   3. 最後用hotkey `J` 組裝到相對的位置
2. ***<u>在組裝56mm Sport Tires時，可以將連軸器插入六角軸15mm</u>***


## Step 3: 繪製和組裝小車第二層板

###繪畫小車底板

<img src="Screenshot 2022-03-14 144408.png" alt="Screenshot 2022-03-14 144408" style="width:80%;" />

1. ==將小黑點褪回第一層==
2. 開一個new component
3. 名字叫`top`



<img src="Screenshot 2022-03-14 144424.png" alt="Screenshot 2022-03-14 144424" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 144450.png" alt="Screenshot 2022-03-14 144450" style="WIDTH:45%;" />

1. ==確保小黑點在新的`top` component旁==
2. 按下`offset plane`
3. 在小車的底板表面，offset `40mm`(工場的六角柱只有20mm和8mm兩種，如果是這兩個數字以外，可以組合起來，或直接轉用3d打印墊高)



<img src="Screenshot 2022-03-14 144517.png" alt="Screenshot 2022-03-14 144517" style="width:45%;" /><img src="Screenshot 2022-03-14 144547.png" alt="Screenshot 2022-03-14 144547" style="width:45%;" />

1. 在新開的offset plane上按下`new sketch`
2. 用hotkey `p`或直接搜尋`project`，投影底板到這個面上



<img src="Screenshot 2022-03-14 144839.png" alt="Screenshot 2022-03-14 144839" style="width:45%;" /><img src="Screenshot 2022-03-14 144920.png" alt="Screenshot 2022-03-14 144920" style="width:45%;" /><img src="Screenshot 2022-03-14 145010.png" alt="Screenshot 2022-03-14 145010" style="zoom:45%;" />

1. 跟據上圖先繪畫頂板的安裝孔和頂板的輪廓(尺寸之後可以按需要修改)
2. 擠出`thickness`的厚度
3. 順手將擠出後的尖角做fillet

###插入Arduino UNO

<img src="Screenshot 2022-03-14 145403.png" alt="Screenshot 2022-03-14 145403" style="zoom:45%;" />

1. 繼續確保小黑點在top的component旁
2. 在top的上面的面，開一個`new sketch`



<img src="Screenshot 2022-03-14 145653.png" alt="Screenshot 2022-03-14 145653" style="width:45%;" /><img src="Screenshot 2022-03-14 145849.png" alt="Screenshot 2022-03-14 145849" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 145923.png" alt="Screenshot 2022-03-14 145923" style="width:45%;" />

1. 接下來，要將Arduino安裝在頂板上，所以要跟據Arduino UNO來開孔
2. Arduino UNO的第四個孔因太近零件，所以不安裝也沒有關係
3. 之後就可以將3個圓穿孔



<img src="Screenshot 2022-03-14 145957.png" alt="Screenshot 2022-03-14 145957" style="width:45%;" /><img src="Screenshot 2022-03-14 150031.png" alt="Screenshot 2022-03-14 150031" style="width:45%;" />

1. 打開零件樹，找到`top`的`Sketch1`
2. 將四旁邊的頂板安裝孔profile選取並一路穿孔到底板



<img src="Screenshot 2022-03-14 150119.png" alt="Screenshot 2022-03-14 150119" style="width:45%;" /><img src="Screenshot 2022-03-14 150148.png" alt="Screenshot 2022-03-14 150148" style="width:45%;" /><img src="Screenshot 2022-03-14 150247.png" alt="Screenshot 2022-03-14 150247" style="width:45%;" />

1. 將Arduino UNO拖入當前檔案中
2. 在零件樹找到它，按滑鼠右鍵，點選`Rigid Group`，將整個UNO板變成一個group
3. 將UNO用hotkey `J` 組合到頂板上，==記得要保持3mm間距，實際用螺絲安裝時請記得加墊圈，否則電線腳會壓斷==

### 按入六角柱

<img src="Screenshot 2022-03-14 150401.png" alt="Screenshot 2022-03-14 150401" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 150504.png" alt="Screenshot 2022-03-14 150504" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 150528.png" alt="Screenshot 2022-03-14 150528" style="width:45%;" />



1. 將小黑點褪回最上層
2. 開一個新的component叫`double hex`
3. 確保小黑點在新開的component中
4. 將六角柱hex spacer M3x20拖入當前文件中(可以連續拖兩次或拖完一次後複製貼上)
5. 最後就可以用hotkey `J` 將兩個六角柱接上



<img src="Screenshot 2022-03-14 150654.png" alt="Screenshot 2022-03-14 150654" style="WIDTH:35%;" /><img src="Screenshot 2022-03-14 150810.png" alt="Screenshot 2022-03-14 150810" style="WIDTH:55%;" />

1. ==joint好後，將小黑點褪回最上層==
2. 將component `double hex`複製貼上四份
3. 之後就可以用hotkey `J` 組合到小車底盤上



<img src="Screenshot 2022-03-14 150846.png" alt="Screenshot 2022-03-14 150846" style="width:75%;" />

1. 最後，將頂板同樣用hotkey `J` 組合到其中一支六角柱上
2. 拖動一下現全的模型的零件，全部不能拖動就是正常了。

## Step 4: 安裝sensor、電池

###為底盤開孔

<img src="Screenshot 2022-03-14 151034.png" alt="Screenshot 2022-03-14 151034" style="width:33%;" /><img src="Screenshot 2022-03-14 151404.png" alt="Screenshot 2022-03-14 151404" style="width:33%;" />

上面為需要安裝在底盤的電池盒和對地下的跌落感測，接下來我們要為底盤加孔來放置sensor和電池。



<img src="Screenshot 2022-03-14 151616.png" alt="Screenshot 2022-03-14 151616" style="width:45%;" /><img src="Screenshot 2022-03-14 151830.png" alt="Screenshot 2022-03-14 151830" style="width:35%;" />

1. ==先將小黑點放到component `bottom `的旁邊==
2. 在小車底盤的表面開一個new sketch
3. 首先繪製對地面的跌落感測安裝孔
4. sensor會放在車的底部，所以只要開安裝孔就可以，但要另外加一個孔來穿電線，所以才會有另一個8x8mm的方形
5. ==上面10和18的尺寸是隨便定的，之後你需要修改，見最後一章==



<img src="Screenshot 2022-03-14 152029.png" alt="Screenshot 2022-03-14 152029" style="WIDTH:35%;" /><img src="Screenshot 2022-03-14 152105.png" alt="Screenshot 2022-03-14 152105" style="WIDTH:55%;" />

1. 之後就可以劃中心線，將sensor安裝孔鏡像到右邊，另外再劃上電池安裝的電池架
2. 之後點選剛劃的圓和方，為底盤開孔



### 插入和安裝底盤sensor和電池架

<img src="Screenshot 2022-03-14 152205.png" alt="Screenshot 2022-03-14 152205" style="width:70%;" />

1. 將兩個Line Sensor(拖兩次或者拖完一次後複製貼上)和電池架Battery stand 拖到當前畫面
2. 記得拖動後，在零件樹中，為這三個Components按滑鼠右鍵，各自做`Rigid Group`，否則一移動或joint後，line sensor就會散開



<img src="Screenshot 2022-03-14 152324.png" alt="Screenshot 2022-03-14 152324" style="WIDTH:45%;" /><img src="Screenshot 2022-03-14 152526.png" alt="Screenshot 2022-03-14 152526" style="WIDTH:45%;" />

1. 將line sensor用hotkey `J `組合到盤底，sensor PCB有45度角的為小車前方，==記得將sensor向下offset 3mm，實際安裝時也要用3mm墊圈將sensor墊高，否則一上緊螺絲，電線腳就會壓彎==
2. 安裝好兩邊跌落sensor後就可以安裝電池架

### 為頂板開孔和安裝sensor

<img src="Screenshot 2022-03-14 154808.png" alt="Screenshot 2022-03-14 154808" style="width:35%;" />

1. 頂板要安裝的sensor為上方的sensor，由於頂板上層已安裝Arduino UNO，所以sensor要安裝在頂板的下方



<img src="Screenshot 2022-03-14 154421.png" alt="Screenshot 2022-03-14 154421" style="width:45%;" /><img src="Screenshot 2022-03-15 174848.png" alt="Screenshot 2022-03-15 174848" style="zoom:45%;" />

1. 將小黑點按到component `top`的旁邊
2. 在頂板的底面開一個new sketch
3. 按照右圖的尺寸繪畫3個孔，之後穿孔，==尺寸是暫定的，到最後全機組合好後會按需要修改==



<img src="Screenshot 2022-03-14 155922.png" alt="Screenshot 2022-03-14 155922" style="width:45%;" /><img src="Screenshot 2022-03-14 160003.png" alt="Screenshot 2022-03-14 160003" style="width:45%;" />

1. 穿孔後，==將小黑點褪回最上層==
2. 將`IR Sensor(FC51)`拖到當前文件，可以拖三次或複製貼上，需要三隻sensor



<img src="Screenshot 2022-03-14 160629.png" alt="Screenshot 2022-03-14 160629" style="width:60%;" />

1. 將3隻FC51 sensor用hotkey `J` 組合到頂板的底層
2. sensor左右兩隻不是向正前方，左邊sensor指向右邊45度，右邊sensor指向左邊45度
3. sensor記得要offset 3mm距離，實際安裝時也要加3mm墊圈，否則電線腳會被壓彎

## Step 5: 製作前擋板和鏟

來到這一步，機械人已基本完成，有基本的功能，接下來最後一步要製作前方的檔板和鏟，第一個步驟是要先製作用以安裝前方檔板的支架。

###製作3D打印支架



<img src="Screenshot 2022-03-14 160850.png" alt="Screenshot 2022-03-14 160850" style="width:45%;" /><img src="Screenshot 2022-03-14 160940.png" alt="Screenshot 2022-03-14 160940" style="width:45%;" />

1. ==先將小黑點褪回最上一層==
2. 開一個新的component，名字叫`triangle`
3. 確保小黑點在新開的component旁，開一個new sketch，位置點選世界的YZ平面就可以



<img src="Screenshot 2022-03-14 161022.png" alt="Screenshot 2022-03-14 161022" style="width:45%;" /><img src="Screenshot 2022-03-14 161852.png" alt="Screenshot 2022-03-14 161852" style="width:45%;" />

<img src="Screenshot 2022-03-14 173501.png" alt="Screenshot 2022-03-14 173501" style="width:25%;" />

1. 投影頂板和底板的前端兩條線
2. 就可以跟著右圖的尺寸去定三角形支架
3. ***尺寸是暫定的，之後你可以跟據需要自行修改，例如我這個高30mm，已經有點擋到了上面偵測敵人的sensor，所以我後來改矮了變左成25mm***



<img src="Screenshot 2022-03-14 161945.png" alt="Screenshot 2022-03-14 161945" style="width:45%;" /><img src="Screenshot 2022-03-14 162037.png" alt="Screenshot 2022-03-14 162037" style="width:45%;" />

1. 之後就可以用hotkey `E` 擠出
2. 擠出厚度為`10mm`，今次我選用了`Symmetric`而非預設的`One Side`，原因是對稱的話比較好操作，你用原本的`One Side`也可以
3. 之後就可以到斜面開一個new sketch



<img src="Screenshot 2022-03-14 162124.png" alt="Screenshot 2022-03-14 162124" style="width:30%;" /><img src="Screenshot 2022-03-14 162150.png" alt="Screenshot 2022-03-14 162150" style="width:60%;" />

<img src="Screenshot 2022-03-14 162206.png" alt="Screenshot 2022-03-14 162206" style="width:30%;" /><img src="Screenshot 2022-03-14 162307.png" alt="Screenshot 2022-03-14 162307" style="width:30%;" /><img src="Screenshot 2022-03-14 162328.png" alt="Screenshot 2022-03-14 162328" style="width:30%;" />

1. 在斜面開一個孔用來安裝前方的鏟，孔徑用3mm就可以，因3D打印出來尺寸會小一點，開3mm孔用自攻3mm螺絲安裝就剛剛好
2. 開兩個孔就最好，但因位置有限，所以我只開了一個
3. 跟著上面的45度斜面也一樣，開一個new sketch再開兩個孔，用來安裝檔板



<img src="Screenshot 2022-03-14 165745.png" alt="Screenshot 2022-03-14 165745" style="width:35%;" /><img src="Screenshot 2022-03-14 165801.png" alt="Screenshot 2022-03-14 165801" style="width:55%;" />

1. 最後三角支架的底部也要開孔，用來安裝在底板上
2. ***如果你不跟我的尺寸，有修改過尺寸，記得三個面都開孔後，觀察一下幾個孔會否重疊了，否則安裝螺絲時螺絲會撞在一起***

### 安裝三角支架到底板

<img src="Screenshot 2022-03-14 165429.png" alt="Screenshot 2022-03-14 165429" style="width:45%;" /><img src="Screenshot 2022-03-14 165445.png" alt="Screenshot 2022-03-14 165445" style="width:45%;" />

1. ==將小黑點按到bottom旁邊==，我們要為底板開孔去安裝三角支架
2. 在底板表面開一個new sketch



<img src="Screenshot 2022-03-14 170011.png" alt="Screenshot 2022-03-14 170011" style="width:45%;" /><img src="Screenshot 2022-03-14 170259.png" alt="Screenshot 2022-03-14 170259" style="width:45%;" />

<img src="Screenshot 2022-03-14 170330.png" alt="Screenshot 2022-03-14 170330" style="width:45%;" />

1. 用hotkey `P` project投影三支架的底部到這個sketch當中
2. 劃兩條水平線作圖線，用midpoint約束穿過三角支架底的兩個孔
3. 在兩旁距離70mm處各開兩個圓
4. 將4個孔鑽孔底板



<img src="Screenshot 2022-03-14 170441.png" alt="Screenshot 2022-03-14 170441" style="width:45%;" /><img src="Screenshot 2022-03-14 170529.png" alt="Screenshot 2022-03-14 170529" style="width:45%;" />

1. ==將小黑點褪回最上層==
2. 將`triangle ` component 複製多一份
3. 就可以分別用hotkey `J` 組合到底板
4. <u>***如果你不按我的尺寸，或之後有所修改的話，請記得認真檢查一下三角支架有否撞到齒輪箱或電池架***</u>
5. <u>***安裝三角支架到底盤前，請先將馬達接線和測試一下是否運作正常，否則安裝後三角支架會阻礙將馬達拆出來接線和維修***</u>

### 繪製鏟和前擋板

<img src="Screenshot 2022-03-14 170847.png" alt="Screenshot 2022-03-14 170847" style="width:45%;" /><img src="Screenshot 2022-03-14 170916.png" alt="Screenshot 2022-03-14 170916" style="width:45%;" />

1. 確保小黑點褪回到最上層
2. 開一個new component，名叫`front plane`
3. 在三角支架20度的面(左邊或右邊都可以)開一個new sketch



<img src="Screenshot 2022-03-14 170944.png" alt="Screenshot 2022-03-14 170944" style="width:45%;" /><img src="Screenshot 2022-03-14 171601.png" alt="Screenshot 2022-03-14 171601" style="width:45%;" />

<img src="Screenshot 2022-03-14 171617.png" alt="Screenshot 2022-03-14 171617" style="width:45%;" />

1. 用hotkey `P` project投影兩邊的三角支架
2. 繪劃一條中心作圖線，劃一個長方形，長方形的頂邊要穿過20度長方到的頂邊
3. 之後就可以擠出厚度`thickness`



<img src="Screenshot 2022-03-14 171708.png" alt="Screenshot 2022-03-14 171708" style="width:45%;" /><img src="Screenshot 2022-03-14 171823.png" alt="Screenshot 2022-03-14 171823" style="width:45%;" />



<img src="Screenshot 2022-03-14 172106.png" alt="Screenshot 2022-03-14 172106" style="width:45%;" />

1. 之後45度擋板也一樣，先在隨便一邊的45度斜面開一個new sketch
2. 將兩邊45度的斜面和***前鏟板的頂邊***投影到這個sketch中
3. 之後就可以劃一個長旁形再擠出



<img src="Screenshot 2022-03-14 172642.png" alt="Screenshot 2022-03-14 172642" style="zoom:70%;" />

1. ***完成後觀察一下，在側視圖看，兩塊板應該是剛剛好沒有相撞的***
2. 之後就可以將鏟和擋板用hotkey J 組合到三角支架上
3. (我沒有cap圖展示joint的過程，請自行完成，因鏟和支架都是同一個component的兩個body，所以拖動時兩塊板會一起拖動是正常的)

### 為前擋板開孔，讓偵敵紅外線sensor能穿過

<img src="Screenshot 2022-03-14 172759.png" alt="Screenshot 2022-03-14 172759" style="width:60%;" /><img src="Screenshot 2022-03-14 172914.png" alt="Screenshot 2022-03-14 172914" style="width:30%;" />

1. 確保將小黑點選到component `front plane`
2. 點選在其中一邊45度的sensor的平面，開一個new sketch
3. 在sensor的LED和接收器的兩個圓中間為圓心，劃一個直徑15mm的圓



<img src="Screenshot 2022-03-14 173008.png" alt="Screenshot 2022-03-14 173008" style="width:45%;" />

1. 將這個圓擠出一個`new body`，距離隨意，只要長過底盤就可以
2. ***但記得要設定`taper angle`，這個角度會在擠出時使擠出的面積越來越大，至於為何是5度，就要視乎你用的sensor的發散角，我這次是跟據經驗設定的，如果你用其他的sensor，就要看看datasheet***



<img src="Screenshot 2022-03-14 173101.png" alt="Screenshot 2022-03-14 173101" style="width:45%;" /><img src="Screenshot 2022-03-14 173137.png" alt="Screenshot 2022-03-14 173137" style="width:45%;" />

<img src="Screenshot 2022-03-14 173247.png" alt="Screenshot 2022-03-14 173247" style="width:45%;" />

1. 擠出後，繼續確保小黑點在`front plane`旁
2. 在45度斜面的表面開一個new sketch
3. 按hotkey `S`，搜尋`intersect`，顧名思義就是相交的意思，這個指令可以將另一個body相交到這個sketch plane的輪廓勾出來



<img src="Screenshot 2022-03-14 173840.png" alt="Screenshot 2022-03-14 173840" style="width:45%;" /><img src="Screenshot 2022-03-14 173902.png" alt="Screenshot 2022-03-14 173902" style="width:45%;" />

1. 跟據這個橢圓形的中心點，就可以知道sensor射出來，該在那開槽才不會阻礙紅外線發射接收
2. 劃一個對稱的長方形，==尺寸是暫定的，你可按需要修改==
3. 之後就可以將其開槽



<img src="Screenshot 2022-03-14 174220-16474953744691.png" alt="Screenshot 2022-03-14 174220" style="width:80%;" />

 <font size="+2" style="color:red">恭喜，大致已完成設計!!!!!!看看你的設計是否和我的設計差不多，會否有地方有error或會相撞</font>

## Step 6: 微調

<img src="Screenshot 2022-03-14 174259.png" alt="Screenshot 2022-03-14 174259" style="width:45%;" /><img src="Screenshot 2022-03-14 174326.png" alt="Screenshot 2022-03-14 174326" style="width:45%;" />

1. ==將小黑點褪回最上層==
2. 搜尋`Section Analysis`
3. 選取世界座標的YZ平面(或你機械人的側面平面)
4. 將機械人割開一半方便觀察



<img src="Screenshot 2022-03-14 174454.png" alt="Screenshot 2022-03-14 174454" style="width:45%;" /><img src="Screenshot 2022-03-14 174410.png" alt="Screenshot 2022-03-14 174410" style="width:45%;" />

1. 為方便觀察，請將視覺投影轉成`Orthographic`(在右上角的指向圖標上，按滑鼠右鍵，就能設定)
2. 轉到側視圖
3. 從側視圖就可以清楚觀察到，前擋板好像有點擋住了紅外線射出的路徑



<img src="Screenshot 2022-03-14 174604.png" alt="Screenshot 2022-03-14 174604" style="width:45%;" /><img src="Screenshot 2022-03-14 174649.png" alt="Screenshot 2022-03-14 174649" style="width:45%;" />

1. 再轉到45度角觀察開槽的左右是否足夠
2. 按一按45度sensor的平面，按下方第二個鍵名叫`look at`，就能對正這個點選的平面
3. 跟據目測，槽的長度似乎足夠



<img src="Screenshot 2022-03-14 174830.png" alt="Screenshot 2022-03-14 174830" style="width:45%;" /><img src="Screenshot 2022-03-14 175839.png" alt="Screenshot 2022-03-14 175839" style="width:45%;" />

<img src="Screenshot 2022-03-14 175813.png" alt="Screenshot 2022-03-14 175813" style="width:45%;" />

1. 在零件樹或時間軸上，找到前擋板原來的sketch, 將它修改一下，上面距離15mm, 下面距離7mm
2. 重新再觀察一下，今次似乎可以了

##Step 7: 功課

<img src="Screenshot 2022-03-14 181113.png" alt="Screenshot 2022-03-14 181113" style="width:60%;" />

現在這個模型是有問題的:

1. Arduino安裝問題: 如果安裝motor shield和sensor shield後，會撞到前擋板, 要將Arduino移後
2. 20度擋板: 可以增長一點，盡量貼地才能發揮鏟的效果，之後亦要貼上薄一點的金屬或膠片來做第三層鏟
3. 對地sensor明顯還有移前空間: 對地sensor距離牛眼輪越前越好，可以早一點知道前方是場外而停車
4. 對敵sensor: 可以移前一點，那麼前擋板就不用開槽開這麼大，但要注意移動後前擋板會否有阻礙
5. 電池開關無處安放: 下圖是電池開關的尺寸，我沒有設計其位置，你需要想辦法安裝，由於鋰電池本身電線較短，開關不能安裝在頂層上，要用3D打印或另外加一塊與地面垂直的膠板去安裝
   <img src="Screenshot 2022-03-14 154059.png" alt="Screenshot 2022-03-14 154059" style="zoom:60%;" />




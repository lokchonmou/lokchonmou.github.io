# 2.4 Brass Canon

本節要繪製的，是我們傳統的大炮, 雖然由於課時，機器和課程編排所限，未能像以往般用車床銑床製作此大炮。但教大家繪製，不但承傳這種情懷，同學們之後也能運用cnc機器去製作。

<img src="1111.gif" alt="1111.gif" style="zoom:33%;"/>

**[brass cannon Drawing v52.pdf](brass_cannon_Drawing_v52.pdf)**

<iframe width=50% height="500" src="https://www.youtube.com/embed/Udv2dhx0yJI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Step 1

1. 首先在首頁開一個new component，名字叫cannon body
2. 記得activate這個component, 黑點在旁邊
3. 開一個new sketch. 跟據圖則前半段繪製三個長形和圓形
4. 用's'搜尋"change  parameter", 開一個新的variable叫"stepSize", 內容為1.5mm，放便之後修改
5. 用"s"搜尋"revolve"，選擇上半part即可, 用x軸旋轉360度

❗**<u>fusion360等特徵編輯軟件並不擅長處理2d圖則, 如果同一個2d圖則內容太多, 關係式太多, 因尺寸和關係互相依賴, 會令電腦極慢甚至死機</u>**

💡*你也可以不完全跟著我的步驟, 一次過可以劃多一點, 但記得不要太多*

<img src="Untitled 0.png" alt="Untitled 0.png" style="zoom:27%;" /> <img src="Untitled%201.png" alt="Untitled%201.png" style="zoom:30%;" /> 

<img src="Untitled%202.png" alt="Untitled%202.png" style="zoom:75%;" /> <img src="Untitled%203.png" alt="Untitled%203.png" style="zoom:45%;" />

1. 下一步，在cannon body這個component中，開另一個新的sketch
2. 用"p" 投影之前的body在這個sketch中，跟著圖則的尺寸繼續繪製
3. 用"revolve"，選擇x軸旋轉360度

<img src="Untitled%201.png" alt="Untitled%201.png" style="zoom:50%;" />
<img src="Untitled%204.png" alt="Untitled%204.png" style="zoom:33%;" /> <img src="Untitled%205.png" alt="Untitled%205.png" style="zoom:33%;" />

用"s"搜尋"change parameter"，開一個新的variable叫"cannonBodyHole"，內容為8mm

<img src="Untitled%206.png" alt="Untitled%206.png" style="zoom:33%;" /> <img src="Untitled%207.png" alt="Untitled%207.png" style="zoom:33%;" />
<img src="Untitled%208.png" alt="Untitled%208.png" style="zoom:33%;" /> <img src="Untitled%209.png" alt="Untitled%209.png" style="zoom:33%;" />

1. 繼續跟著pdf的尺寸繪製
2. 弧可以用"3 point arc"來繪製, 只需要指定首尾兩點, 再用"d"來指定半徑即可

![Untitled%206.png](Untitled%206.png)

![Untitled%2010.png](Untitled%2010.png)

![Untitled%2011.png](Untitled%2011.png)

## Step 2

1. 開一個新的component叫"pin"，記得先activate
2. 開一個new sketch, 用"p"投影之前大炮身的圓
(記得要投影原始的sketch, 投影body的話有機會會沒有了中心點)
3. 先開一個新的parameter，叫"baseWidth"，內容為21mm
4. 用"e"擠出. 今次選擇對稱而非單邊，長度為baseWidth

![Untitled%2012.png](Untitled%2012.png)

![Untitled%2013.png](Untitled%2013.png)

![Untitled%2014.png](Untitled%2014.png)

![Untitled%2015.png](Untitled%2015.png)

1. 在圓形的一邊開一個new sketch, 畫一個圓形
2. 開一個新的parameter，叫"braceHole"，內容為6mm，長度跟據圖則為8.5mm
3. 用mirror鏡像擠出的feature, 鏡像平面為世界xz平面
4. 最後用revoling joint, 將pin和cannon body組合

![Untitled%2013.png](Untitled%2013.png)

![Untitled%2016.png](Untitled%2016.png)

![Untitled%2017.png](Untitled%2017.png)

## Step 3

1. 開一個新的component叫"brace"
2. 確保黑點在旁已經activate
3. 在pin的最邊開一個新的sketch
4. 投影圓形並跟據圖則繪劃整個固定架

![Untitled%2018.png](Untitled%2018.png)

![Untitled%2019.png](Untitled%2019.png)

![Untitled%2020.png](Untitled%2020.png)

1. 擠出8mm
2. 用"f"來修圓角
3. 在底部跟據圖則，劃一個point, 距離邊位20mm
4. 用"s"搜尋"hole", 跟據圖則選擇hole type為非沉孔, hole tap為有螺紋, 其他選項如圖所示
5. 孔的深度和直徑，fusion360也是十分清楚地標明的, 選擇深8mm, 寬為M4螺絲

![Untitled%2021.png](Untitled%2021.png)

![Untitled%2022.png](Untitled%2022.png)

![Untitled%2023.png](Untitled%2023.png)

1. 之後就可以將小黑點褪回最上層, 複製貼上多一份brace
2. 用"j"將其joint在pin上, 今次用revolving joint
3. joint的對齊口是對齊內部，所以joint後會有0.5mm突了出來

![Untitled%2024.png](Untitled%2024.png)

![Untitled%2025.png](Untitled%2025.png)

## Step 4

1. 下一部是繪製炮的底座
2. 將小黑點褪回最上層, 開一個new component叫"base"
3. 在xy平面或者component "brace"的底部添加一個new sketch
4. 如圖則所示繪製, 圓角可以暫時不用劃, 但因為中間R4.5的圓與上下offseet 8mm的線形成不到單一直線, 不能用圓角功能, 故些要在2d sketch中用TTR去完成

![Untitled%2026.png](Untitled%2026.png)

![Untitled%2027.png](Untitled%2027.png)

1. 跟著依次擠出和修圓便完成
2. 完成後用"j"將底座和其中一個brace rigid joint

![cannon2.gif](cannon2.gif)

## Step 5

1. 將小黑點褪回最上層, 開一個new component叫"spinder"
2. 在xy平面或者component "base"的底部添加一個new sketch
3. 投影兩個4mm孔, 並繪製一個對稱的40mmx7.8mm方形如pdf所示
4. 對稱擠出7.8mm(用對稱的話之後在旁邊劃圓形會容易點)
5. 之後就可以繪製和擠出12.5mm和7.8mm的圓

![Untitled%2028.png](Untitled%2028.png)

![Untitled%2029.png](Untitled%2029.png)

![Untitled%2030.png](Untitled%2030.png)

![Untitled%2031.png](Untitled%2031.png)

![Untitled%2032.png](Untitled%2032.png)

1. 在最外的平面開一個new sketch, 只需要投影或者繪製一個point就可以
2. 利用"hole"功能，增加一個沉孔螺紋的鑽孔, 尺寸如pdf所示
3. 最後將幾個擠出和鑽孔features用mirror鏡像, 鏡像面為世界xz平面
4. 完成後就可以用rigid joint組合到之前劃的零件上

![Untitled%2028.png](Untitled%2028.png)

![Untitled%2033.png](Untitled%2033.png)

![Untitled%2034.png](Untitled%2034.png)

![Untitled%2035.png](Untitled%2035.png)

![Untitled%2036.png](Untitled%2036.png)

## Step 6

1. 將小黑點褪回最上層, 開一個new component叫"wheel"
2. 確保已activate這個wheel的component
3. 開一個new sketch, 並投影component spinder的中點
4. 在中點上繪劃8mm, 13mm, 54mm和64mm四個圓(不要直接投影spinder的圓, 它的尺寸是7.8mm而不是8mm)

![Untitled%2037.png](Untitled%2037.png)

![Untitled%2038.png](Untitled%2038.png)

1. 如pdf圖則所示，擠出8mm和6mm
2. 擠出時選擇對稱擠出會比較方便操作

![Untitled%2039.png](Untitled%2039.png)

![Untitled%2040.png](Untitled%2040.png)

1. 如pdf所示在輪上繪製單一份的挖孔
2. 擠出之後就可以用"Circular Pattern"去做旋轉陣列

![Untitled%2041.png](Untitled%2041.png)

![Untitled%2042.png](Untitled%2042.png)

1. 最後一個步驟是將輪子複製貼上，並用joint組合在一起

![1111%201.gif](1111%201.gif)

完成!!!!!
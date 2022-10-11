# 3. Artillery game

> 炮術遊戲（Artillery）是早期回合制策略電子遊戲的代名詞，坦克互相射擊，考慮彈道計算、地形、彈藥和風向等問題。

[TOC]

這類型的遊戲最早在1970年代中以demo遊戲出現，名叫Artillery(抱歉太舊的關係，我在維基也找不到相片)，後來隨著顯卡的提升，到1980年代在Apple II中推出過Super Artillery和Artillery Simulator。

![img](Artillery_apple.png)

後來再到IBM電腦年代，推出過名叫Scorched Earth的遊戲。這款遊戲除了之前炮彈互射的遊戲功能外，當炮彈打到地後，也會留下一個洞，這就需要電腦的效能支援。

![img](Scorched_earth.png)

按著在1995年由Team17推出的Worms(蟲蟲大戰)，就真正是經典遊戲。遊戲同樣是探用回合制，但今次蟲蟲是可以行走的，而且可以好似蜘蛛俠一樣盪來盪去(我自己玩過的版本就是，不知道1995年的初版是否可以)，而且有不同的武器可以選擇，有些是威力強大到會留下大洞的炮彈，有些是手槍和地雷等等。後來這遊戲一直都有推出不同的版本，到今天你也可以在各大遊戲平台買得到這款遊戲，玩法也差不多。(不過我記得我玩過的版本並非回合制的，而是畫面分半一同操作的，兩個人在電腦面前按著同一個鍵盤，互相找出對方)

<img src="maxresdefault.jpg" alt="Worms (1995) [MS-DOS] - YouTube" style="width: 50%;" />

順帶一提，千禧年初，3A大作已經十分流行，當年網路剛興起，網站流行用flash制作動畫效果，同時也興起一堆體積不大的小遊戲，例如比加超打排球，小朋友落樓梯，小朋友齊打架等等，而其中一款中外同樣經典的，就是Fleabag Vs. Mutt，我們一般會叫它貓狗大戰。玩法就跟80年的的Artillery Simulator一模一樣，都是採用回合制，設定投擲力度和角度，配合環境風速，互相擲罐子或骨頭。遊戲雖然簡單，但因遊戲體積小，容易得到容易上手，當年是跟朋友殺時間的好幫手。(我不也肯定下圖是原版flash遊戲，網路上也找不到原版的flash檔)

<img src="1.jpeg" alt="貓狗大戰- 遊戲下載| TapTap" style="width:50%;" />

今章要制作的，是類似上面的Artillery Simulator和貓狗大戰的回合制遊戲。

## 3.0 本章重點

1. 向量(vector)(求大小與方向)
2. 加速度與拋物線
3. 用歐拉方法求積分解

## 3.1 加速度與拋物線

### 3.1.1 自由落體

> 傳說1590年伽利略曾在義大利比薩斜塔上做自由落體實驗，將兩個重量不同的球體從相同的高度同時扔下，結果兩個鉛球同時落地，伽利略在比薩斜塔做自由落體實驗的故事，記載在他的學生維維亞尼在1654年寫的《伽利略生平的歷史故事》（1717年出版）一書中，但伽利略、比薩大學和同時代的其他人都沒有關於這次實驗的的記載。對於伽利略是否在比薩斜塔做過自由落體實驗，歷史上一直存在著支持和反對兩種不同的看法。
>
> 1971年，阿波羅15號太空人在月球上同時丟下獵鷹羽毛與鐵鎚，證明伽利略理論正確。

![img](250px-Leaning_Tower_of_Pisa.jpg)



在真空(無空氣阻力)的狀況下，一個物體自由落體的距離，受著重力影響，**落下距離與時間的平方成正比**。舉例說，在下圖是用攝影機拍攝跨度為半秒的相片(半秒20幀)，在首0.05秒落下的距離為1個單位(約12mm)，在0.1秒時，其落下距離為4個單位，在0.15秒時距離為9個單位，如此類推。

![img](250px-Falling_ball.jpg)

### 3.1.2 拋物運動

由於受到重力的影響，物體在被拋出後，垂直(向下)的速度會不停加速，而水平的速度則不受影響，型成的曲線就叫拋物線(Parabola)。拋物線(Parabola)在數學上是一條二次方曲線。

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/ParabolicWaterTrajectory.jpg/250px-ParabolicWaterTrajectory.jpg)

等等等，不要走，我知道你快要頭腦爆炸了!!!!!!

這裡不想帶出更多的數學和物理，令事情更複雜，你唯一需要知道的是：

1. 重力影響會令落下距離與時間的平方成正比，簡言之，**落下的速度與時間成正比**，地球自由落體加速度大約是10$m/s^{2}$，即在物體自由落體時，1秒後的速度大約是10$m/s$，2秒後的速度大約是20$m/s$，3秒後的速度大約是30$m/s$，如此類推。
2. 計算拋物線時，水平和垂直的距離和速度是可以分開計算的，互相獨立；
	![img](Compound_Motion.gif)<img src="u3l2b3.gif" alt="img" style="zoom:100%;" />

## 3.2 建立兩個玩家

```python
player1Height = 0
player2Height = 0

tankSize = 20 #the size of rect of the tanks

def setup():
    global player1Height, player2Height
    
    size(800, 600)
    
    player1Height = random(height*0.2, height*0.8)
    player2Height = height - player1Height

    
def draw():
    background(30)
    
    # draw the tanks
    rectMode(CENTER)
    noStroke()  #沒有框線
    fill(255, 0, 0)
    rect(100, player1Height, tankSize, tankSize)
    fill(0, 0, 255)
    rect(width - 100, player2Height, tankSize, tankSize)
    
    # draw the ground
    rectMode(CORNERS)  #use corner to corner mode
    noStroke()  #沒有框線
    fill(0, 255, 0)
    rect(0, player1Height + tankSize/2, width/2, height)
    rect(width/2, player2Height + tankSize/2, width, height)
```

<img src="image-20221011104813227.png" alt="image-20221011104813227" style="zoom:50%;" />



```python
player1Height = random(height*0.2, height*0.8)
player2Height = height - player1Height
```

在`setup()`中，加入這兩句來初始化兩個玩家一開始的高度。由於想加一點遊戲性，盡量兩個玩家是一高一低。

## 3.3 繪畫控制的投射速度線

```python
player1Height = 0
player2Height = 0

Round = 0 			#player1 or player2
ballPos = PVector() # position of cannonball
ballVec = PVector() # velocity of cannonball

tankSize = 20 #the size of rect of the tanks

def setup():
    global player1Height, player2Height, Round, ballPos, ballVec
    
    size(800, 600)
    
    player1Height = random(height*0.2, height*0.8)
    player2Height = height - player1Height
    
    Round = 1 #一開始為player1回合
    ballPos = PVector(100, player1Height) #一開始設定為player1的位置
    ballVec = PVector(2.5, 0) #一開始指向水平右方,速度為2.5

    
def draw():
    global ballPos, ballVec, Round
    
    background(30)
    
    # draw the velocity arrow
    stroke(255, 255, 0) #框線顏色
    strokeWeight(3)  #框線粗度度
    line(100, player1Height, 100 + ballVec.x * 50, player1Height + ballVec.y *50)    
    
    # draw the tanks
    rectMode(CENTER)
    noStroke()  #沒有框線
    fill(255, 0, 0)
    rect(100, player1Height, tankSize, tankSize)
    fill(0, 0, 255)
    rect(width - 100, player2Height, tankSize, tankSize)
    
    # draw the ground
    rectMode(CORNERS)  #use corner to corner mode
    noStroke()  #沒有框線
    fill(0, 255, 0)
    rect(0, player1Height + tankSize/2, width/2, height)
    rect(width/2, player2Height + tankSize/2, width, height)
```

<img src="image-20221011112919681.png" alt="image-20221011112919681" style="zoom:50%;" />



```python
Round = 0 #player1 or player2
ballPos = PVector() # position of cannonball
ballVec = PVector() # velocity of cannonball
```

在宣告區，開設一個變數叫`Round`紀錄現在這個回合是player1還是player2(記得`Round`要大寫, `round`是processing.py原本的指令，是用來使四捨五入的)。另外開設兩個向量變數，用來紀錄炮彈的位置和速度。



```python
Round = 1 #一開始為player1回合
ballPos = PVector(100, player1Height) #一開始設定為player1的位置
ballVec = PVector(2.5, 0) #一開始指向水平右方,速度為2.5
```

同樣地，在`setup()`區中，初始化這三個數的值，方便之後可以一鍵重啟這個遊戲。`ballPos`的值設定在player1相同的位置。而`ballVec`的初始值則設成$(5, 0)$。

## 3.4 控制投射速度線

```python
player1Height = 0
player2Height = 0

Round = 0 #player1 or player2
ballPos = PVector() # position of cannonball
ballVec = PVector() # velocity of cannonball

tankSize = 20 #the size of rect of the tanks

def setup():
    global player1Height, player2Height, Round, ballPos, ballVec
    
    size(800, 600)
    
    player1Height = random(height*0.2, height*0.8)
    player2Height = height - player1Height
    
    Round = 1 #一開始為player1回合
    ballPos = PVector(100, player1Height) #一開始設定為player1的位置
    ballVec = PVector(2.5, 0) #一開始指向水平右方,速度為2.5

    
def draw():
    global ballPos, ballVec, Round
    
    background(30)
    
    # draw the velocity arrow
    stroke(255, 255, 0) #框線顏色
    strokeWeight(3)  #框線粗度度
    line(100, player1Height, 100 + ballVec.x * 10, player1Height + ballVec.y * 10)    
    
    # draw the tanks
    rectMode(CENTER)
    noStroke()  #沒有框線
    fill(255, 0, 0)
    rect(100, player1Height, tankSize, tankSize)
    fill(0, 0, 255)
    rect(width - 100, player2Height, tankSize, tankSize)
    
    # draw the ground
    rectMode(CORNERS)  #use corner to corner mode
    noStroke()  #沒有框線
    fill(0, 255, 0)
    rect(0, player1Height + tankSize/2, width/2, height)
    rect(width/2, player2Height + tankSize/2, width, height)
    
def keyPressed():
    global ballVec
    if Round == 1:
        if key == 'W' or key == 'w':
            ballVec = ballVec.mult(1.1)
            ballVec.limit(5)
        if key == 'S' or key == 's':
            ballVec = ballVec.mult(0.9)
        if key == 'A' or key == 'a':
            ballVec = ballVec.rotate(radians(-5))
        if key == 'D' or key == 'd':
            ballVec = ballVec.rotate(radians(5))
```

<img src="control line.gif" alt="control line" style="zoom:50%;" />

```python
def keyPressed():
    global ballVec
    if Round == 1:
        if key == 'W' or key == 'w':
            ballVec = ballVec.mult(1.1)
            ballVec.limit(5)
        if key == 'S' or key == 's':
            ballVec = ballVec.mult(0.9)
        if key == 'A' or key == 'a':
            ballVec = ballVec.rotate(radians(-5))
        if key == 'D' or key == 'd':
            ballVec = ballVec.rotate(radians(5))
```

在`setup()`和`draw()`加入第三個內置的函數叫做`keyPressed()`。當`Round == 1`，即現在的玩家時player1時，按下`w`和`s`鍵，則是控制速度向量的大小，利用`PVector`內置的乘法，就可以將向量乘大或者乘小；當按下`a`或者`d`時鍵，則控制其方向的變化，同樣地，PVector內置了功能，可以將向量旋轉，不用自己做數學運算。值得一提是，processing.py所有的角度，預設都是radians(弧度)的，要用指令`radians()`將輸入的角度轉換成弧度。**<u>有關甚麼是弧度可以參考[這裡](https://www.mathsisfun.com/geometry/radians.html)，而有關甚麼是向量乘法可以參考[這裡](https://mathinsight.org/vector_introduction#scalarmultiplication)，最後向量旋轉則較為複雜，可以參考[這裡](https://matthew-brett.github.io/teaching/rotation_2d.html)。</u>**

<div style="text-align: center;"><img src="https://processing.org/133e7f3a323ec67b6f3fe3f7393ba7a9/degrees.svg" alt="img" style="width:50%;">
<br  style="text-align: center;">processing的旋轉角度跟數學不同，是順時針而非逆時針的</br>
</div>

##3.5 嘗試直線發炮

```python
player1Height = 0
player2Height = 0

Round = 0 #player1 or player2
ballPos = PVector() # position of cannonball
ballVec = PVector() # velocity of cannonball

tankSize = 20 #the size of rect of the tanks

trigger = False

def setup():
    global player1Height, player2Height, Round, ballPos, ballVec, trigger
    
    size(800, 600)
    
    player1Height = random(height*0.2, height*0.8)
    player2Height = height - player1Height
    
    Round = 1 #一開始為player1回合
    ballPos = PVector(100, player1Height) #一開始設定為player1的位置
    ballVec = PVector(2.5, 0) #一開始指向水平右方,速度為2.5

    trigger = False
    
def draw():
    global ballPos, ballVec
    
    background(30)
    
    # draw the velocity arrow
    stroke(255, 255, 0) #框線顏色
    strokeWeight(3)  #框線粗度度
    line(100, player1Height, 100 + ballVec.x * 10, player1Height + ballVec.y * 10)    
    
    # draw the tanks
    rectMode(CENTER)
    noStroke()  #沒有框線
    fill(255, 0, 0)
    rect(100, player1Height, tankSize, tankSize)
    fill(0, 0, 255)
    rect(width - 100, player2Height, tankSize, tankSize)
    
    # draw the cannonball
    if trigger:
        # update the cannonball
        ballPos = ballPos.add(ballVec)
        
        # draw the cannonball
        noStroke() #無框線
        fill(127)  #灰色
        ellipse(ballPos.x, ballPos.y, 20, 20)
    
    # draw the ground
    rectMode(CORNERS)  #use corner to corner mode
    noStroke()  #沒有框線
    fill(0, 255, 0)
    rect(0, player1Height + tankSize/2, width/2, height)
    rect(width/2, player2Height + tankSize/2, width, height)
    
def keyPressed():
    global ballVec, trigger
    if Round == 1:
        if key == 'W' or key == 'w':
            ballVec = ballVec.mult(1.1)
            ballVec.limit(5)
        if key == 'S' or key == 's':
            ballVec = ballVec.mult(0.9)
        if key == 'A' or key == 'a':
            ballVec = ballVec.rotate(radians(-5))
        if key == 'D' or key == 'd':
            ballVec = ballVec.rotate(radians(5))
        
        if key == ' ':
            trigger = not trigger
        if key == 'R' or key == 'r':
            setup()
```

<img src="control line 2.gif" alt="control line 2" style="zoom:50%;" />



```python
trigger = False
```

在宣告區加多一個變數名為`trigger`，用來在確認航道時發射炮彈的。**記得在setup()區中也需要初始化一次，方便之後restart遊戲。**



```python
# draw the cannonball
if trigger:
    # update the cannonball
    ballPos = ballPos.add(ballVec)

    # draw the cannonball
    noStroke() #無框線
    fill(127)  #灰色
    ellipse(ballPos.x, ballPos.y, 20, 20)
```

在`draw()`中，加入，如果`trigger`是`True`的話(下面的`keyPressed()`函數控制)，即準備好要發射；跟之前彈珠一樣，每次`draw()`更新時，都將`ballVec`這個向量，累加到`ballPos`這個向量中，就會見到炮彈向著直線發射。



```python
if key == ' ':
	trigger = not trigger
if key == 'R' or key == 'r':
	setup()
```

在最下的`keyPressed()`函數中，加多兩個鍵盤按鍵，一個是`空白鍵`，用來發射；另一個跟之前一樣，用`r`鍵用來重設遊戲。



## 3.5 加入重力(加速度)

```python
player1Height = 0
player2Height = 0

Round = 0 #player1 or player2
ballPos = PVector() # position of cannonball
ballVec = PVector() # velocity of cannonball
ballAccel = PVector(0, 0.1) # acceleration of cannonball
                          #由於processing.py的y軸是向下的, 所以不需要轉成負數

tankSize = 20 #the size of rect of the tanks

trigger = False

def setup():
    global player1Height, player2Height, Round, ballPos, ballVec, trigger
    
    size(800, 600)
    
    player1Height = random(height*0.2, height*0.8)
    player2Height = height - player1Height
    
    Round = 1 #一開始為player1回合
    ballPos = PVector(100, player1Height) #一開始設定為player1的位置
    ballVec = PVector(2.5, 0) #一開始指向水平右方,速度為2.5

    trigger = False
    
def draw():
    global ballPos, ballVec
    
    background(30)
    
    # draw the velocity arrow
    if not trigger:
        stroke(255, 255, 0) #框線顏色
        strokeWeight(3)  #框線粗度度
        line(100, player1Height, 100 + ballVec.x * 10, player1Height + ballVec.y * 10)    
    
    # draw the tanks
    rectMode(CENTER)
    noStroke()  #沒有框線
    fill(255, 0, 0)
    rect(100, player1Height, tankSize, tankSize)
    fill(0, 0, 255)
    rect(width - 100, player2Height, tankSize, tankSize)
    
    # draw the cannonball
    if trigger:
        # update the cannonball
        ballVec = ballVec.add(ballAccel)
        ballPos = ballPos.add(ballVec)
        
        # draw the cannonball
        noStroke() #無框線
        fill(127)  #灰色
        ellipse(ballPos.x, ballPos.y, 20, 20)
    
    # draw the ground
    rectMode(CORNERS)  #use corner to corner mode
    noStroke()  #沒有框線
    fill(0, 255, 0)
    rect(0, player1Height + tankSize/2, width/2, height)
    rect(width/2, player2Height + tankSize/2, width, height)
    
def keyPressed():
    global ballVec, trigger
    if Round == 1 and not trigger:
        if key == 'W' or key == 'w':
            ballVec = ballVec.mult(1.1)
            ballVec.limit(5)
        if key == 'S' or key == 's':
            ballVec = ballVec.mult(0.9)
        if key == 'A' or key == 'a':
            ballVec = ballVec.rotate(radians(-5))
        if key == 'D' or key == 'd':
            ballVec = ballVec.rotate(radians(5))
        
        if key == ' ':
            trigger = not trigger
        if key == 'R' or key == 'r':
            setup()
```

<img src="control line 3.gif" alt="control line 3" style="zoom:50%;" />



```python
ballAccel = PVector(0, 0.1) # acceleration of cannonball
                          #由於processing.py的y軸是向下的, 所以不需要轉成負數
```

在宣告區中，加入球的加速度，今次不用在setup()中再初始化，因加速度是保持不變的。由於processing.py的y軸是向下的，所以不需要像物理一樣，將加速度設成負數。



```python
# draw the velocity arrow
if not trigger:
    stroke(255, 255, 0) #框線顏色
    strokeWeight(3)  #框線粗度度
    line(100, player1Height, 100 + ballVec.x * 10, player1Height + ballVec.y * 10)    
```

在`draw()`中，將原本繪畫速度箭頭的位置，加入發射後就會消失，否則一改變速度向量，你就會見到速度箭頭會跟著向下，會有點奇怪。

```python
def keyPressed():
    global ballVec, trigger
    if Round == 1 and not trigger:
        if key == 'W' or key == 'w':
            ballVec = ballVec.mult(1.1)
            ballVec.limit(5)
        if key == 'S' or key == 's':
            ballVec = ballVec.mult(0.9)
        if key == 'A' or key == 'a':
            ballVec = ballVec.rotate(radians(-5))
        if key == 'D' or key == 'd':
            ballVec = ballVec.rotate(radians(5))
        
        if key == ' ':
            trigger = not trigger
        if key == 'R' or key == 'r':
            setup()
```

同樣地，在`keyPressed()`函數中，原本的`if Round == 1:`，要額外加上`if Round == 1 and not trigger:`，否則在開炮後，也能"遙控"炮彈。



```python
# draw the cannonball
if trigger:
    # update the cannonball
    ballVec = ballVec.add(ballAccel)
    ballPos = ballPos.add(ballVec)

    # draw the cannonball
    noStroke() #無框線
    fill(127)  #灰色
    ellipse(ballPos.x, ballPos.y, 20, 20)
```

回到`draw()`中，要做到拋物線效果，其實很簡單，也很"物理"，加速度的意思是每一秒的速度也在累加，而球的位置則是初始位置再累加速度，所以只要在每次`draw()`更新時，將向量`ballAccel`加上向量`ballVec`，之後再將向量`ballVec`，加上向量`ballPos`，就可以
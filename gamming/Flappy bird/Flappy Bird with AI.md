# Flappy Bird with AI

[toc]

## 1.  用class將所有遊戲物件獨立包裝

首先第一步是要修改遊戲, 將`bird`用class包裝起來，可以一次過在同一遊戲畫面，有後多鳥在遊玩。

例如下面的遊戲，我就修改成雙打，可以用`spacebar`和`w`鍵，分別控制兩隻鳥。

`flappy_bird.pyde`:

``` python
from Stuffs import *

panSpeed = 5
birds = []
myPipes = []

def setup():
    global birds, myPipes
    size(800, 600)
    frameRate(60)
    birds = [Bird(), Bird()]
    myPipes = [Pipe()]

def draw():
    global birds, myPipes

    if (frameCount % 100 == 0):
        myPipes.append(Pipe())
    if (myPipes[0].x < -myPipes[0].w):
        myPipes.pop(0)

    background("#70C6D5")
    for bird in birds:
        bird.update()
        bird.display()
        print(bird.collide(myPipes[0]))

    for pipe in myPipes:
        pipe.update(panSpeed)
        pipe.display()

def keyPressed():
    if (key == ' '):
        birds[0].jump()
    if (key == 'W' or key == 'w'):
        birds[1].jump()
    if (key == 'R' or key == 'r'):
        setup()
```

`stuffs.py`:

```python
class Bird:
    def __init__(self):
        self.score = 0
        self.pipeCounter = 0
        self.birdPos = PVector(50, height/2)
        self.birdVec = PVector(0, 0)
        self.birdAcc = PVector(0, 0.3)
        self.isPass = False

    def update(self):
        self.birdVec.add(self.birdAcc)
        self.birdPos.add(self.birdVec)
        self.score += 1

    def jump(self):
        self.birdVec.y = -8

    def display(self):
        fill("#D5BB06")
        ellipse(self.birdPos.x, self.birdPos.y, 25, 25)

    def collide(self, _pipe):
        R = 25 / 2
        X = self.birdPos.x
        Y = self.birdPos.y
        if (X + R > _pipe.x and X - R < _pipe.x + _pipe.w):
            if (Y + R > _pipe.y or Y - R < _pipe.y - _pipe.gap):
                return True
        if (Y > height):
            return True
        return False

class Pipe:
    x = y = h = 0
    w = 80
    gap = 80

    def __init__(self):
        self.x = width + self.w
        self.y = random(100, height - 100)
        self.h = height

    def update(self, _panSpeed):
        self.x -= _panSpeed

    def display(self):
        fill(0, 204, 0)
        rect(self.x, self.y, self.w, self.h)
        rect(self.x, self.y - self.gap, self.w, -self.h)
```

## 2. 加入大腦和作簡單測試

從[Toy Neural Network](../toy_neural_Network/toy_Neural_Network.html)將`Matrix.py`和`nn.py`複製到這個項目中，像下圖，你的項目中應該有4個頁面。

<img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202024-03-31%20%E4%B8%8B%E5%8D%884.29.00.png" alt="螢幕截圖 2024-03-31 下午4.29.00" style="zoom:50%;" />

下面的程式，是參考The Coding Train的Neuroevolution Flappy Bird，我將其轉成了Processing for Python版本，你可以參考一下他的影片。

<iframe width="560" height="315" src="https://www.youtube.com/embed/c6y21FkaUqw?si=O5VLhc0Z354CIux2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`Stuffs.py`:

```python
from nn import NeuralNetwork

class Bird:
    def __init__(self):
        self.score = 0
        self.pipeCounter = 0
        self.birdPos = PVector(50, height/2)
        self.birdVec = PVector(0, 0)
        self.birdAcc = PVector(0, 0.3)
        self.isPass = False
        self.brain = NeuralNetwork(4, 4, 1)

    def think(self, pipes):
        inputs = [1.0, 0.5, 0.2, 0.3]
        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
 
    def update(self):
        self.birdVec.add(self.birdAcc)
        self.birdPos.add(self.birdVec)
        self.score += 1

    def jump(self):
        self.birdVec.y = -8

    def display(self):
        fill("#D5BB06")
        ellipse(self.birdPos.x, self.birdPos.y, 25, 25)

    def collide(self, _pipe):
        R = 25 / 2
        X = self.birdPos.x
        Y = self.birdPos.y
        if (X + R > _pipe.x and X - R < _pipe.x + _pipe.w):
            if (Y + R > _pipe.y or Y - R < _pipe.y - _pipe.gap):
                return True
        if (Y > height):
            return True
        return False

class Pipe:
    x = y = h = 0
    w = 80
    gap = 80

    def __init__(self):
        self.x = width + self.w
        self.y = random(100, height - 100)
        self.h = height

    def update(self, _panSpeed):
        self.x -= _panSpeed

    def display(self):
        fill(0, 204, 0)
        rect(self.x, self.y, self.w, self.h)
        rect(self.x, self.y - self.gap, self.w, -self.h)
```

`flappy_bird.pyde`:

```python
from Stuffs import *

panSpeed = 5
birds = []
myPipes = []

def setup():
    global birds, myPipes
    size(800, 600)
    frameRate(60)
    birds = [Bird(), Bird()]
    myPipes = [Pipe()]

def draw():
    global birds, myPipes

    if (frameCount % 100 == 0):
        myPipes.append(Pipe())
    if (myPipes[0].x < -myPipes[0].w):
        myPipes.pop(0)

    background("#70C6D5")
    for bird in birds:
        bird.think(myPipes)
        bird.update()
        bird.display()
        print(bird.collide(myPipes[0]))

    for pipe in myPipes:
        pipe.update(panSpeed)
        pipe.display()

def keyPressed():
    if (key == ' '):
        birds[0].jump()
    if (key == 'W' or key == 'w'):
        birds[1].jump()
    if (key == 'R' or key == 'r'):
        setup()
```

加入後，首先在`stuffs.py`中，一開始導入`from nn import NeuralNetwork`。

之後在`bird`class中，加入`self.brain = NeuralNetwork(4, 4, 1)`，做一個4個輸入, 4個隱藏層和1個輸出的神經網路。

之後，在`bird`中加入:

```python
    def think(self, pipes):
        inputs = [1.0, 0.5, 0.2, 0.3]
        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
```

首先要測試一下，`NeuralNetwork`的class是否真的能導入到這個program中，所以先固定開4個`inputs`給它，再在無訓練的情況下，用`predict()`產生`output`，只要`output`大於`0.5`就`jump()`。

最後，在主程式的`draw()`中，

```python
for bird in birds:
    bird.think(myPipes)
    bird.update()
    bird.display()
    print(bird.collide(myPipes[0]))
```

在所有`birds`中，加係`bird.think()`。運行後，兩隻鳥會隨機不停上升或不停下降。

## 3. 輸入有意義的`inputs`

`Stuffs.py`:

```python
from nn import NeuralNetwork

class Bird:
    def __init__(self):
        self.score = 0
        self.pipeCounter = 0
        self.birdPos = PVector(50, height/2)
        self.birdVec = PVector(0, 0)
        self.birdAcc = PVector(0, 0.3)
        self.brain = NeuralNetwork(4, 4, 1)

    def think(self, pipes):
        inputs = []
        
        inputs.append(map(self.birdPos.y, 0, height, 0, 1))
        if not (self.birdIsPass(pipes[0])):
            inputs.append(map(pipes[0].y, 0, height, 0 ,1))
            inputs.append(map((pipes[0].y - pipes[0].gap), 0, height, 0, 1))
            inputs.append(map(pipes[0].x, 0, width, 0, 1))
        else:
            inputs.append(map(pipes[1].y, 0, height, 0 ,1))
            inputs.append(map((pipes[1].y - pipes[1].gap), 0, height, 0, 1))
            inputs.append(map(pipes[1].x, 0, width, 0, 1))

        print(self.birdIsPass(pipes[0]))
        for i in inputs:
            print(i)
    
        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
 
    def update(self):
        self.birdVec.add(self.birdAcc)
        self.birdPos.add(self.birdVec)
        self.score += 1

    def jump(self):
        self.birdVec.y = -8

    def display(self):
        fill("#D5BB06")
        ellipse(self.birdPos.x, self.birdPos.y, 25, 25)

    def collide(self, _pipe):
        R = 25 / 2
        X = self.birdPos.x
        Y = self.birdPos.y
        if (X + R > _pipe.x and X - R < _pipe.x + _pipe.w):
            if (Y + R > _pipe.y or Y - R < _pipe.y - _pipe.gap):
                return True
        if (Y > height):
            return True
        return False
    
    def birdIsPass(self, _pipe):
        if (self.birdPos.x > _pipe.x):
            return True
        return False

class Pipe:
    x = y = h = 0
    w = 80
    gap = 80

    def __init__(self):
        self.x = width + self.w
        self.y = random(100, height - 100)
        self.h = height

    def update(self, _panSpeed):
        self.x -= _panSpeed

    def display(self):
        fill(0, 204, 0)
        rect(self.x, self.y, self.w, self.h)
        rect(self.x, self.y - self.gap, self.w, -self.h)
```

在這段program中，首先在`Bird` class中，加入`birdIsPass()`:

```python
def birdIsPass(self, _pipe):
        if (self.birdPos.x > _pipe.x):
            return True
        return False
```

來判斷鳥是否通過了第一條水管。

再在上面的`think()`中，加入有意思的參數。

```python
def think(self, pipes):
        inputs = []
        
        inputs.append(map(self.birdPos.y, 0, height, 0, 1))
        if not (self.birdIsPass(pipes[0])):
            inputs.append(map(pipes[0].y, 0, height, 0 ,1))
            inputs.append(map((pipes[0].y - pipes[0].gap), 0, height, 0, 1))
            inputs.append(map(pipes[0].x, 0, width, 0, 1))
        else:
            inputs.append(map(pipes[1].y, 0, height, 0 ,1))
            inputs.append(map((pipes[1].y - pipes[1].gap), 0, height, 0, 1))
            inputs.append(map(pipes[1].x, 0, width, 0, 1))

        print(self.birdIsPass(pipes[0]))
        for i in inputs:
            print(i)
    
        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
```

這裡加入了鳥本身的y座標，鳥前方水管的頂和底水管的座標，還有水管的x座標。

運行後，你可以看到，鳥是否可以通過了第一條水管，和上面幾個`inputs`的參數。

## 4. 製作一個世代

`flappy_bird.pyde`:

```python
from Stuffs import *
from GeneticAlgorithm import *

population = 500
panSpeed = 5
birds = []
myPipes = []

def setup():
    global birds, myPipes
    size(800, 600)
    frameRate(60)
    for i in range(population):
        birds.append(Bird()) 
    myPipes = [Pipe()]

def draw():
    global birds, myPipes

    if (frameCount % 100 == 0):
        myPipes.append(Pipe())
    if (myPipes[0].x < -myPipes[0].w):
        myPipes.pop(0)

    background("#70C6D5")
    for bird in birds:
        bird.think(myPipes)
        bird.update()
        bird.display()
        if bird.collide(myPipes[0]):
            birds.remove(bird)
    print(len(birds))
    if (len(birds) == 0):
        nextGeneration(birds, population)

    for pipe in myPipes:
        pipe.update(panSpeed)
        pipe.display()

def keyPressed():
    if (key == ' '):
        birds[0].jump()
    if (key == 'W' or key == 'w'):
        birds[1].jump()
    if (key == 'R' or key == 'r'):
        setup()
```

`Stuffs.py`:

```python
from nn import NeuralNetwork

class Bird:
    def __init__(self):
        self.score = 0
        self.pipeCounter = 0
        self.birdPos = PVector(50, height/2)
        self.birdVec = PVector(0, 0)
        self.birdAcc = PVector(0, 0.3)
        self.brain = NeuralNetwork(4, 4, 1)

    def think(self, pipes):
        inputs = []
        
        inputs.append(map(self.birdPos.y, 0, height, 0, 1))
        if not (self.birdIsPass(pipes[0])):
            inputs.append(map(pipes[0].y, 0, height, 0 ,1))
            inputs.append(map((pipes[0].y - pipes[0].gap), 0, height, 0, 1))
            inputs.append(map(pipes[0].x, 0, width, 0, 1))
        else:
            inputs.append(map(pipes[1].y, 0, height, 0 ,1))
            inputs.append(map((pipes[1].y - pipes[1].gap), 0, height, 0, 1))
            inputs.append(map(pipes[1].x, 0, width, 0, 1))

        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
 
    def update(self):
        self.birdVec.add(self.birdAcc)
        self.birdPos.add(self.birdVec)
        self.score += 1

    def jump(self):
        self.birdVec.y = -8

    def display(self):
        fill("#D5BB06")
        ellipse(self.birdPos.x, self.birdPos.y, 25, 25)

    def collide(self, _pipe):
        R = 25 / 2
        X = self.birdPos.x
        Y = self.birdPos.y
        if (X + R > _pipe.x and X - R < _pipe.x + _pipe.w):
            if (Y + R > _pipe.y or Y - R < _pipe.y - _pipe.gap):
                return True
        if (Y > height):
            return True
        return False
    
    def birdIsPass(self, _pipe):
        if (self.birdPos.x > _pipe.x):
            return True
        return False

class Pipe:
    x = y = h = 0
    w = 80
    gap = 80

    def __init__(self):
        self.x = width + self.w
        self.y = random(100, height - 100)
        self.h = height

    def update(self, _panSpeed):
        self.x -= _panSpeed

    def display(self):
        fill(0, 204, 0)
        rect(self.x, self.y, self.w, self.h)
        rect(self.x, self.y - self.gap, self.w, -self.h)
```

`GeneticAlgorithm.py`:

```python
from Stuffs import *

def nextGeneration(birds, _population):
    for i in range(_population):
        birds.append(Bird())
```



第一步，先將原本在`Stuff.py`中，列印`inputs`的值都刪去，免得一次過列印太多東西。

之後，回到主程式，

在最上方加入:

```python
from GeneticAlgorithm import *

population = 500
```

導入新的一個叫`GeneticAlgorithm`的python檔案和一次過製作500隻鳥。

在`setup()`中，將原本的`birds = [Bird(), Bird()]`，轉成:

```python
for i in range(population):
        birds.append(Bird()) 
```

在主程中`draw()`中，將所有鳥的顯示和更新等，轉成:

```python
for bird in birds:
    bird.think(myPipes)
    bird.update()
    bird.display()
    if bird.collide(myPipes[0]):
        birds.remove(bird)
print(len(birds))
if (len(birds) == 0):
    nextGeneration(birds, population)
```

加入指令，只要撞到水管或跌出畫面，就將這隻鳥，從`birds`中刪除，最後再觀察現時有多少隻鳥。在一次過500隻的情況下，總會有幾隻能夠捱得到不出畫面外。

如果全部鳥都被刪除，就重生下一個世代。

開一個叫`GeneticAlgorithm.py`的新tag，加入:

```python
from Stuffs import *

def nextGeneration(birds, _population):
    for i in range(_population):
        birds.append(Bird())
```

這個動作，只是重新製作新一代的人口。

## 5. 基因演算法(初始化、評估和選擇)

遺傳演算法的運作方式類似於生物進化的過程。它以一個稱為"基因型"的編碼來表示問題的解，並使用一組稱為"個體"的基因型來形成一個"族群"。每個個體都對應於問題的一個可能解。

遺傳演算法的運行過程通常包括以下步驟：

1. **初始化：隨機生成一個初始個體族群。**

2. **適應度評估：對於每個個體，根據問題的目標函數計算其適應度，評估其解的品質。**

3. **選擇：根據適應度的大小，選擇一些優秀的個體作為下一代的父母。**

4. 交叉：將選擇的父母進行交叉操作，生成子代個體。

5. 變異：對子代進行突變操作，引入一些隨機性，以增加搜索空間的探索能力。

6. 更新族群：將子代個體與父代個體結合，形成新的族群。

7. 重複執行步驟2至6，直到滿足停止條件（例如達到最大迭代次數或找到足夠好的解）。


`flappy_bird.pyde`:

```python
from Stuffs import *
from GeneticAlgorithm import *

population = 500
panSpeed = 5
birds = []
allBirds = []
bestBird = None
myPipes = []
counter = 0

def setup():
    global birds, myPipes, allBirds
    size(800, 600)
    frameRate(60)
    for i in range(population):
        birds.append(Bird()) 
        
    myPipes = [Pipe()]

def draw():
    global birds, myPipes, counter, allBirds

    counter += 1
    if (counter % 100 == 0):
        myPipes.append(Pipe())
    if (myPipes[0].x < -myPipes[0].w):
        myPipes.pop(0)

    background("#70C6D5")
    for bird in birds:
        bird.think(myPipes)
        bird.update()
        bird.display()
        if bird.collide(myPipes[0]):
            allBirds.append(bird)
            birds.remove(bird)
    
    if (len(birds) == 0):
        birds = nextGeneration(allBirds, population)

    for pipe in myPipes:
        pipe.update(panSpeed)
        pipe.display()

def keyPressed():
    if (key == ' '):
        birds[0].jump()
    if (key == 'W' or key == 'w'):
        birds[1].jump()
    if (key == 'R' or key == 'r'):
        setup()
```
`Stuffs.py`:

```python
from nn import NeuralNetwork

class Bird:
    def __init__(self):
        self.score = 0
        self.fitness = 0
        self.pipeCounter = 0
        self.birdPos = PVector(50, height/2)
        self.birdVec = PVector(0, 0)
        self.birdAcc = PVector(0, 0.3)
        self.brain = NeuralNetwork(4, 4, 1)

    def think(self, pipes):
        inputs = []
        
        inputs.append(map(self.birdPos.y, 0, height, 0, 1))
        if not (self.birdIsPass(pipes[0])):
            inputs.append(map(pipes[0].y, 0, height, 0 ,1))
            inputs.append(map((pipes[0].y - pipes[0].gap), 0, height, 0, 1))
            inputs.append(map(pipes[0].x, 0, width, 0, 1))
        else:
            inputs.append(map(pipes[1].y, 0, height, 0 ,1))
            inputs.append(map((pipes[1].y - pipes[1].gap), 0, height, 0, 1))
            inputs.append(map(pipes[1].x, 0, width, 0, 1))

        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
 
    def update(self):
        self.birdVec.add(self.birdAcc)
        self.birdPos.add(self.birdVec)
        self.score += 1

    def jump(self):
        self.birdVec.y = -8

    def display(self):
        fill("#D5BB06")
        ellipse(self.birdPos.x, self.birdPos.y, 25, 25)

    def collide(self, _pipe):
        R = 25 / 2
        X = self.birdPos.x
        Y = self.birdPos.y
        if (X + R > _pipe.x and X - R < _pipe.x + _pipe.w):
            if (Y + R > _pipe.y or Y - R < _pipe.y - _pipe.gap):
                return True
        if (Y > height):
            return True
        return False
    
    def birdIsPass(self, _pipe):
        if (self.birdPos.x > _pipe.x):
            return True
        return False
    
    def copy(self):
        copyBird = Bird()
        copyBird.brain = self.brain.copy()
        return copyBird

class Pipe:
    x = y = h = 0
    w = 80
    gap = 180

    def __init__(self):
        self.x = width + self.w
        self.y = random(100, height - 100)
        self.h = height

    def update(self, _panSpeed):
        self.x -= _panSpeed

    def display(self):
        fill(0, 204, 0)
        rect(self.x, self.y, self.w, self.h)
        rect(self.x, self.y - self.gap, self.w, -self.h)
```

`GeneticAlgorithm.py`:
```PYTHON
from Stuffs import *
import random

def nextGeneration(allBirds, population):
    global bestBird
    newBirds = []
    bestBird = findBestBird(allBirds)
    resetGame()
    normalizeFitness(allBirds)
    activeBirds = generate(allBirds)
    for i in range(population):
        newBirds.append(activeBirds[i])
    allBirds = []
    print(len(newBirds))
    return newBirds

def normalizeFitness(birds):
    # power all the score of birds
    for bird in birds:
        bird.score = pow(bird.score, 2)
    sum = 0
    for bird in birds:
        sum += bird.score
    for bird in birds:
        bird.fitness = bird.score / sum

def findBestBird(allBirds):
    maxScore = 0
    _bestBird = None
    for bird in allBirds: 
        if bird.score > maxScore:
            maxScore = bird.score
            _bestBird = bird
    return _bestBird

def resetGame():
    global myPipes, counter, bestBird
    
    myPipes = []
    counter = 0
    if (bestBird != None):
        bestBird.score = 0

def generate(oldBirds):
    newBirds = []
    for i in range(len(oldBirds)):
        bird = poolSelection(oldBirds)
        newBirds.append(bird)
    return newBirds

def poolSelection(birds):
    index = 0
    r = random.random()
    while (r > 0):
        r -= birds[index].fitness
        index += 1
    index -= 1
    bird = birds[index]
    child = bird.copy()
    return child
```

以上的程式碼，做了基因演算法的前三步。我們建立了一個500隻鳥的群組，為每一隻鳥計分，紀錄鳥生存了多久，然後我們根據每隻鳥的`fitness`去抽選這隻鳥是否能遺傳下去有下一代。

當我們運行這個程式後，會發現過了幾代後，幾乎所有的鳥都只會有同一個行為，500隻鳥會疊在一起，這是因為這些鳥只有根據分數決定下一代，但沒有做交叉基因，所以幾代後，所有的鳥只會有同一個單一基因，所以行為完全一模一樣。

## 6. 基因演算法(交叉基因)

為方便展示效果，程式做了較多修改，我將全部都貼上來。共有5個檔案。

`flappy_bird_AI.pyde`:

```python
from Stuffs import *
from GeneticAlgorithm import *
from Matrix import *

population = 500
panSpeed = 5
birds = []
allBirds = []
bestBird = None
myPipes = []
counter = 0
frame_count = 0
generation = 0

def setup():

    global birds, myPipes, allBirds, generation, counter, frame_count, bestBird
    size(800, 600)
    frameRate(60)
    for i in range(population):
        birds.append(Bird()) 
        
    myPipes = [Pipe()]
    allBirds = []
    bestBird = None
    generation = 1
    counter = 0
    frame_count = 0

def draw():
    
    global birds, myPipes, counter, allBirds, frame_count, generation

    counter += 1
    if (counter % 100 == 0):
        myPipes.append(Pipe())
    if (myPipes[0].x < -myPipes[0].w):
        myPipes.pop(0)

    background("#70C6D5")
    for bird in birds:
        bird.think(myPipes)
        bird.update()
        bird.display()
        if bird.collide(myPipes[0]):
            allBirds.append(bird)
            birds.remove(bird)
    
    if (len(birds) == 0):
        frame_count += 1
        if frame_count >= 16:
            print("new generation")
            generation += 1
            birds = nextGeneration(allBirds, population)
            allBirds = []
            frame_count = 0

    for pipe in myPipes:
        pipe.update(panSpeed)
        pipe.display()
    
    fill(255)
    text("Population: "+str(len(birds)), 20, 20)
    text("Generation: "+str(generation), 20, 40)

# def keyPressed():
#     if (key == ' '):
#         birds[0].jump()
#     if (key == 'W' or key == 'w'):
#         birds[1].jump()
#     if (key == 'R' or key == 'r'):
#         setup()
```

`GeneticAlgorithm.py`:

```python
from Stuffs import *
import random

def nextGeneration(allBirds, population):
    global bestBird
    newBirds = []
    bestBird = findBestBird(allBirds)
    resetGame()
    normalizeFitness(allBirds)
    activeBirds = generate(allBirds)
    for i in range(population):
        newBirds.append(activeBirds[i])
  
    return newBirds

def normalizeFitness(birds):
    # power all the score of birds
    for bird in birds:
        bird.score = pow(bird.score, 2)
    sum = 0
    for bird in birds:
        sum += bird.score
    for bird in birds:
        bird.fitness = bird.score / sum

def findBestBird(allBirds):
    maxScore = 0
    _bestBird = None
    for bird in allBirds: 
        if bird.score > maxScore:
            maxScore = bird.score
            _bestBird = bird
    return _bestBird

def resetGame():
    global myPipes, counter, bestBird
    
    myPipes = []
    counter = 0
   
    if (bestBird != None):
        bestBird.score = 0

def crossover(bird1, bird2):
    child = Bird()  
    child.brain = NeuralNetwork(4,4,1) 

    child.brain.weights_ih = bird1.brain.weights_ih.crossover(bird2.brain.weights_ih)
    child.brain.weights_ho = bird1.brain.weights_ho.crossover(bird2.brain.weights_ho)
    child.brain.bias_h = bird1.brain.bias_h.crossover(bird2.brain.bias_h)
    child.brain.bias_o = bird1.brain.bias_o.crossover(bird2.brain.bias_o)

    return child

def generate(oldBirds):
    newBirds = []
    for i in range(len(oldBirds)):
        bird1 = poolSelection(oldBirds)
        bird2 = poolSelection(oldBirds)
        child = crossover(bird1, bird2)
        newBirds.append(child)
    return newBirds

def poolSelection(birds):
    index = 0
    r = random.random()
    while (r > 0):
        r -= birds[index].fitness
        index += 1
    index -= 1
    bird = birds[index]
    child = bird.copy()
    return child
```

`Matrix.py`:

```python
import random

class Matrix():
    
    def __init__(self, rows, columns):
        self.rows = rows
        self.columns = columns
        self.data = [[0 for x in range(columns)] for y in range(rows)]

    def _print(self):
        for row in self.data:
            print(row)
        print('\n')

    def copy(self):
        m = Matrix(self.rows, self.columns)
        for i in range(self.rows):
            for j in range(self.columns):
                m.data[i][j] = self.data[i][j]
        return m
    
    @classmethod
    def fromArray(cls, array):
        m = Matrix(len(array), 1)
        for i in range(len(array)):
            m.data[i][0] = array[i]
        return m
    
    def toArray(self):
        array = []
        for i in range(self.rows):
            for j in range(self.columns):
                array.append(self.data[i][j])
        return array
    
    def add(self, n, b=None):
            if b is None:
                if isinstance(n, Matrix):
                    if self.rows != n.rows or self.columns != n.columns :
                        print("Columns and Rows of A must match Columns and Rows of B.")
                        return
                    result = Matrix(self.rows, self.columns)
                    for i in range(self.rows):
                        for j in range(self.columns):
                            result.data[i][j] = self.data[i][j] + n.data[i][j]
                else:
                    result = Matrix(self.rows, self.columns)
                    for i in range(self.rows):
                        for j in range(self.columns):
                            result.data[i][j] = self.data[i][j] + n
            else:
                if isinstance(n, Matrix) and isinstance(b, Matrix):
                    if n.rows != b.rows or n.columns != b.columns:
                        print("Columns and Rows of A, B and C must match.")
                        return
                    result = Matrix(n.rows, n.columns)
                    for i in range(n.rows):
                        for j in range(n.columns):
                            result.data[i][j] = n.data[i][j] + b.data[i][j]
                elif isinstance(n, Matrix) and not isinstance(b, Matrix):
                    result = Matrix(n.rows, n.columns)
                    for i in range(n.rows):
                        for j in range(n.columns):
                            result.data[i][j] = n.data[i][j] + b
            return result
    
    def subtract(self, n, b = None):
        if b is None:
            if isinstance(n, Matrix):
                return self.add(n.multiply(-1))
            else:
                return self.add(-n)
        else:
            if isinstance(n, Matrix) and isinstance(b, Matrix):
                return n.add(b.multiply(-1))
            elif isinstance(n, Matrix) and not isinstance(b, Matrix): 
                return n.add(-b)
    
    
    def randomize(self):
        for i in range(self.rows):
            for j in range(self.columns):
                self.data[i][j] = random.uniform(-1, 1)

    def transpose(self):
        result = Matrix(self.columns, self.rows)
        for i in range(self.rows):
            for j in range(self.columns):
                result.data[j][i] = self.data[i][j]
        return result
    
    def multiply(self, n, b = None):
        if b is None:
            # check if n is a matrix or a scalar
            if isinstance(n, Matrix):
                if self.columns != n.rows:
                    print("Columns of A must match rows of B.")
                    return
                result = Matrix(self.rows, n.columns)
                for i in range(result.rows):
                    for j in range(result.columns):
                        sum = 0
                        for k in range(self.columns):
                            sum += self.data[i][k] * n.data[k][j]
                        result.data[i][j] = sum
                return result
            else:
                result = Matrix(self.rows, self.columns)
                for i in range(self.rows):
                    for j in range(self.columns):
                        result.data[i][j] = self.data[i][j] * n
                return result
        else:
            if isinstance(n, Matrix) and isinstance(b, Matrix):
                if n.columns != b.rows:
                    print("Columns of A must match rows of B.")
                    return
                result = Matrix(n.rows, b.columns)
                for i in range(result.rows):
                    for j in range(result.columns):
                        sum = 0
                        for k in range(n.columns):
                            sum += n.data[i][k] * b.data[k][j]
                        result.data[i][j] = sum
                return result
            elif isinstance(n, Matrix) and not isinstance(b, Matrix):
                result = Matrix(n.rows, n.columns)
                for i in range(n.rows):
                    for j in range(n.columns):
                        result.data[i][j] = n.data[i][j] * b
                return result

    def hadamard_product(self, n, b = None):
        if b is None:
            if self.rows != n.rows or self.columns != n.columns:
                print("Columns and Rows of A must match Columns and Rows of B.")
                return
            result = Matrix(self.rows, self.columns)
            for i in range(result.rows):
                for j in range(result.columns):
                    result.data[i][j] = self.data[i][j] * n.data[i][j]
            return result
        else:
            if n.rows != b.rows or n.columns != b.columns:
                print("Columns and Rows of A, B and C must match.")
                return
            result = Matrix(n.rows, n.columns)
            for i in range(result.rows):
                for j in range(result.columns):
                    result.data[i][j] = n.data[i][j] * b.data[i][j]
            return result
        
    def map(self, func):
        for i in range(self.rows):
            for j in range(self.columns):
                val = self.data[i][j]
                self.data[i][j] = func(val)
        return self

    def crossover(self, other):
        crossoverPoint = random.randint(0, self.rows * self.columns)
        childData = []
        for i in range(self.rows):
            childRow = []
            for j in range(self.columns):
                if i * self.columns + j < crossoverPoint:
                    childRow.append(self.data[i][j])
                else:
                    childRow.append(other.data[i][j])
            childData.append(childRow)
        child = Matrix(self.rows, self.columns)
        child.data = childData
        return child
```

`Stuffs.py`:

```python
from nn import NeuralNetwork

class Bird:
    def __init__(self):
        self.score = 0
        self.fitness = 0
        self.pipeCounter = 0
        self.birdPos = PVector(50, height/2)
        self.birdVec = PVector(0, 0)
        self.birdAcc = PVector(0, 0.3)
        self.brain = NeuralNetwork(4, 4, 1)

    def think(self, pipes):
        inputs = []
        
        inputs.append(map(self.birdPos.y, 0, height, 0, 1))
        if not (self.birdIsPass(pipes[0])):
            inputs.append(map(pipes[0].y, 0, height, 0 ,1))
            inputs.append(map((pipes[0].y - pipes[0].gap), 0, height, 0, 1))
            inputs.append(map(pipes[0].x, 0, width, 0, 1))
        else:
            inputs.append(map(pipes[1].y, 0, height, 0 ,1))
            inputs.append(map((pipes[1].y - pipes[1].gap), 0, height, 0, 1))
            inputs.append(map(pipes[1].x, 0, width, 0, 1))

        output = self.brain.predict(inputs)
        if output[0] > 0.5:
            self.jump()
 
    def update(self):
        self.birdVec.add(self.birdAcc)
        self.birdPos.add(self.birdVec)
        self.score += 1

    def jump(self):
        self.birdVec.y = -8

    def display(self):
        fill("#D5BB06")
        ellipse(self.birdPos.x, self.birdPos.y, 25, 25)
        fill("#FF0000")
        text(self.score, self.birdPos.x, self.birdPos.y - 20)

    def collide(self, _pipe):
        R = 25 / 2
        X = self.birdPos.x
        Y = self.birdPos.y
        if (X + R > _pipe.x and X - R < _pipe.x + _pipe.w):
            if (Y + R > _pipe.y or Y - R < _pipe.y - _pipe.gap):
                return True
        if (Y > height):
            return True
        return False
    
    def birdIsPass(self, _pipe):
        if (self.birdPos.x > _pipe.x):
            return True
        return False
    
    def copy(self):
        copyBird = Bird()
        copyBird.brain = self.brain.copy()
        return copyBird

class Pipe:
    x = y = h = 0
    w = 80
    gap = 280

    def __init__(self):
        self.x = width + self.w
        self.y = random(100, height - 100)
        self.h = height

    def update(self, _panSpeed):
        self.x -= _panSpeed

    def display(self):
        fill(0, 204, 0)
        rect(self.x, self.y, self.w, self.h)
        rect(self.x, self.y - self.gap, self.w, -self.h)
```

`nn.py`:

```python
from Matrix import *
import math

class ActivationFunction:
    def __init__(self, func, dfunc):
        self.func = func
        self.dfunc = dfunc

def sigmoid_func(x):
    return 1 / (1 + math.exp(-x))

def sigmoid_dfunc(y):
    return y * (1 - y)

sigmoid = ActivationFunction(sigmoid_func, sigmoid_dfunc)

def tanh_func(x):
    return math.tanh(x)

def tanh_dfunc(y):
    return 1 - (y * y)

tanh = ActivationFunction(tanh_func, tanh_dfunc)

class NeuralNetwork:
    def __init__(self, a, b=None, c=None):
        if isinstance(a, NeuralNetwork):
            self.input_nodes = a.input_nodes
            self.hidden_nodes = a.hidden_nodes
            self.output_nodes = a.output_nodes

            self.weights_ih = a.weights_ih.copy()
            self.weights_ho = a.weights_ho.copy()

            self.bias_h = a.bias_h.copy()
            self.bias_o = a.bias_o.copy()
        else:
            self.input_nodes = a
            self.hidden_nodes = b
            self.output_nodes = c

            self.weights_ih = Matrix(self.hidden_nodes, self.input_nodes)
            self.weights_ho = Matrix(self.output_nodes, self.hidden_nodes)
            self.weights_ih.randomize()
            self.weights_ho.randomize()

            self.bias_h = Matrix(self.hidden_nodes, 1)
            self.bias_o = Matrix(self.output_nodes, 1)
            self.bias_h.randomize()
            self.bias_o.randomize()

        self.setLearningRate(0.1)
        self.setActivationFunction(sigmoid)
    
    def predict(self, input_array):
        # Generating the Hidden Outputs
        inputs = Matrix.fromArray(input_array)
        hidden = Matrix.multiply(self.weights_ih, inputs)
        hidden = hidden.add(self.bias_h)
        # activation function!
        hidden.map(self.activation_function.func)

        # Generating the output's output!
        output = Matrix.multiply(self.weights_ho, hidden)
        output = output.add(self.bias_o)
        output.map(self.activation_function.func)

        # Sending back to the caller!
        return output.toArray()

    def setLearningRate(self, learning_rate):
        self.learning_rate = learning_rate

    def setActivationFunction(self, func):
        self.activation_function = func

    def train(self, input_array, target_array):
        # Generating the Hidden Outputs
        inputs = Matrix.fromArray(input_array)
        hidden = Matrix.multiply(self.weights_ih, inputs)
        hidden = hidden.add(self.bias_h)
        # activation function!
        hidden.map(self.activation_function.func)
        # Generating the output's output!
        outputs = Matrix.multiply(self.weights_ho, hidden)
        outputs = outputs.add(self.bias_o)
        outputs.map(self.activation_function.func)

        # Convert array to matrix object
        targets = Matrix.fromArray(target_array)

        # Calculate the error
        # ERROR = TARGETS - OUTPUTS
        output_errors = Matrix.subtract(targets, outputs)

        # let gradient = outputs * (1 - outputs);
        # Calculate gradient
        gradients = Matrix.map(outputs, self.activation_function.dfunc)
        gradients = gradients.hadamard_product(output_errors)
        gradients = gradients.multiply(self.learning_rate)

        # Calculate deltas
        hidden_T = Matrix.transpose(hidden)
        weight_ho_deltas = Matrix.multiply(gradients, hidden_T)
        # Adjust the weights by deltas
        self.weights_ho = self.weights_ho.add(weight_ho_deltas)
        # Adjust the bias by its deltas (which is just the gradients)
        self.bias_o = self.bias_o.add(gradients)

        # Calculate the hidden layer errors
        who_t = Matrix.transpose(self.weights_ho)
        hidden_errors = Matrix.multiply(who_t, output_errors)
      
        # Calculate hidden gradient
        hidden_gradient = Matrix.map(hidden, self.activation_function.dfunc)
        hidden_gradient = hidden_gradient.hadamard_product(hidden_errors)
        hidden_gradient = hidden_gradient.multiply(self.learning_rate)

        # Calcuate input->hidden deltas
        inputs_T = Matrix.transpose(inputs)
        weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T)

        self.weights_ih = self.weights_ih.add(weight_ih_deltas)
        # Adjust the bias by its deltas (which is just the gradients)
        self.bias_h = self.bias_h.add(hidden_gradient)

    def copy(self):
        return NeuralNetwork(self)
    
    def mutate(self, func):
        self.weights_ih.map(func)
        self.weights_ho.map(func)
        self.bias_o.map(func)
        self.bias_h.map(func)
```

<img src="%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96%202024-04-01%20%E4%B8%8B%E5%8D%883.47.41.png" alt="螢幕截圖 2024-04-01 下午3.47.41" style=" width:66%;" />

為方便和調試，我將遊戲的難度降底了，可以看到，去到第12代後，在沒有設定timeout的情況下，最終有20隻鳥有40000分以上。

這裡，我主要在`Matrix`class中加入了`crossover`功能，讓矩陣能夠交換內容，之後也在`GeneticAlgorithm.py`中，將鳥交換基因，令到每一代都能跟隨上一代的父母交換基因特徵。

但是否每一次都能成功呢？當然不是，就算生物在進化時，有些物種不能適應環境，就算勉強繁演下去，也會全族滅亡，舉個例子，如果這500隻鳥也沒有跳過水管的能力，那麼它們的基因傳下去，也沒有這個能力的。就像近親繁殖一樣，如果找不到新的基因，太相似的基因一路繁演下去，就會變得很單一，一個可能是對這個水管十分熟識，整個族群都能拿到高分，一個可能是對環境十分不熟識，全部群眾都很低分。但就算是前者, 也會因為對環境十分熟悉，這時如果將水管的開口變窄，就會完全不適應而全族滅亡。為了應該這個問題，便需要在遺傳中，加入「基因變異(mutation)」。

## 7. 基因演算法(變異)

`GeneticAlgorithm.py`:

```python
from Stuffs import *
import random

def nextGeneration(allBirds, population):
    global bestBird
    newBirds = []
    bestBird = findBestBird(allBirds)
    resetGame()
    normalizeFitness(allBirds)
    activeBirds = generate(allBirds)
    for i in range(population):
        newBirds.append(activeBirds[i])
    
    return newBirds

def normalizeFitness(birds):
    # power all the score of birds
    for bird in birds:
        bird.score = pow(bird.score, 2)
    sum = 0
    for bird in birds:
        sum += bird.score
    for bird in birds:
        bird.fitness = bird.score / sum

def findBestBird(allBirds):
    maxScore = 0
    _bestBird = None
    for bird in allBirds: 
        if bird.score > maxScore:
            maxScore = bird.score
            _bestBird = bird
    return _bestBird

def resetGame():
    global myPipes, counter, bestBird
    
    myPipes = []
    counter = 0
   
    if (bestBird != None):
        bestBird.score = 0

def crossover(bird1, bird2):
    child = Bird()  
    child.brain = NeuralNetwork(4,4,1) 

    child.brain.weights_ih = bird1.brain.weights_ih.crossover(bird2.brain.weights_ih)
    child.brain.weights_ho = bird1.brain.weights_ho.crossover(bird2.brain.weights_ho)
    child.brain.bias_h = bird1.brain.bias_h.crossover(bird2.brain.bias_h)
    child.brain.bias_o = bird1.brain.bias_o.crossover(bird2.brain.bias_o)

    return child

def mutation_func(x):
    mutation_rate = 0.002
    if random.random() < mutation_rate:
        return x + random.gauss(0, 0.05)
    else:
        return x

def generate(oldBirds):
    newBirds = []
    for i in range(len(oldBirds)):
        bird1 = poolSelection(oldBirds)
        bird2 = poolSelection(oldBirds)
        child = crossover(bird1, bird2)
        child.brain.mutate(mutation_func)
        newBirds.append(child)
    return newBirds

def poolSelection(birds):
    index = 0
    r = random.random()
    while (r > 0):
        r -= birds[index].fitness
        index += 1
    index -= 1
    bird = birds[index]
    child = bird.copy()
    return child
```

今次只有一個細節位有改變。

在這裡，我們加入了一個`mutation_func`，用來令神經網路改變。之後在原本的`generate`中，在基因交換後，加入`child.brain.mutate(mutation_func)`令基因變異。

```python
def mutation_func(x):
    mutation_rate = 0.002
    if random.random() < mutation_rate:
        return x + random.gauss(0, 0.05)
    else:
        return x

def generate(oldBirds):
    newBirds = []
    for i in range(len(oldBirds)):
        bird1 = poolSelection(oldBirds)
        bird2 = poolSelection(oldBirds)
        child = crossover(bird1, bird2)
        child.brain.mutate(mutation_func)
        newBirds.append(child)
    return newBirds
```

這裡有2個數值得們我們關注:

1. `mutation_rate = 0.002`: 是變異率，`0.002`大約是500隻當中，有一隻會有變異，這個其實已經相當高，人類的變異率，是$10^{-8}$的級數，而細菌和病毒則較高，是$10^{-6}$的級數。太高的變異率，會令好的基因很難維持下去。
2. ` x + random.gauss(0, 0.05)`: 另一個是我們的變異函數，在發生變異時，有多大程度影響這個基因，如果太大的話，會令整個基因產生翻天覆地的變化，由貓變異做狗，但如果太少的話，對效果又不明顯。

## 8. 考考你

來到這裡，這個程式已經完成，但也有不少改良空間。

1. 鳥的大腦，中間隱藏層只有4個神經源，在The Coding Train的例子中，神經網路不是我們的`NeuralNetwork(4, 4, 1)`，即4個輸入變量，4層隱藏層和1個輸出，而是`NeuralNetwork(5, 8, 2)`，他的例子有2個輸出，如果輸出1少於輸出2，則鳥就會跳，令神經網路的複雜度增加，你試試先將神經網路轉成`NeuralNetwork(4, 16, 1)`，看看鳥有沒有更聰明。之後再試著變成`NeuralNetwork(4, 8, 2)`。
2. 在原例子中，神經網路是`NeuralNetwork(5, 8, 2)`，因為輸入的考慮因素，還有一個是`birdVec`，試著將`birdVec.y`加入變為考慮: `inputs.append( map(this.birdVec.y, -5, 5, 0, 1))`
3. 鳥的生命沒有限制，令成功生存的鳥一直生存下去，沒有機會變下一世代，不利基因遺傳，試設定一個liftcount，鳥在經過2000個`frameCount`後就會滅亡，還入下一個世代。


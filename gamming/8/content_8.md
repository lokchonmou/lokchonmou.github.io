# 8. Tetris

> 《俄羅斯方塊》（俄語：Тетрис，英語：Tetris），是1980年末期至1990年代初期風靡全世界的電腦遊戲，是落下型益智遊戲的始祖，為蘇聯首個在美國發佈的娛樂軟件。此遊戲最初由阿列克謝·帕基特諾夫在蘇聯設計和編寫，於1984年6月6日首次發佈，當時他正在蘇聯科學院電算中心工作。此遊戲的名稱是由希臘語數字「四」的前綴「tetra-」（因所有落下方塊皆由四塊組成）和帕基特諾夫最喜歡的運動網球（「tennis」）拼接而成，華語地區則因遊戲為俄羅斯人發明普遍稱為「俄羅斯方塊」。

![Typical_Tetris_Game](Typical_Tetris_Game.svg)

[TOC]

## 8.0 本章重點

1. 熟習class的用法
2. `frameRate()`外控制速度的方法

## 8.1 準備畫面和class `Spot`用來裝起所有格

`tetris.pyde`:

```python
from spot import *
from gameBoard import *

gridSize = 40
gameBoard = 0

def setup():
    global gameBoard
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    
def draw():
    drawBackground()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)
```
`gameBoard.py`:
```python
from spot import *

class GameBoard(object):
    
    def __init__(self, _gridSize):
        self.grids = []
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)
            
    def show(self):
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show('#000000') 
```

`spot.py`:

```python
class Spot(object):
    def __init__(self, _i, _j, _x, _y, _w, _h):
        self.i = _i
        self.j = _j
        self.x = _x
        self.y = _y
        self.w = _w
        self.h = _h

    def show(self, _color):
        fill(_color)
        stroke(200)
        rect(self.x, self.y, self.w, self.h)
```

<img src="image-20230228131024107.png" alt="image-20230228131024107" style="zoom:67%;" />

新增兩個class,首先是 `spot`是用來裝起每一個格的變數，這個class包含`i`和`j`是格的行列，`x`和`y`是其顯示座標，`w`和`h`則是格的大小。

另一個class `gameBoard`用來真正裝起整個game的畫面，之所以要用一個class去包起，而不直接在`draw()`中直接去畫，一來是為了簡潔，二來是為了擴展需要，寫好之後可以同一時間加多另一個gameboard，可以實玩雙打。

## 8.2 俄羅斯方塊的元素

俄羅斯方塊共有7個元素，依次分別為`T`，`L`，`J`，`I`，`Z`，`S`和`O`。而這此元素亦可以旋轉，所以一共19個可能性。

<img src="筆記 2023年2月17日-1676867118464-1.png" alt="筆記 2023年2月17日" style="width: 50%;" />

`tetris.pyde`:

```python
from spot import *
from gameBoard import *

gridSize = 40
gameBoard = 0

def setup():
    global gameBoard
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    
def draw():
    drawBackground()
    gameBoard.show()
    gameBoard.grids[3][0].name ='T'
    gameBoard.grids[3][1].name ='L'
    gameBoard.grids[3][2].name ='J'
    gameBoard.grids[3][3].name ='I'
    gameBoard.grids[3][4].name ='Z'
    gameBoard.grids[3][5].name ='S'
    gameBoard.grids[3][6].name ='O'
     
def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)
```

`spot.py`:

```python
from spot import *

class GameBoard(object):
    
    def __init__(self, _gridSize):
        self.grids = []
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)
            
    def show(self):
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show() 
```
`gameBoard.py`:

```python
class Spot(object):
    def __init__(self, _i, _j, _x, _y, _w, _h):
        self.i = _i
        self.j = _j
        self.x = _x
        self.y = _y
        self.w = _w
        self.h = _h
        self.name = ''

    def show(self):
        if self.name == '':
            fill(0)
        elif self.name == 'T':
            fill('#FF55FF')
        elif self.name == 'L':
            fill('#C4A484')
        elif self.name == 'J':
            fill('#5555FF')
        elif self.name == 'I':
            fill('#52BAA2')
        elif self.name == 'Z':
            fill('#FF5555')
        elif self.name == 'S':
            fill('#55FF55')
        elif self.name == 'O':
            fill('#FFFF55')
        stroke(200)
        rect(self.x, self.y, self.w, self.h)
```

<img src="image-20230228132800137.png" alt="image-20230228132800137" style="zoom:67%;" />

在上一個版本中，`grids`的`show()`是根據輸入的顏色，用來測試和效果。接著今次的版本，我們要根據上述俄羅斯方塊的元素去填顏色。

在class `spot`中，

```python
def show(self):
    if self.name == '':
        fill(0)
    elif self.name == 'T':
        fill('#FF55FF')
    elif self.name == 'L':
        fill('#C4A484')
    elif self.name == 'J':
        fill('#5555FF')
    elif self.name == 'I':
        fill('#52BAA2')
    elif self.name == 'Z':
        fill('#FF5555')
    elif self.name == 'S':
        fill('#55FF55')
    elif self.name == 'O':
        fill('#FFFF55')
    stroke(200)
    rect(self.x, self.y, self.w, self.h)
```

將之前的`show()`加入不同元素顯示不同顏色。

之後在主頁的中，

```python
def draw():
    drawBackground()
    gameBoard.show()
    gameBoard.grids[3][0].name ='T'
    gameBoard.grids[3][1].name ='L'
    gameBoard.grids[3][2].name ='J'
    gameBoard.grids[3][3].name ='I'
    gameBoard.grids[3][4].name ='Z'
    gameBoard.grids[3][5].name ='S'
    gameBoard.grids[3][6].name ='O'
```

測試一下不同的元素是否有對應相對的顏色。

##8.3 新增鄰居

`tetris.pyde`:
```python
from spot import *
from gameBoard import *

gridSize = 40
gameBoard = 0

def setup():
    global gameBoard
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()
    gameBoard.grids[5][8].name = 'L'
    println(gameBoard.grids[5][8].neighbors)
    gameBoard.grids[5][8].neighbors[0].name = 'J'
    gameBoard.grids[5][8].neighbors[1].name = 'S'
    gameBoard.grids[5][8].neighbors[2].name = 'Z'
    gameBoard.grids[5][8].neighbors[3].name = 'O'
    
def draw():
    drawBackground()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)
```
`spot.py`:
```python
class Spot(object):
    def __init__(self, _i, _j, _x, _y, _w, _h):
        self.i = _i
        self.j = _j
        self.x = _x
        self.y = _y
        self.w = _w
        self.h = _h
        self.name = ''
        self.neighbors = []
        for i in range(4):
            self.neighbors.append('')

    def show(self):
        if self.name == '':
            fill(0)
        elif self.name == 'T':
            fill('#FF55FF')
        elif self.name == 'L':
            fill('#C4A484')
        elif self.name == 'J':
            fill('#5555FF')
        elif self.name == 'I':
            fill('#52BAA2')
        elif self.name == 'Z':
            fill('#FF5555')
        elif self.name == 'S':
            fill('#55FF55')
        elif self.name == 'O':
            fill('#FFFF55')
        stroke(200)
        rect(self.x, self.y, self.w, self.h)

    def addNeighbors(self, _grid):
        if self.j > 0:
            self.neighbors[0] = _grid[self.i][self.j-1]  #UP
        if self.i < 9:
            self.neighbors[1] = _grid[self.i+1][self.j]  #RIGHT
        if self.j < 19:
            self.neighbors[2] = _grid[self.i][self.j+1]  #DOWN
        if self.i > 0:
            self.neighbors[3] = _grid[self.i-1][self.j]  #LEFT
```
`gameBoard.py`:

```python
from spot import *

class GameBoard(object):
    
    def __init__(self, _gridSize):
        self.grids = []
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)

    def addNeighbors(self):
        for i in range(10):
            for j in range(20):
                self.grids[i][j].addNeighbors(self.grids)

    def show(self):
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show() 
```

<img src="image-20230301113606901.png" alt="image-20230301113606901" style="zoom:67%;" />

在class `spot`中，

```python
def addNeighbors(self, _grid):
    if self.j > 0:
        self.neighbors[0] = _grid[self.i][self.j-1]  #UP
    if self.i < 9:
        self.neighbors[1] = _grid[self.i+1][self.j]  #RIGHT
    if self.j < 19:
        self.neighbors[2] = _grid[self.i][self.j+1]  #DOWN
    if self.i > 0:
        self.neighbors[3] = _grid[self.i-1][self.j]  #LEFT
```

加入`addNeighbors()`的函數，跟之前一樣，四個鄰居的次序分別是上、右、下、左順時針方向。



```python
def addNeighbors(self):
        for i in range(10):
            for j in range(20):
                self.grids[i][j].addNeighbors(self.grids)
```

之後在`gameBoard`class中，將10x20個spot都執行`addNeighbors()`。



```python
def setup():
    global gameBoard
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()
    gameBoard.grids[5][8].name = 'L'
    println(gameBoard.grids[5][8].neighbors)
    gameBoard.grids[5][8].neighbors[0].name = 'J'
    gameBoard.grids[5][8].neighbors[1].name = 'S'
    gameBoard.grids[5][8].neighbors[2].name = 'Z'
    gameBoard.grids[5][8].neighbors[3].name = 'O'
```

最後就可以在主程式中，執行`addNeighbors()`，為了測試是否正確加入鄰居，可以將四個鄰居都設定成不同的元素來測試看看顏色。

## 8.4 新增Tetromino Block

<img src="筆記 2023年2月17日-1677036285763-5.png" alt="筆記 2023年2月17日" style="width:67%;" />

``

```python
from spot import *
from gameBoard import *

gridSize = 40

gameBoard = 0

def setup():
    global gameBoard
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()

def draw():
    drawBackground()
    gameBoard.update()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)
```

```python
from spot import *
from block import *

class GameBoard(object):  
    def __init__(self, _gridSize):
        self.grids = []
        self.block = Block(3,0,'T', self.grids)
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)

    def addNeighbors(self):
        for i in range(10):
            for j in range(20):
                self.grids[i][j].addNeighbors(self.grids)

    def show(self):
        self.block.show()
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show()
```

```python
class Spot(object):
    def __init__(self, _i, _j, _x, _y, _w, _h):
        self.i = _i
        self.j = _j
        self.x = _x
        self.y = _y
        self.w = _w
        self.h = _h
        self.name = ''
        self.neighbors = []
        for i in range(4):
            self.neighbors.append('')

    def show(self):
        if self.name == '':
            fill(0)
        elif self.name == 'T':
            fill('#FF55FF')
        elif self.name == 'L':
            fill('#DD6800')
        elif self.name == 'J':
            fill('#004ADD')
        elif self.name == 'I':
            fill('#0DCCCC')
        elif self.name == 'Z':
            fill('#FF5555')
        elif self.name == 'S':
            fill('#00DD26')
        elif self.name == 'O':
            fill('#DDDD00')
        stroke(200)
        rect(self.x, self.y, self.w, self.h)

    def addNeighbors(self, _grid):
        if self.j > 0:
            self.neighbors[0] = _grid[self.i][self.j-1]  #UP
        if self.i < 9:
            self.neighbors[1] = _grid[self.i+1][self.j]  #RIGHT
        if self.j < 19:
            self.neighbors[2] = _grid[self.i][self.j+1]  #DOWN
        if self.i > 0:
            self.neighbors[3] = _grid[self.i-1][self.j]  #LEFT
```

```python
from spot import *

class Block(object):

    shapeIndex = ['I', 'Z', 'S', 'J', 'L', 'T', 'O']

    # Shapes of the blocks
    shapes = [
        [[1, 5, 9, 13], [4, 5, 6, 7]], #type 'I'
        [[4, 5, 9, 10], [2, 6, 5, 9]], #type 'Z'
        [[6, 7, 9, 10], [1, 5, 6, 10]], #type 'S'
        [[1, 2, 5, 9], [0, 4, 5, 6], [1, 5, 9, 8], [4, 5, 6, 10]], #type 'J'
        [[1, 2, 6, 10], [5, 6, 7, 9], [2, 6, 10, 11], [3, 5, 6, 7]], #type 'L'
        [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]], #type 'T'
        [[1, 2, 5, 6]], #type 'O'
    ]

    def __init__(self, _x, _y, _type, _grid):
        self.x = _x
        self.y = _y
        self.type = _type
        self.grid = _grid

        self.rotation = 0
        self.index = self.shapeIndex.index(self.type)
    
    def shape(self):
        return self.shapes[self.index][self.rotation]

    def rotate(self):
        self.rotation = (self.rotation + 1) % len(self.shapes[self.index])

    def show(self):
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    self.grid[self.x+j][self.y+i].name = self.type
```

<img src="image-20230222112824465.png" alt="image-20230222112824465" style="zoom:67%;" />

##8.5 令Tetromino Block向下

```python
from spot import *
from gameBoard import *

gridSize = 40

gameBoard = 0

def setup():
    global gameBoard, timer
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()

def draw():
    drawBackground()
    gameBoard.update()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)

```

```python
from spot import *
from block import *

class GameBoard(object):
    
    def __init__(self, _gridSize):
        self.grids = []
        self.block = Block(3,0,'T', self.grids)
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)
        self.timer = millis()

    def addNeighbors(self):
        for i in range(10):
            for j in range(20):
                self.grids[i][j].addNeighbors(self.grids)

    def update(self):
        if millis() - self.timer > 200:
            self.timer = millis()
            self.clearGrid()
            self.block.goDown()
            if self.block.isWall():
                self.block.setLock()

    def show(self):
        self.block.setType()
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show()

    def clearGrid(self):
         for x in range(10):
            for y in range(20):
                if self.grids[x][y].isLock == False:
                    self.grids[x][y].name = ''
```

```python
class Spot(object):
    def __init__(self, _i, _j, _x, _y, _w, _h):
        self.i = _i
        self.j = _j
        self.x = _x
        self.y = _y
        self.w = _w
        self.h = _h
        self.name = ''
        self.isLock = False
        self.neighbors = []
        for i in range(4):
            self.neighbors.append('')

    def show(self):
        if self.name == '':
            fill(0)
        elif self.name == 'T':
            fill('#FF55FF')
        elif self.name == 'L':
            fill('#DD6800')
        elif self.name == 'J':
            fill('#004ADD')
        elif self.name == 'I':
            fill('#0DCCCC')
        elif self.name == 'Z':
            fill('#FF5555')
        elif self.name == 'S':
            fill('#00DD26')
        elif self.name == 'O':
            fill('#DDDD00')
        stroke(200)
        rect(self.x, self.y, self.w, self.h)

    def addNeighbors(self, _grid):
        if self.j > 0:
            self.neighbors[0] = _grid[self.i][self.j-1]  #UP
        if self.i < 9:
            self.neighbors[1] = _grid[self.i+1][self.j]  #RIGHT
        if self.j < 19:
            self.neighbors[2] = _grid[self.i][self.j+1]  #DOWN
        if self.i > 0:
            self.neighbors[3] = _grid[self.i-1][self.j]  #LEFT
```

```python
from spot import *

class Block(object):

    shapeIndex = ['I', 'Z', 'S', 'J', 'L', 'T', 'O']

    # Shapes of the blocks
    shapes = [
        [[1, 5, 9, 13], [4, 5, 6, 7]], #type 'I'
        [[4, 5, 9, 10], [2, 6, 5, 9]], #type 'Z'
        [[6, 7, 9, 10], [1, 5, 6, 10]], #type 'S'
        [[1, 2, 5, 9], [0, 4, 5, 6], [1, 5, 9, 8], [4, 5, 6, 10]], #type 'J'
        [[1, 2, 6, 10], [5, 6, 7, 9], [2, 6, 10, 11], [3, 5, 6, 7]], #type 'L'
        [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]], #type 'T'
        [[1, 2, 5, 6]], #type 'O'
    ]

    def __init__(self, _x, _y, _type, _grid):
        self.x = _x
        self.y = _y
        self.type = _type
        self.grid = _grid

        self.rotation = 0
        self.index = self.shapeIndex.index(self.type)
    
    def shape(self):
        return self.shapes[self.index][self.rotation]

    def rotate(self):
        self.rotation = (self.rotation + 1) % len(self.shapes[self.index])

    def setType(self):
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    self.grid[self.x+j][self.y+i].name = self.type

    def isWall(self, _direction):
        isWall = False
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    if _direction == 2:
                        if i+self.y>=19:
                            isWall = True
                    elif _direction == 3:
                        if self.x+j<=0:
                            isWall = True
                    elif _direction == 1:
                        if self.x+j>=9 :
                            isWall = True
        return isWall

    def isBlocked(self, _direction):
        isBlocked = False
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    if self.grid[self.x+j][self.y+i].neighbors[_direction].isLock == True:
                        isBlocked = True
        return isBlocked

    def setLock(self):
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    self.grid[self.x+j][self.y+i].isLock = True

    def goDown(self):
        if not self.isWall(2) and not self.isBlocked(2):
            self.y += 1
```

<img src="tetris3.gif" alt="tetris3" style="zoom:67%;" />

##8.6 令Tetromino Block懂得堆疊

```python
from spot import *
from block import *

class GameBoard(object):
    
    def __init__(self, _gridSize):
        self.grids = []
        self.block = Block(3,0,'T', self.grids)
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)
        self.timer = millis()

    def addNeighbors(self):
        for i in range(10):
            for j in range(20):
                self.grids[i][j].addNeighbors(self.grids)

    def update(self):
        if millis() - self.timer > 200:
            self.timer = millis()
            self.clearGrid()
            self.block.goDown()
            
            if self.block.isWall(2) or self.block.isBlocked(2):
                self.block.setType()
                self.block.setLock()
                self.block = Block(3,0,'T', self.grids)
            
    def show(self):
        self.block.setType()
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show()

    def clearGrid(self):
        for x in range(10):
            for y in range(20):
                if self.grids[x][y].isLock == False:
                    self.grids[x][y].name = ''
```

## 8.7 令Tetromino Block左右移動

```python
from spot import *
from block import *

class GameBoard(object):
    
    def __init__(self, _gridSize):
        self.grids = []
        self.block = Block(3,0,'T', self.grids)
        for x in range(10):
            tempGrids = []
            for y in range(20):
                tempGrids.append(Spot(x, y, x*_gridSize+_gridSize, y*_gridSize+_gridSize, _gridSize, _gridSize))
            self.grids.append(tempGrids)
        self.timer = millis()

    def addNeighbors(self):
        for i in range(10):
            for j in range(20):
                self.grids[i][j].addNeighbors(self.grids)

    def update(self):
        if millis() - self.timer > 200:
            self.timer = millis()
            self.clearGrid()
            self.block.goDown()
            
            if self.block.isWall(2) or self.block.isBlocked(2):
                self.block.setType()
                self.block.setLock()
                self.block = Block(3,0,'T', self.grids)
            
    def show(self):
        self.block.setType()
        for x in range(10):
            for y in range(20):
                self.grids[x][y].show()

    def clearGrid(self):
        for x in range(10):
            for y in range(20):
                if self.grids[x][y].isLock == False:
                    self.grids[x][y].name = ''
```

```python
from spot import *

class Block(object):

    shapeIndex = ['I', 'Z', 'S', 'J', 'L', 'T', 'O']

    # Shapes of the blocks
    shapes = [
        [[1, 5, 9, 13], [4, 5, 6, 7]], #type 'I'
        [[4, 5, 9, 10], [2, 6, 5, 9]], #type 'Z'
        [[6, 7, 9, 10], [1, 5, 6, 10]], #type 'S'
        [[1, 2, 5, 9], [0, 4, 5, 6], [1, 5, 9, 8], [4, 5, 6, 10]], #type 'J'
        [[1, 2, 6, 10], [5, 6, 7, 9], [2, 6, 10, 11], [3, 5, 6, 7]], #type 'L'
        [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]], #type 'T'
        [[1, 2, 5, 6]], #type 'O'
    ]

    def __init__(self, _x, _y, _type, _grid):
        self.x = _x
        self.y = _y
        self.type = _type
        self.grid = _grid

        self.rotation = 0
        self.index = self.shapeIndex.index(self.type)
    
    def shape(self):
        return self.shapes[self.index][self.rotation]

    def rotate(self):
        self.rotation = (self.rotation + 1) % len(self.shapes[self.index])

    def setType(self):
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    self.grid[self.x+j][self.y+i].name = self.type

    def isWall(self, _direction):
        isWall = False
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    if _direction == 2:
                        if i+self.y>=19:
                            isWall = True
                    elif _direction == 3:
                        if self.x+j<=0:
                            isWall = True
                    elif _direction == 1:
                        if self.x+j>=9 :
                            isWall = True
        return isWall

    def isBlocked(self, _direction):
        isBlocked = False
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    if self.grid[self.x+j][self.y+i].neighbors[_direction].isLock == True:
                        isBlocked = True
        return isBlocked

    def setLock(self):
        for i in range(4):
            for j in range(4):
                _index = i*4+j
                if _index in self.shape():
                    self.grid[self.x+j][self.y+i].isLock = True
                
    def goDown(self):
        if not self.isWall(2) and not self.isBlocked(2):
            self.y += 1

    def goLeft(self):
        if not self.isWall(3) and not self.isBlocked(3):
            self.x -= 1

    def goRight(self):
        if not self.isWall(1) and not self.isBlocked(1):
            self.x += 1
```

```python
from spot import *
from gameBoard import *

gridSize = 40

gameBoard = 0

def setup():
    global gameBoard, timer
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()
   
def draw():
    drawBackground()
    gameBoard.update()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)

def keyPressed():
    if (key == CODED):
        if keyCode == LEFT:
            gameBoard.clearGrid()
            gameBoard.block.goLeft()
        if keyCode == RIGHT:
            gameBoard.clearGrid()
            gameBoard.block.goRight()
```

## 8.8Tetromino Block旋轉和快速到底

```python
from spot import *
from gameBoard import *

gridSize = 40

gameBoard = 0

def setup():
    global gameBoard, timer
    size(gridSize*(12+7), gridSize*22)  
    gameBoard = GameBoard(gridSize)
    gameBoard.addNeighbors()
   
def draw():
    drawBackground()
    gameBoard.update()
    gameBoard.show()

def drawBackground():
    fill('#777777')
    for i in range(12+7):
        for j in range(22):
            rect(i*gridSize, j*gridSize, gridSize, gridSize)

def keyPressed():
    if (key == CODED):
        if keyCode == LEFT:
            gameBoard.clearGrid()
            gameBoard.block.goLeft()
        if keyCode == RIGHT:
            gameBoard.clearGrid()
            gameBoard.block.goRight()
        if keyCode == UP:
            gameBoard.clearGrid()
            gameBoard.block.rotate()
        if keyCode == DOWN:
            while  not (gameBoard.block.isWall(2) or gameBoard.block.isBlocked(2)):
                gameBoard.clearGrid()
                gameBoard.block.goDown()
            gameBoard.block.setType()
            gameBoard.block.setLock()
            gameBoard.block = Block(3,0,'T', gameBoard.grids)
```

## 8.9 考考你

1. 在`gameBoard `class中，加入`lineClear()`功能。顧名思義，就是每次`block`鎖定時，都檢查一下有沒有橫行是已經被填滿，而清理全行，上面已經鎖定了的格全部移向下一行。
2. 之後加入一個`line clear counter`，和`block counter`。`block counter`用來紀錄遊戲開始後有多少`block`產生，`line clear counter`用來紀錄有多少行被清除，兩者都是用來為遊戲計分，你可以每一個`block counter`計10分，每個`line clear counter`計100分。
3. (optional)一次過清除一行，line counter加1，一次過清除二行，line counter加3($1+2=3$)，一次過清除3行，line counter加6($1+2+3=6$)，如此類推，一次過清除n行，line counter 就加$\sum_{i=1}^{n}i$

4. (optional)標準的tetris遊戲，除了現有的block供控制外，但有下一個block的內容在等候處，令玩家預先計劃的，你可以嘗試加入這個功能。

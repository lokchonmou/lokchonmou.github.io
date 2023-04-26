# GUI: Button

在很多情況，例如要寫遊戲或是寫一個介面，都需要用到按鍵，當然你可以使用現成的用戶介面library，或者如果你用的是正統python的話，也有很多相關的GUI library可以使用，但自行編寫自己的class的話，除了可以客製化自己的介面和特色外，也可以學習到很多實用內容。

<img src="C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20230426121039742.png" alt="image-20230426121039742" style="zoom:80%;" />


`buttonDemo.pyde`

```python
from button import *

buttonWidth = 80
buttonHeight = 50

b1=0
b2=0
b3=0

def setup():
    global b1, b2, b3
    size(600, 200)
    b1 = Button(width/2-width/4, height/2, buttonWidth, buttonHeight, "Button1")
    b2 = Button(width/2, height/2, buttonWidth, buttonHeight, "Button2")
    b3 = Button(width/2+width/4, height/2, buttonWidth, buttonHeight, "Button3")

def draw():
    background(200)
    b1.show()
    b2.show()
    b3.show()

def mousePressed():
    if b1.overButton():
         print("button1 pressed")
    if b2.overButton():
            print("button2 pressed")
    if b3.overButton():
            print("button3 pressed")
```

`button.py`

```python
class Button:
    def __init__(self, _bx, _by, _w, _h, _label):
        self.bx = _bx
        self.by = _by
        self.w = _w
        self.h = _h
        self.label = _label
        rectMode(CENTER)
        textAlign(CENTER, CENTER)
        textSize(16)

    def show(self):
        stroke('#6F8FFF')
        strokeWeight(4)
        if self.overButton():
            fill('#AAAA00')
        else:
            fill('#FFFF00')
        rect(self.bx, self.by, self.w, self.h,10,10,10,10)
        fill('#000000')
        text(self.label, self.bx, self.by)

    def overButton(self):
        if mouseX > self.bx-self.w/2 and mouseX < self.bx + self.w/2 and mouseY > self.by-self.h/2 and mouseY < self.by + self.h/2:
            return True
        else:
            return False
```

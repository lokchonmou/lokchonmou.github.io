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
 

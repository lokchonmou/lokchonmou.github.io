from spot import *


class GameBoard(object):

    def __init__(self):
        self.grids = []
        for i in range(6):
            temp = []
            for j in range(7):
                temp.append(Spot(i, j, width/7*(j+.5), height/6*(i+.5), ''))
            self.grids.append(temp)

        self.currentRow = 0
        self.currentCol = 0
        self.colHeight = [0, 0, 0, 0, 0, 0, 0]
        self.currentPlayer = 'R'
        self.gameOver = False
        self.winner = None

    def display(self):
        for i in range(6):
                for j in range(7):
                    self.grids[i][j].display()
        if self.gameOver == True:            
            textAlign(CENTER, CENTER)
            textSize(100)
            fill('#0000FF')
            if self.winner == 'R':
                text('YOU WIN!!!!', width/2, height/2)
            elif self.winner == 'Y':
                text('GAME OVER', width/2, height/2)
            

    def swapPlayer(self):
        if self.currentPlayer == 'R':
            self.currentPlayer = 'Y'
        elif self.currentPlayer == 'Y':
            self.currentPlayer = 'R'

    def trigger(self, i):
        if self.gameOver == False:
            if self.colHeight[i] < 6:
                self.colHeight[i] += 1
                self.currentCol = i
                self.currentRow = 6 - self.colHeight[i]
                self.grids[self.currentRow][self.currentCol].value = self.currentPlayer
                self.winner = self.checkWin()
                if self.winner != None:
                    self.gameOver = True
                    return
                self.swapPlayer()

    def checkWin(self):
        gs = self.grids

        # check horizontal
        for i in range(6):
            for j in range(4):
                if gs[i][j].value == gs[i][j+1].value == gs[i][j+2].value == gs[i][j+3].value\
                        and gs[i][j].value != '':
                    return gs[i][j].value

        # check vertical
        for i in range(3):
            for j in range(7):
                if gs[i][j].value == gs[i+1][j].value == gs[i+2][j].value == gs[i+3][j].value\
                        and gs[i][j].value != '':
                    return gs[i][j].value

        # check right cross
        for i in range(3):
            for j in range(4):
                if gs[i][j].value == gs[i+1][j+1].value == gs[i+2][j+2].value == gs[i+3][j+3].value\
                        and gs[i][j].value != '':
                    return gs[i][j].value

        # check left cross
        for i in range(3):
            for j in range(3, 7):
                if gs[i][j].value == gs[i+1][j-1].value == gs[i+2][j-2].value == gs[i+3][j-3].value\
                        and gs[i][j].value != '':
                    return gs[i][j].value

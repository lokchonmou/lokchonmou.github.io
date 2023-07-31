import copy
import random


class aiBrain(object):

    def __init__(self, _gameBoard):
        self.gameBoard = _gameBoard

    def autoPlay(self):
        bestScore = float('inf')
        bestMove = random.randint(0, 5)  # the range is a, b+1

        # //fill the available colume to an list
        availableCol = []
        for j in range(7):
            if self.gameBoard.grids[0][j].value == '':
                availableCol.append(j)
        # shuffle the list
        random.shuffle(availableCol)

        for move in availableCol:
            possibleBoard = copy.deepcopy(self.gameBoard)
            possibleBoard.trigger(move)
            score = self.minimax(possibleBoard, 3, True)
            print(move, score)
            if (score < bestScore):
                bestScore = score
                bestMove = move
            print(bestMove)
        print('')
        self.gameBoard.trigger(bestMove)

    def score(self, _winner):
        if _winner == 'R':
            return 10 
        elif _winner == 'Y':
            return -10 
        elif _winner == 'O':
            return 0
        else:
            return 0

    def minimax(self, _gameBoard, _depth, _isMaximizing):
        winner = _gameBoard.checkWin()
        if winner != None or _depth == 0:
            return self.score(winner) * (10**_depth)

        if _isMaximizing:
            bestScore = 0
            # //fill the available colume to an list
            availableCol = []
            for j in range(7):
                if _gameBoard.grids[0][j].value == '':
                    availableCol.append(j)
            # shuffle the list
            random.shuffle(availableCol)

            for move in availableCol:
                possibleBoard = copy.deepcopy(_gameBoard)
                possibleBoard.trigger(move)
                score = self.minimax(possibleBoard, _depth - 1, False)
                bestScore += score
            return bestScore

        else:
            bestScore = 0
            # //fill the available colume to an list
            availableCol = []
            for j in range(7):
                if _gameBoard.grids[0][j].value == '':
                    availableCol.append(j)
            # shuffle the list
            random.shuffle(availableCol)

            for move in availableCol:
                possibleBoard = copy.deepcopy(_gameBoard)
                possibleBoard.trigger(move)
                score = self.minimax(possibleBoard, _depth - 1, True)
                bestScore += score
            return bestScore

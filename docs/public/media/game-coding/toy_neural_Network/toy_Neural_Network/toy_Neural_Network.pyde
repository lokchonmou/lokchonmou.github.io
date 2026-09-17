from Matrix import *
from nn import *

def setup():
    size(400, 400)

    # test the NeuralNetwork class
    nn = NeuralNetwork(2, 4, 1)
    inputs = [1, 0]
    print("NN prediction before training:")
    print(nn.predict(inputs))

    # train the network with XOR data
    for i in range(5000):
        nn.train([0, 0], [0])
        nn.train([0, 1], [1])
        nn.train([1, 0], [1])
        nn.train([1, 1], [0])
    
    
    # test the trained network
    print("NN prediction after training:")
    print(nn.predict([0, 0]))
    print(nn.predict([0, 1]))
    print(nn.predict([1, 0]))
    print(nn.predict([1, 1]))

    print("all pass")


def draw():
    pass

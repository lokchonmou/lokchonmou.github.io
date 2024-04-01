# Toy Neural Network

這三段程式碼實現了一個簡單的人工神經網路。它包含以下幾個部分:

1. `Matrix.py`提供了一個`Matrix`類別,用於表示和操作矩陣。它實現了常見的矩陣運算,如加法、乘法、轉置等。

2. `nn.py`定義了一個`ActivationFunction`類,用於定義激活函數及其導數。它內置了sigmoid和tanh激活函數。還定義了一個`NeuralNetwork`類,它是一個前饋神經網路,可以進行預測和訓練。

3. `toy_neural_network.pyde`是主程式,它創建了一個簡單的2-4-1層的神經網路(2個輸入節點、4個隱藏層節點、1個輸出節點)。然後使用XOR數據集訓練該網路5000次迭代。最後,它對訓練後的網路進行預測,並輸出結果。

這段程式碼的作用是實現一個簡單的人工神經網路,能夠學習XOR邏輯門。XOR是一個經典的機器學習問題,常用於測試算法和網路的學習能力。

**通過訓練,神經網路應該能夠正確預測XOR的輸出。即對於輸入[0, 0]和[1, 1],輸出為0;對於輸入[0, 1]和[1, 0],輸出為1。**

這個程式演示了如何構建一個簡單的前饋神經網路,以及如何使用反向傳播算法訓練該網路。它包含了處理矩陣計算、激活函數、前向傳播和反向傳播等基本元素。雖然非常簡單,但展示了神經網路的基本工作原理。

我主要參考了The Coding Train的這個playlist，再將其改成Processing for Python版本:

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=9uW_JuMLTwwmhE2W&amp;list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

`toy_neural_network.pyde`:

```PYTHON
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


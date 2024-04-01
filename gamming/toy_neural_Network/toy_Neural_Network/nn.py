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
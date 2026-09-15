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

    
    

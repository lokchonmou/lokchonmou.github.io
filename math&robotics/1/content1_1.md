# 1.1 矩陣Matrix(1)

矩陣matrix，就是一個方型的陣列，裝的內容是數字。例如:
$$
\mathbf{A} = \begin{bmatrix}
1 & 3 \\ 
 -2& 4\\ 
 2& 6
\end{bmatrix}
$$
這就是一個矩陣。矩陣通常會用英文大寫字每來表達，有時字每為粗體，但部分書本則未必會用粗體。

矩陣matrix的size可用行columns和列rows來表達，一般通用寫法為 $m \times n$ ，$m$為行columns，而$n$則為列rows, 例如上述matrix $\mathbf{A}$的size大小則為$3 \times 2$。而矩陣的內容則可以透過下標來表達，例如$\mathbf{A_{12}}$為$3$，而$\mathbf{A_{31}}$則為$2$等。

矩陣的用途是用來計算多元一次方程組，例如經典的**雞兔同籠**問題:

> 今有雉、兔同籠，上有三十五頭，下九十四足。問雉、兔各幾何？
>
> 用現代漢語表示，就是：「現在籠子裏有雞（雉）和兔子在一起。從上面數一共有三十五個頭，從下面數一共有九十四隻腳，問一共有多少只雞、多少只兔子？」

用二元一次方程組，可以表達為:
$$
\left\{\begin{matrix}
x+y = 35 \\ 
2x+4y=94
\end{matrix}\right.
$$
如果用矩陣表示，則可寫成:
$$
\begin{bmatrix}
1 & 1\\ 
2 & 4
\end{bmatrix}
\begin{bmatrix}
x\\ 
y
\end{bmatrix}
=
\begin{bmatrix}
35\\ 
94
\end{bmatrix}
$$
或者可以用幾個矩陣的名稱去表達:
$$
\mathbf{A} \mathbf{X}= \mathbf{B}
$$
那麼只要透過矩陣的標準運算，就能找來$\mathbf{X}$的答案。

矩陣經常出現在高等的應用數學當中，因為複雜的問題大多可以將其化為線性方程組去解，而且例如立體座標，就是常見的三元方程組問題。

[TOC]

##Class的變數

在Matrix class 當中，每個Matrix都是用Processing本身的double array來儲存，每個Matrix class都有3個變數

```java
int m, n;
double[][] value;
```

`m` 和`n`分別就是矩陣的$m$ 和$n$，即行和列，而`value`則是用來儲存矩陣的內容。

##宣告

要宣告新的矩陣，可以用以下幾種方法:

###`Matrix(int _m)`

宣告正方型的矩陣，`Matrix(4)`就是$4 \times 4$的矩陣。

```java
void setup() {
    Matrix T =  new Matrix(4);   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
0.0	0.0	0.0	0.0	
0.0	0.0	0.0	0.0	
0.0	0.0	0.0	0.0	
0.0	0.0	0.0	0.0	
```

###`Matrix(int _m, int _n)`

Matrix(4,1)`就是$4 \times 1$的矩陣。

```java
void setup() {
    Matrix T =  new Matrix(4,1);   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
0.0	
0.0	
0.0	
0.0	
```

### `Matrix(double[][] M)`

直接使用double array來使宣告。

```java
void setup() {
    Matrix T =  new Matrix(new double[][]{{1,3},{2,1},{3,2},{4,1}});   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
1.0	3.0	
2.0	1.0	
3.0	2.0	
4.0	1.0	
```

### `Matrix(PVector v)`

用Processing 的PVector class 來宣告。這是方便用PVector來做空間轉換的。

```java
void setup() {
    Matrix T =  new Matrix(new PVector(50,10,0));   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
50.0	
10.0	
0.0	
1.0	
```

## 常用矩陣

Matrix class中有幾個常用的矩陣方便使用。

### `Matrix ONES(int _m)`

傳回一個$m \times m$ 的方形矩陣，整個矩陣都是`1`

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix T =  Mat.ONES(3);   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
1.0	1.0	1.0	
1.0	1.0	1.0	
1.0	1.0	1.0
```

### `Matrix ZEROS(int _m)`

傳回一個$m \times m$ 的方形矩陣，整個矩陣都是`0`，與新定義一個矩陣是相同的。

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix T =  Mat.ZEROS(2);   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
0.0	0.0	
0.0	0.0	
```

### `Matrix EYES(int _m)`

傳回一個$m \times m$ 的方形單位矩陣(Identity matrix)，在數學上多幾英文大寫$\mathbf{I}$來表示，例如一個$3 \times 3$的單位矩陣就是:
$$
\mathbf{I} = \begin{bmatrix}
1 &0  &0 \\ 
0 & 1 & 0\\ 
 0& 0 &1 
\end{bmatrix}
$$

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix T =  Mat.EYES(3);   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
1.0	0.0	0.0	
0.0	1.0	0.0	
0.0	0.0	1.0
```

## 矩陣的顯示列印與輸出

Matrix class 提供幾個顯示和輸出方法以便檢示。

### `void Print(Matrix M)`

注意`Print()`的`P`為大寫字母，與Processing 原本的`print()`作俱分。

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix T =  new Matrix(3);
    Mat.Print(T);   
    exit();
}

void draw() {
}
```

Result:

```
0.0	0.0	0.0	
0.0	0.0	0.0	
0.0	0.0	0.0
```

### `void Print(Matrix M, int digits)`

後面的`digits`是用來定義print出來的數字有多少個小數位。

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix T =  new Matrix(3);
    Mat.Print(T, 4);   
    exit();
}

void draw() {
}
```

Result:

```
0.0000	0.0000	0.0000	
0.0000	0.0000	0.0000	
0.0000	0.0000	0.0000	
```

### `void Print()`

就是上文一路所見的列印。

```java
void setup() {
    Matrix T =  new Matrix(4,1);   
    T.Print();   
    exit();
}

void draw() {
}
```

Result:

```
0.0	
0.0	
0.0	
0.0
```

### `PVector mat2vector(Matrix M)`

由矩陣轉換為vector，指的是齊次座標的轉換，所以注意，矩陣**必須**為$4\times1$，而且$\mathbf{M_{41}}$**必須**為$1$，即齊次座標已經normalize。

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix T =  new Matrix(new double[][]{{1},{3},{2},{1}});   
    PVector v = Mat.mat2vector(T);
    println(v);
    exit();
}

void draw() {
}
```

Result:

```
[ 1.0, 3.0, 2.0 ]
```

### `PVector mat2vector()`

也可以簡化，`mat2vector()`function中間不需要有argument。

```java
void setup() {
    Matrix T =  new Matrix(new double[][]{{1},{3},{2},{1}});   
    println(T.mat2vector());
    exit();
}

void draw() {
}
```

Result:

```
[ 1.0, 3.0, 2.0 ]
```


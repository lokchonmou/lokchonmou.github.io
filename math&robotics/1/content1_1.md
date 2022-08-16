# 1.1 矩陣Matrix

[TOC]

矩陣matrix，就是一個方型的陣列，裝的內容是數字。例如:
$$
\mathbf{A} = \begin{bmatrix}
1 & 3 \\
 -2& 4\\
 2& 6
\end{bmatrix}
$$
這就是一個矩陣。矩陣通常會用英文大寫字母來表達，有時字母為粗體，但部分書本則未必會用粗體。

<img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Matris.png" style="zoom:30%;" />

矩陣matrix的size可用columns和rows來表達，一般通用寫法為 $m \times n$ ，$m$為rows，而$n$則為columns, 例如上述matrix $\mathbf{A}$的size大小則為$3 \times 2$。而矩陣的內容則可以透過下標來表達，例如$\mathbf{A_{12}}$為$3$，而$\mathbf{A_{31}}$則為$2$等。==由於rows和columns在港臺的叫法和大陸是完全相反的，所以這裡就統一用英文而不用中文表達了。==

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

##Class的變數

在Matrix class 當中，每個Matrix都是用Processing本身的double array來儲存，每個Matrix class都有3個變數

```java
int m, n;
double[][] value;
```

`m` 和`n`分別就是矩陣的$m$ 和$n$，即columns 和 rows，而`value`則是用來儲存矩陣的內容。

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

`Matrix(4,1)`就是$4 \times 1$的矩陣。

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

直接使用`double array`來使宣告。

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

## 基礎運算

就像數學有四則運算一樣，矩陣Matrix也有基礎的運算。

### `Matrix add(Matrix M, Matrix N)`

矩陣相加，首先，相加的矩陣而要size一樣才能相加，而相加的方法就是對應的元素一一相加。
$$
\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
+
\begin{bmatrix}
0 &2 \\
 2& 2\\
 1& 4
\end{bmatrix}
=
\begin{bmatrix}
1+0 &2+2 \\
 4+2& 0+2\\
 3+1& 1+4
\end{bmatrix}
=
\begin{bmatrix}
1 &4 \\
 6& 2\\
 4& 5
\end{bmatrix}
$$
矩陣加法可交換，即:
$$
\mathbf{A}+\mathbf{B}=\mathbf{B}+\mathbf{A}
$$
$$
(\mathbf{A}+\mathbf{B})+\mathbf{C}=\mathbf{A}+(\mathbf{B}+\mathbf{C})
$$

加法可以直接在`add()`函數中直接輸入，或者可以用被加數的函數，減少輸入一個argument，類似於`PVector`的加法, 直接用一個argument來表達，但注意的是，與`PVector`不同, 這個加法只會傳回答案，不會改變原本的內容。即答案需要另一個`Matrix`來裝起。

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix A = new Matrix(new double[][]{{1,2},{4,0},{3,1}});
    Matrix B = new Matrix(new double[][]{{0,2},{2,2},{1,4}});
    Mat.Print(Mat.add(A,B));
    // or use
    // Mat.Print(A.add(B));
    exit();
}

void draw() {
}
```

Result:

```
1.0	4.0
6.0	2.0
4.0	5.0
```

### `Matrix sub(Matrix M, Matrix N)`

與加法一樣，減法就是將矩陣的每個相對應元素相減。

減法可能在argument中輸入被減數和減數: `Matrix sub(Matrix M, Matrix N)`即$\mathbf{M}-\mathbf{N}$，或者簡化，直接用被減數的function，即`Matrix sub(Matrix M)`。
$$
\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
-
\begin{bmatrix}
0 &2 \\
 2& 2\\
 1& 4
\end{bmatrix}
=
\begin{bmatrix}
1-0 &2-2 \\
 4-2& 0-2\\
 3-1& 1-4
\end{bmatrix}
=
\begin{bmatrix}
1 &0 \\
 2& -2\\
 2& -3
\end{bmatrix}
$$

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix A = new Matrix(new double[][]{{1,2},{4,0},{3,1}});
    Matrix B = new Matrix(new double[][]{{0,2},{2,2},{1,4}});
    Mat.Print(Mat.sub(A,B));
    // or use
    // Mat.Print(A.sub(B));
    exit();
}

void draw() {
}
```

Result:

```
1.0	0.0
2.0	-2.0
2.0	-3.0
```

### `Matrix mult(Matrix M, double scaler)`

矩陣的乘法有兩種情況，第一種是矩陣乘以一個數值，即scaler multiplication，那麼只需要將矩陣每個元素都同時乘上這個數值即可:
$$
2 \cdot  \begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
 =
 \begin{bmatrix}
2 \cdot 1 &2 \cdot 2 \\
2 \cdot  4&2 \cdot  0\\
 2 \cdot 3& 2 \cdot 1 \\
\end{bmatrix}
=
\begin{bmatrix}
2 & 4 \\
 8& 0\\
 6 & 2
\end{bmatrix}
$$
數值的乘法是可交換的，即:
$$
s \cdot \mathbf{A} = \mathbf{A} \cdot s
$$

$$
s\cdot \mathbf{A} \mathbf{B}=(s\cdot \mathbf{A}) \mathbf{B} = \mathbf{A}(s\cdot  \mathbf{B})
$$

```java
Matrix Mat = new Matrix();

void setup() {
    Matrix A = new Matrix(new double[][]{{1,2},{4,0},{3,1}});
    Mat.Print(Mat.mult(A, 2));
    // or use
    // Mat.Print(Mat.mult(2, A));
    // or use
    // Mat.Print(A.mult(2));
    exit();
}

void draw() {
}
```

Result:

```
2.0	4.0
8.0	0.0
6.0	2.0
```

### `Matrix mult(Matrix M, Matrix N)`

矩陣第二種乘法是矩陣乘以矩陣Matrix multiplication，矩陣乘法比較特別，並非隨便可以相乘的。

設有一矩陣$\mathbf{A}$，大小為$m \times n$，那麼矩陣$\mathbf{B}$的大小必須為$n\times p$，即矩陣$\mathbf{A}$的columns數量必須等於矩陣$\mathbf{B}$的rows，例如$\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
\begin{bmatrix}
0&2  &1\\
 2& 2&4\\
\end{bmatrix}$可以相乘，$\begin{bmatrix}
0&2  &1\\
 2& 2&4\\
\end{bmatrix}
\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}$ 也可以相乘；但$\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
\begin{bmatrix}
0&2\\
2&2\\
1&4
\end{bmatrix}$則**不能**相乘。
$$
[\mathbf{AB}]_{i,j} = a_{i,1}b_{1,j}+a_{i,2}b_{2,j}+\cdot \cdot \cdot +a_{i,n}b_{n,j}
$$
<img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/MatrixMultiplication.png" alt="matrix multiplication" style="zoom:50%;" />



例如:
$$
\mathbf{AB}
=
\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
\begin{bmatrix}
0&2  &1\\
 2& 2&4\\
\end{bmatrix}
=
\begin{bmatrix}
1 \cdot 0 + 2 \cdot 2  &    1 \cdot 2 + 2 \cdot 2   &   1 \cdot 1+ 2 \cdot 4 \\
 4\cdot 0 + 0 \cdot 2& 4\cdot 2 + 0 \cdot 2 &    4 \cdot 1 + 0\cdot 4\\
 3 \cdot 0 + 1 \cdot 2&  3\cdot 2 + 1 \cdot 2  &  3\cdot 1 + 1 \cdot 4
\end{bmatrix}
=
\begin{bmatrix}
4 & 6 & 9\\
0 & 8 & 4\\
2 & 8 & 7
\end{bmatrix}
$$
又例如:
$$
\mathbf{BA}
=
\begin{bmatrix}
0&2  &1\\
 2& 2&4\\
\end{bmatrix}

\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix}
=
\begin{bmatrix}
0 \cdot 1 + 2 \cdot 4 + 1\cdot 3 &    0 \cdot 2 + 2 \cdot 0 + 1\cdot 1  \\
2 \cdot 1 + 2 \cdot 4 + 4\cdot 3 &   2 \cdot 2 + 2 \cdot 0+ 4\cdot 1
\end{bmatrix}
=
\begin{bmatrix}
11 & 1\\
22 & 8
\end{bmatrix}
$$
從上面可以看到，矩陣相乘除了要求前矩陣的columns數目等於後矩陣的rows數目外，還有相乘是不能交換的，即:
$$
\mathbf{AB} \neq  \mathbf{BA}
$$
但矩陣相乘符合
$$
\mathbf{A(BC)} = \mathbf{(AB)C}
$$

$$
\mathbf{C(A+B)} = \mathbf{CA+CB}
$$

$$
\mathbf{(A+B)C} = \mathbf{AC+BC}
$$



但要記住，
$$
\mathbf{C(A+B)} \neq \mathbf{(A+B)C}
$$


在Matrix class中，可以做用`Matrix mult(Matrix M, Matrix N)`或者`Matrix mult(Matrix N)` 做相乘，如果對應的rows和columns不符，則不能相乘。

```java
Matrix Mat = new Matrix();

void setup() {
      Matrix A = new Matrix(new double[][]{{1, 2}, {4, 0}, {3, 1}});
      Matrix B = new Matrix(new double[][]{{0, 2, 1}, {2, 2, 4}});

      Mat.Print(Mat.mult(A, B)); // or use Mat.Print(A.mult(B));
      Mat.Print(Mat.mult(B, A)); // or use Mat.Print(B.mult(A));
      exit();
}

void draw() {
}
```

Result:

```
4.0	6.0	9.0
0.0	8.0	4.0
2.0	8.0	7.0

11.0	1.0
22.0	8.0
```

### `Matrix transpose(Matrix M)`

就是將整個矩陣橫放，打橫的變成打直。即: ${\mathbf{A_{ij}}}^T = \mathbf{A_{ji}}$ ，一般會用上標$\mathbf{A}^T$來表示
$$
\mathbf{A}=
\begin{bmatrix}
1 &2 \\
 4& 0\\
 3& 1
\end{bmatrix},
\mathbf{A}^T =
\begin{bmatrix}
1 &4 &3\\
 2& 0 & 1\\
\end{bmatrix}
$$
Transpose符合幾個定律:
$$
(c\mathbf{A})^T=c(\mathbf{A})^T
$$
$$
(\mathbf{A}+\mathbf{B})^T=\mathbf{A}^T+\mathbf{B}^T
$$
$$
{(\mathbf{A}^T)}^{T} = \mathbf{A}
$$

```java
Matrix Mat = new Matrix();

void setup() {
      Matrix A = new Matrix(new double[][]{{1, 2}, {4, 0}, {3, 1}});
      Mat.Print(Mat.transpose(A)); //or use Mat.Print(A.transpose());
      Mat.Print(Mat.transpose( A.transpose() ));
      exit();
}

void draw() {
}
```

Result:

```
1.0	4.0	3.0
2.0	0.0	1.0

1.0	2.0
4.0	0.0
3.0	1.0
```

### `Matrix getCofactor(Matrix M, int p, int q)`

Class裡的`getCofactor()`是用來方便之後計算矩陣的determinant的，所以並非完全是數學中的cofactor或者cofactor matrix。這裡的`getCofactor()`會將matrix裡指定的元素整rows和整columns去掉，得出一個$(m-1) \times (n-1)$ 的矩陣。

如果matrix $\mathbf{A} =
\begin{bmatrix}
1 & -1 & -1\\
2 & 3 & 8\\
 -3& 2 & 1
\end{bmatrix}$ ，那麼`getCofactor(A, 1, 2) `  =  $\begin{bmatrix}
1 & -1 & \square \\
\square & \square& \square\\
 -3& 2 & \square
\end{bmatrix}
=
\begin{bmatrix}
1 &-1 \\
 -3& 2
\end{bmatrix}$

值得注意的是，由於`getCofactor()`不是數學而是program上的用法，所以元素的計算是由0開始而非1開始，即最左上角為`A[0][0]`，對應在數學上是$\mathbf{A}_{11}$，而`getCofactor(A, 1, 2) `對應是數學上的$\mathbf{A}_{23}$

```java
Matrix Mat = new Matrix();

void setup() {
      Matrix A = new Matrix(new double[][]{{1, -1, -1}, {2, 3, 8}, {-3, 2, 1}});
      Mat.Print(Mat.getCofactor(A, 1, 2));
      // or use
      // Mat.Print(A.getCofactor(1, 2));
      exit();
}

void draw() {
}
```

Result:

```
1.0		-1.0
-3.0	2.0
```

### `double det(Matrix M)`

det，就是Determinant，矩陣的行列式。一般用$det(\mathbf{A})$ 或者 $|\mathbf{A} |$ 來表達。行式式只存在於正方形矩陣，一般可以看作是面積($2\times 2$矩陣)或者體積($3\times 3$矩陣)，當然還有其他數學上的用法。

找行列式的方法有很多，最方便的方法是用minor, $\mathbf{M}$ 餘子式來找。minor就是利用到上面的`getCofactor()`方法，刪掉相對應的行列所得出的矩陣的行列式。只需要將首rows的元素再乘上$(-1)^{(i+j)}$相加，就可以得到determinant的值。如下:

對1位方型矩陣，其minor就是矩陣本身的數值:
$$
\begin{align*}
\mathbf{A}=[3],\\\mathbf{M}_{11}=3
\end{align*}
$$
對於2位的方型矩陣，
$$
\begin{align*}
\mathbf{A}&=
\begin{bmatrix}
3 &-1 \\
1 & 2
\end{bmatrix},

\\

\mathbf{M}_{11} &=
\begin{vmatrix}
\square &\square \\
\square& 2
\end{vmatrix}=2,

\\

\mathbf{M}_{12} &=
\begin{vmatrix}
\square &\square \\
1& \square
\end{vmatrix} = 1   \\

\end{align*}
$$

$$
\begin{align*}
|\mathbf{A}| &= (-1)^{(1+1)}\mathbf{A}_{11}\mathbf{M}_{11}+(-1)^{(1+2)}\mathbf{A}_{12}\mathbf{M}_{12} \\
&= 3\times2+(-1)\times(-1)\times1 \\
&=7
\end{align*}
$$

對於3位的方陣，
$$
\mathbf{A} =
\begin{bmatrix}
1 & -1 & -1\\
2 & 3 & 8\\
 -3& 2 & 1
\end{bmatrix},
\\
\begin{align*}
|\mathbf{A} | &=
(-1)^{1+1}\mathbf{A}_{11}\mathbf{M}_{11}
+(-1)^{1+2}\mathbf{A}_{12}\mathbf{M}_{12}
+(-1)^{1+3} \mathbf{A}_{13}\mathbf{M}_{13} \\
&=   + 1
\begin{vmatrix}
3 &8 \\
2 &1
\end{vmatrix}
-
 (-1)
\begin{vmatrix}
2 &8 \\
-3&1
\end{vmatrix}
+  (-1)
\begin{vmatrix}
2 &3 \\
-3 &2
\end{vmatrix} \\
&= 0
\end{align*}
$$
如此類推，對於4或以上的任意方陣，計算行列式，只需要將首行row的值乘上其對應的minor就可以了。
$$
\begin{align*}
|\mathbf{A}| &=
(-1)^{1+j} \mathbf{A}_{1j} \mathbf{M}_{1j} + (-1)^{2+j} \mathbf{A}_{2j} \mathbf{M}_{2j} + \cdot \cdot\cdot + (-1)^{n+j} \mathbf{A}_{nj} \mathbf{M}_{nj}   \\
&= \sum_{i=1}^{n}(-1)^{i+j} \mathbf{A}_{ij} \mathbf{M}_{ij}
\end{align*}
$$
![from wiki](https://wikimedia.org/api/rest_v1/media/math/render/svg/91bd99a7bb16d6248286473a5d4db584ea703306)

對於人手來計算，的確是有點麻煩，而且很容易算錯，但對於電腦來說，只需要用recursion遞迴的方法就可以找到了。

```java
Matrix Mat = new Matrix();

void setup() {
      Matrix A = new Matrix(new double[][]{{3,-1},{1,2}});
      Matrix B = new Matrix(new double[][]{{1,-1,-1}, {2,3,8}, {-3,2,1}});
      Matrix C = new Matrix(new double[][]{{0,1,0,-2,1},{1,0,3,1,1},{1,-1,1,1,1},{2,2,1,0,1},{3,1,1,1,2}});
      println(Mat.det(A));      //or use println(A.det());
      println(Mat.det(B));      //or use println(B.det());
      println(Mat.det(C));      //or use println(C.det());
      exit();
}

void draw() {
}
```

Result:

```
7.0
0.0
4.0
```

### ` Matrix adjugate(Matrix M)`

要找出一個正方matrix的Adjugate matrix, $adj(\mathbf{A})$，先要找到其cofactor matrix, $\mathbf{C}$ ，cofactor matrix  就是將其對應的minor $\mathbf{M}$ 值乘上$(-1)^{(i+j)}$，找到cofactor matrix, $\mathbf{C}$之後，就能找到adjugate matrix, $adj(\mathbf{A})$:
$$
\mathbf{C}_{ij} = (-1)^{(i+j)} \mathbf{M}_{ij}
$$

$$
adj(\mathbf{A}) = \mathbf{C}^T
$$

例如:
$$
\mathbf{A} =
 \begin{bmatrix}
a_{11} &  a_{12} &  a_{13} \\
 a_{21} & a_{22}  & a_{23} \\
a_{31}  &a_{32}   &a_{33}  
\end{bmatrix}
\\
\\
\begin{align*}

\mathbf{C} &=
 \begin{bmatrix}
(-1)^{1+1}\mathbf{M}_{11} &  (-1)^{1+2}\mathbf{M}_{12} &  (-1)^{1+3}\mathbf{M}_{13} \\
(-1)^{2+1}\mathbf{M}_{21} & (-1)^{2+2}\mathbf{M}_{22}  & (-1)^{2+3}\mathbf{M}_{23} \\
(-1)^{3+1}\mathbf{M}_{31}  &(-1)^{3+2}\mathbf{M}_{32}   &(-1)^{3+3}\mathbf{M}_{33}  
\end{bmatrix}
\\ &=
\begin{bmatrix}
+\begin{vmatrix}
a_{22} & a_{23}\\
 a_{32}& a_{33}
\end{vmatrix} &  
-\begin{vmatrix}
a_{21} & a_{23}\\
a_{31}& a_{33}
\end{vmatrix} &
+ \begin{vmatrix}
a_{21} & a_{22}\\
a_{31}& a_{32}
\end{vmatrix}  
\\
-\begin{vmatrix}
a_{12} & a_{13}\\
 a_{32} & a_{33}
\end{vmatrix} &  
+\begin{vmatrix}
a_{11} & a_{13}\\
a_{31}& a_{33}
\end{vmatrix} &
- \begin{vmatrix}
a_{11} & a_{12}\\
a_{31}& a_{32}
\end{vmatrix}
\\
+\begin{vmatrix}
a_{12} & a_{13}\\
 a_{22}& a_{23}
\end{vmatrix} &  
-\begin{vmatrix}
a_{11} & a_{13}\\
a_{21}& a_{23}
\end{vmatrix} &
+ \begin{vmatrix}
a_{11} & a_{12}\\
a_{21}& a_{22}
\end{vmatrix}
\end{bmatrix}
\end{align*}
\\
adj(\mathbf{A}) = \mathbf{C}^T
$$

```java
Matrix Mat = new Matrix();

void setup() {
      Matrix A = new Matrix(new double[][]{{3,-1},{1,2}});
      Matrix B = new Matrix(new double[][]{{1, -1, -1}, {2, 3, 8}, {-3, 2, 1}});
      Matrix C = new Matrix(new double[][]{{0,1,0,-2,1},{1,0,3,1,1},{1,-1,1,1,1},{2,2,1,0,1},{3,1,1,1,2}});
      Mat.Print(Mat.adjugate(A));      //or use Mat.Print(A.adjugate());
      Mat.Print(Mat.adjugate(B));      //or use Mat.Print(B.adjugate());
      Mat.Print(Mat.adjugate(C));      //or use Mat.Print(C.adjugate());
      exit();
}

void draw() {
}
```
Result:
```
2.0		1.0
-1.0	3.0

-13.0	-1.0	-5.0
-26.0	-2.0	-10.0
13.0	1.0		5.0

-1.0	-7.0	18.0	16.0	-13.0
-0.0	4.0		-12.0	-8.0	8.0
0.0		-0.0	4.0		4.0		-4.0
-1.0	5.0		-14.0	-12.0	11.0
2.0		6.0		-16.0	-16.0	14.0
```
###`Matrix inverse(Matrix M)`
上面需要找adjugate matrix，為的就是要找出一個matrix的inverse matrix逆矩陣。
$$
\mathbf{A}^{-1} = \frac{1}{|\mathbf{A}|}adj(\mathbf{A})
$$
這裡$adj(\mathbf{A})$是一個與原矩陣大小相同的矩陣，而$\frac{1}{|\mathbf{A}|}$則是一個scaler數值，所以相乘之後是一個與原矩陣大小相同的矩陣。
Matrix inversion的概念有點像數字的倒數 $a^{-1}a = 1$，而矩陣也有相似的特性，相乘之後會得出單位矩陣Identity matrix:
$$
\mathbf{A}\mathbf{A}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I} =
\begin{bmatrix}
 1&0& \cdots &0 &0\\
 0& 1 & 0&\cdots&0\\
 0& 0 & 1&\cdots&0\\
 \vdots &\vdots &\ddots &1&0\\
 0& 0 & \cdots &0&1\\
\end{bmatrix}{}
$$
在概念上也可以應用:
$$
\begin{align*}
\mathbf{A}\mathbf{X}&=\mathbf{B} \\
\mathbf{A}^{-1}\mathbf{A}\mathbf{X}&=\mathbf{A}^{-1}\mathbf{B} \\
\mathbf{X}&=\mathbf{A}^{-1}\mathbf{B}
\end{align*}
$$
所以回歸到最開始的雞兔同籠問題，
> 今有雉、兔同籠，上有三十五頭，下九十四足。問雉、兔各幾何？
>
> 用現代漢語表示，就是：「現在籠子裏有雞（雉）和兔子在一起。從上面數一共有三十五個頭，從下面數一共有九十四隻腳，問一共有多少只雞、多少只兔子？」
$$
\begin{align*}
\begin{bmatrix}
1 & 1\\
2 & 4
\end{bmatrix}
\begin{bmatrix}
x\\
y
\end{bmatrix}
&=
\begin{bmatrix}
35\\
94
\end{bmatrix} \\
\begin{bmatrix}
x\\
y
\end{bmatrix} &=
{\begin{bmatrix}
1 & 1\\
2 & 4
\end{bmatrix}}^{-1}
\begin{bmatrix}
35\\
94
\end{bmatrix} \\
&=
\begin{bmatrix}
23\\
12
\end{bmatrix}


\end{align*}
$$
所以雞有23隻，而兔則有12隻。
```java
Matrix Mat = new Matrix();

void setup() {
      Matrix A = new Matrix(new double[][]{{1,1},{2,4}});
      Matrix B = new Matrix(new double[][]{{35}, {94}});
      Matrix X = Mat.mult(A.inverse(),B);
      Mat.Print(X);
      exit();
}

void draw() {
}
```
Result:
```
23.0
12.0
```

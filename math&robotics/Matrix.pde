class Matrix{

    int m, n;
    double[][] value;

    //======================================

    Matrix(){}

    Matrix(int _m){
        m = n = _m;
        value = new double[m][n];
    }

    Matrix(int _m, int _n){
        m = _m;
        n = _n;
        value = new double[m][n];
    }

    Matrix(double[][] M){
        m = M.length;
        n = M[0].length;

        value = M;
    }

    Matrix(PVector v){
        m = 4;
        n = 1;
        value = new double[m][n];

        value[0][0] = v.x;
        value[1][0] = v.y;
        value[2][0] = v.z;
        value[3][0] = 1.;
    }

    //======================================

    Matrix ONES(int _m){
        Matrix temp = new Matrix(_m);
        for (int i=0; i < _m; i++) {
            for (int j=0; j < _m; j++)
            temp.value[i][j] = 1d;
        }
        return temp;
    }

    Matrix ZEROS(int _m){
        Matrix temp = new Matrix(_m);
        return temp;
    }

    Matrix EYES(int _m){
        Matrix temp = new Matrix(_m);
        for (int i=0; i < _m; i++)
        temp.value[i][i] = 1d;
        return temp;
    }

    //======================================

    void Print(Matrix M){
        M.Print();
    }

    void Print(Matrix M, int digits){
        for (int i = 0; i < M.m; i++){
            for (int j = 0; j < M.n; j++){
                float temp = (float) M.value[i][j];
                print(nf(temp, 0, digits));
                print('\t');
            }
            println();
        }
        println();
    }

    void Print(){
        Print(this, 1);
    }

    //======================================

    PVector mat2vector(Matrix M){
        if (M.m != 4 && M.n != 1){
            println("Error! Matrix sizes are not match" );
            exit();
        }
        else if (M.value[3][0] != 1){
            println("Error! Vector is not normalize" );
            exit();
        }
        else {
            return new PVector((float)M.value[0][0], (float)M.value[1][0], (float)M.value[2][0]);
        }
        return null;
    }

      PVector mat2vector(){
          return mat2vector(this);
    }

    //======================================

    Matrix add(Matrix M, Matrix N){
        if (M.m != N.m || M.n != N.n){
            println("Error! Matrix sizes are not match" );
            exit();
        }
        else {
            Matrix temp = new Matrix(M.m, M.n);
            for (int i = 0; i < M.m; i++){
                for (int j = 0; j < M.n; j++)
                temp.value[i][j] = M.value[i][j] + N.value[i][j];
            }
            return temp;
        }
        return null;
    }

    Matrix add(Matrix M){
        return add(this, M);
    }

    //======================================

    Matrix sub(Matrix M, Matrix N){
        return add(M, N.mult(-1));
    }

    Matrix sub(Matrix M){
        return add(M.mult(-1));
    }

    //======================================

    Matrix mult(Matrix M, double scaler){
        Matrix temp = new Matrix(M.m, M.n);
        for (int i = 0; i < M.m; i++){
            for (int j = 0; j < M.n; j++)
            temp.value[i][j]  = M.value[i][j] * scaler;
        }
        return temp;
    }

    Matrix mult(double scaler, Matrix M){
        return mult(M, scaler);
    }

    Matrix mult(double scaler){
        return mult(this, scaler);

    }

    Matrix mult(Matrix M, Matrix N){
        if (M.n != N.m){
            println("Error! Matrix sizes are not match" );
            exit();
        }
        else {
            Matrix temp = new Matrix(M.m, N.n);
            for (int i = 0 ; i < M.m; i++){
                for (int j = 0 ; j < N.n; j++){
                    double sum = 0;
                    for (int k = 0 ; k < M.n; k++)
                    sum += M.value[i][k] * N.value[k][j];
                    temp.value[i][j] = sum;
                }
            }
            return temp;
        }
        return null;
    }

    Matrix mult(Matrix N){
        return mult(this, N);
    }

    //======================================

    Matrix transpose(Matrix M){
        Matrix temp = new Matrix(M.n, M.m);
        for (int i = 0 ; i < M.m; i++){
            for (int j = 0; j < M.n; j++){
                temp.value[j][i] = M.value[i][j];
            }
        }
        return temp;
    }

    Matrix transpose(){
        return transpose(this);
    }

    //======================================

    double[][] getCofactor(double[][] mat, int p, int q, int _m) {
        int i = 0, j = 0;
        double [][] temp = new double[_m-1][_m-1];
        for (int row = 0; row < _m; row++)
        for (int col = 0; col < _m; col++)
        if (row != p && col != q) {
            temp[i][j++] = mat[row][col];
            if (j == _m - 1) {
                j = 0;
                i++;
            }
        }
        return temp;
    }

    Matrix getCofactor(Matrix M, int p, int q){
        Matrix temp = new Matrix(M.m-1);
        temp.value = getCofactor(M.value, p, q, M.m);
        return temp;
    }

    Matrix getCofactor(int p, int q){
        return getCofactor(this, p, q);
    }

    double determinantOfMatrix(double mat[][], int _n)  {
        double D = 0;
        double temp[][] = new double[_n][_n];
        int sign = 1;

        if (_n == 1)    return mat[0][0];
        for (int f = 0; f < _n; f++){
            temp = getCofactor(mat, 0, f, _n); // Getting Cofactor of mat[0][f]
            D += sign *mat[0][f]*determinantOfMatrix(temp, _n-1);
            sign = -sign;
        }

        return D;
    }

    double det(Matrix M){
        if (m != n){
            println("Error! Matrix is not square matrix" );
            exit();
        }
        else {
            return determinantOfMatrix(M.value, M.m);
        }
        return 0;
    }

    double det(){
        return det(this);
    }

    //======================================
    Matrix adjugate(Matrix M) {
        if (M.m != M.n){
            println("Error! Matrix is not square matrix" );
            exit();
        }
        else if (M.m == 1) return EYES(1);
        else {
            Matrix C = new Matrix(M.m); // cofactor matrix
            for (int i = 0; i < M.m; i++)
                for (int j = 0; j < M.m; j++)
                    C.value[i][j] = (pow(-1, i+j) * M.getCofactor(i, j).det());
            return C.transpose();
        }
        return null;
    }

    Matrix adjugate(){
        return adjugate(this);
    }

    //======================================

    Matrix inverse(Matrix M){
        if (M.det() == 0) {
            println("Error! The determinant of matrix is zero!!!");
            exit();
        }
        else{
            return mult(M.adjugate(), 1/M.det());
        }
        return null;
    }

    Matrix inverse(){
        return inverse(this);
    }


}

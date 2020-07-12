class Matrix{

    int m, n;
    double[][] value;

    //==========================================================================
    //                  THIS IS CONSTRUCTOR OF MATRIX CLASS
    //==========================================================================

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

    //==========================================================================
    //                  END OF CONSTRUCTOR OF MATRIX CLASS
    //==========================================================================



    //==========================================================================
    //                  START OF MATRIX CLASS
    //==========================================================================

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
                print("     ");
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
        assert (M.m == 4 && M.n == 1);
        //println("Error! Matrix sizes are not match" );

        assert(M.value[3][0] == 1);
        // println("Error! Vector is not normalize" );

        return new PVector((float)M.value[0][0], (float)M.value[1][0], (float)M.value[2][0]);

    }
    
      PVector mat2vector(){
          return mat2vector(this);
    }

    //======================================

    Matrix add(Matrix M, Matrix N){
        assert(M.m == N.m && M.n == N.n);
        // println("Error! Matrix sizes are not match" );

        Matrix temp = new Matrix(M.m, M.n);
        for (int i = 0; i < M.m; i++){
            for (int j = 0; j < M.n; j++)
            temp.value[i][j] = M.value[i][j] + N.value[i][j];
        }
        return temp;

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
        assert(M.n == N.m);
        // println("Error! Matrix sizes are not match" );

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
        assert (m == n);
        // println("Error! Matrix is not square matrix" );

        return determinantOfMatrix(M.value, M.m);

    }

    double det(){
        return det(this);
    }

    //======================================
    Matrix adjugate(Matrix M) {
        assert (M.m == M.n);
        // println("Error! Matrix is not square matrix" );

        if (M.m == 1) return EYES(1);
        else {
            Matrix C = new Matrix(M.m); // cofactor matrix
            for (int i = 0; i < M.m; i++)
            for (int j = 0; j < M.m; j++)
            C.value[i][j] = (pow(-1, i+j) * getCofactor(i, j).det());
            return C.transpose();
        }
    }

    Matrix adjugate(){
        return adjugate(this);
    }

    //======================================

    Matrix inverse(Matrix M){
        assert (M.det() != 0);
        // println("Error! The determinant of matrix is zero!!!");

        return mult(M.adjugate(), 1/M.det());

    }

    Matrix inverse(){
        return inverse(this);
    }

    double norm1(Matrix M){
        double MAX = 0;
        for (int j = 0; j < M.n; j++){
            double tmp = 0;
            for (int i = 0; i < M.m; i++)   tmp += Math.abs(M.value[i][j]);
            MAX = tmp > MAX ? tmp : MAX;
        }
        return MAX;
    }

    double norm1(){
        return norm1(this);
    }

    //======================================

    boolean Mat_is_equal(Matrix M, Matrix N){
        return norm1(M.sub(N)) < 1e-6;
    }

    boolean Mat_is_equal(Matrix N){
        return Mat_is_equal(this, N);
    }

    //======================================

    boolean isRotationMatrix(Matrix M){
        assert (M.m == M.n && M.m == 4);

        Matrix R = M.getCofactor(3,3);
        Matrix Rt = M.getCofactor(3,3).transpose();
        return Mat_is_equal(R.mult(Rt), Rt.mult(R));

    }

    boolean isRotationMatrix(){
        return isRotationMatrix(this);
    }

    Matrix skew(PVector v){
          return new Matrix(new double[][]{{0,-v.z,v.y},{v.z,0,-v.x},{-v.y,v.x,0}});
    }

    PVector vex(Matrix A){
     assert(A.m == A.n && A.m == 3);
     assert(Mat_is_equal(A.transpose(), A.mult(-1)));
     return new PVector((float)A.value[2][1], (float)-A.value[2][0], (float)A.value[1][0]);
    }


    //==========================================================================
    //                  END OF MATRIX CLASS
    //==========================================================================




    //==========================================================================
    //                  THIS PART IS 3D ROBOTICS
    //==========================================================================

    double compare_angle(double _angle_1, double _angle_2) {
        double temp;
        if (_angle_2 - _angle_1 > 0d)
            temp = (_angle_2 - _angle_1) >Math.PI? (_angle_2 - _angle_1)-2d*Math.PI:(_angle_2 - _angle_1);
        else  temp = (_angle_2 - _angle_1) < -Math.PI?(_angle_2 - _angle_1)+2d*Math.PI:(_angle_2 - _angle_1);
        return temp;
    }

    Matrix rotX(Matrix M, double _theta){
        assert (M.m == M.n && M.m == 4);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix( new double[][]{{1, 0, 0, 0}, {0, Math.cos(_theta), -Math.sin(_theta), 0}, {0, Math.sin(_theta), Math.cos(_theta), 0}, {0, 0, 0, 1}}));
    }

    Matrix rotX(double _theta){
        return rotX(this, _theta);
    }

    Matrix rotY(Matrix M, double _theta){
        assert (M.m == M.n && M.m == 4);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix( new double[][]{{Math.cos(_theta), 0, Math.sin(_theta), 0}, {0, 1, 0, 0}, {-Math.sin(_theta), 0, Math.cos(_theta), 0}, {0, 0, 0, 1}}));

    }

    Matrix rotY(double _theta){
        return rotY(this, _theta);
    }

    Matrix rotZ(Matrix M, double _theta){
        assert (M.m == M.n && M.m == 4);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix( new double[][]{{Math.cos(_theta), -Math.sin(_theta), 0, 0}, {Math.sin(_theta), Math.cos(_theta), 0, 0}, {0, 0, 1, 0}, {0, 0, 0, 1}}));
    }

    Matrix rotZ(double _theta){
        return rotZ(this, _theta);
    }

    //======================================

    Matrix transX(Matrix M, double _a){
        assert (M.m == M.n && M.m == 4);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix( new double[][]{{1, 0, 0, _a}, {0, 1, 0, 0}, {0, 0, 1, 0}, {0, 0, 0, 1}}));
    }

    Matrix transX(double _a){
        return transX(this, _a);
    }

    Matrix transY(Matrix M, double _a){
        assert (M.m == M.n && M.m == 4);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix( new double[][]{{1, 0, 0, 0}, {0, 1, 0, _a}, {0, 0, 1, 0}, {0, 0, 0, 1}}));
    }

    Matrix transY(double _a){
        return transY(this, _a);
    }

    Matrix transZ(Matrix M, double _a){
        assert (M.m == M.n && M.m == 4);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix( new double[][]{{1, 0, 0, 0}, {0, 1, 0, 0}, {0, 0, 1, _a}, {0, 0, 0, 1}}));
    }

    Matrix transZ(double _a){
        return transZ(this, _a);
    }

    Matrix transXYZ(Matrix M, double _x, double _y, double _z){
        return M.transX(_x).transY(_y).transZ(_z);
    }

    Matrix transXYZ(double _x, double _y, double _z){
        return transXYZ(this, _x, _y, _z);
    }

    //======================================

    Matrix DH_transform(Matrix M, double _thetaZ, double _dZ, double _aX, double _alphaX){
        //read here: https://en.wikipedia.org/wiki/Denavit–Hartenberg_parameters
        return M.rotZ(_thetaZ).transZ(_dZ).transX(_aX).rotX(_alphaX);
    }

    Matrix DH_transform(double _thetaZ, double _dZ, double _aX, double _alphaX){
        return DH_transform(this, _thetaZ, _dZ, _aX, _alphaX);
    }

    //======================================

    Matrix T_to_rotationMatrix(Matrix M){
        assert(M.m == M.n && M.m == 4);
        return M.getCofactor(3,3);
    }

    Matrix T_to_rotationMatrix(){
        return T_to_rotationMatrix(this);
    }

    Matrix rotationMatrix_to_T(Matrix R){
        assert(R.m == R.n && R.m == 3);

        Matrix T = Mat.EYES(4);
        for (int i=0; i < R.m; i++)
            for (int j=0; j < R.n; j++)
                T.value[i][j] = R.value[i][j];

        return T;
    }

    Matrix rotationMatrix_to_T(){
        return rotationMatrix_to_T(this);
    }


    //======================================
    double[] T_to_quaternion(Matrix M){
        double[][] R = M.getCofactor(3,3).value;
        double tr = R[0][0]+R[1][1]+R[2][2];
        double q[] = new double[4];

        if (tr > 0){
            double S = 2d * Math.sqrt(tr + 1d);
            q[0] = 0.25d * S;
            q[1] = (R[2][1] - R[1][2]) / S;
            q[2] = (R[0][2] - R[2][0]) / S;
            q[3] = (R[1][0] - R[0][1]) / S;
        }
        else if (R[0][0] > R[1][1] && R[0][0] > R[2][2]) {
            double S =  2d * Math.sqrt(1d + R[0][0] - R[1][1] - R[2][2]);
            q[0] = (R[2][1] - R[1][2]) / S;
            q[1] = 0.25d *S;
            q[2] = (R[0][1] + R[1][0]) / S;
            q[3] = (R[0][2] + R[2][0]) / S;
        }
        else if (R[1][1] >R[2][2]) {
            double S =  2.0 * Math.sqrt(1d + R[1][1] - R[0][0] -R[2][2]) ;
            q[0] = (R[0][2] - R[2][0]) / S;
            q[1] = (R[0][1] + R[1][0]) / S;
            q[2] = 0.25d * S;
            q[3] = (R[1][2]+R[2][1]) / S;
        }
        else {
            double S =  2.0 * Math.sqrt(1d + R[2][2] - R[0][0] - R[1][1]);
            q[0] = (R[1][0] - R[0][1]) / S;
            q[1] = (R[0][2] + R[2][0]) / S;
            q[2] = (R[1][2] + R[2][1]) / S;
            q[3] = 0.25d * S;
        }
        return q;
    }

    double[] T_to_quaternion(){
        return T_to_quaternion(this);
    }


    Matrix quaternion_to_T(double[] q) {
        double m[][] = new double[4][4];
        double qw = q[0], qx =q[1], qy = q[2], qz = q[3];
        double sqw = qw*qw, sqx = qx*qx, sqy = qy*qy, sqz = qz*qz;
        // invs (inverse square length) is only required if quaternion is not already normalised
        double invs = 1d / (sqx + sqy + sqz + sqw);
        m[0][0] = ( sqx - sqy - sqz + sqw)*invs ; // since sqw + sqx + sqy + sqz =1/invs*invs
        m[1][1] = (-sqx + sqy - sqz + sqw)*invs ;
        m[2][2] = (-sqx - sqy + sqz + sqw)*invs ;

        double tmp1 = qx*qy;
        double tmp2 = qz*qw;
        m[1][0] = 2d * (tmp1 + tmp2)*invs ;
        m[0][1] = 2d * (tmp1 - tmp2)*invs ;

        tmp1 = qx*qz;
        tmp2 = qy*qw;
        m[2][0] = 2d * (tmp1 - tmp2)*invs ;
        m[0][2] = 2d * (tmp1 + tmp2)*invs ;

        tmp1 = qy*qz;
        tmp2 = qx*qw;
        m[2][1] = 2d * (tmp1 + tmp2)*invs ;
        m[1][2] = 2d * (tmp1 - tmp2)*invs ;

        m[3][3] = 1d;

        return new Matrix(m);
    }

    //======================================

    double [] quaternion_to_eulerAxis(double[] q) {
        double eulerAxis[] = new double[4];
        eulerAxis[0] = 2d * Math.acos(q[0]);
        if (Math.sin(eulerAxis[0]/2d) != 0d)
        for (int i =1; i <= 3; i++)
        eulerAxis[i] = q[i]/Math.sin(eulerAxis[0]/2d);
        else{
            eulerAxis[1]=0d;
            eulerAxis[2]=0d;
            eulerAxis[3]=1d;
        }
        return eulerAxis;
    }

    double[] eulerAxis_to_quaternion(double[] eulerAxis){
        double q[] = new double[4];
        q[0] = Math.cos(eulerAxis[0]/2d);
        for (int i =1; i <= 3; i++)
        q[i] = eulerAxis[i] * Math.sin(eulerAxis[0]/2d);
        return q;
    }


    //======================================

    Matrix eulerAxis_to_T(double[] eulerAxis) {
        double q[] = eulerAxis_to_quaternion(eulerAxis);
        return quaternion_to_T(q);
    }

    double[] T_to_eulerAxis(Matrix M){
        double q[] = T_to_quaternion(M);
        return quaternion_to_eulerAxis(q);
    }

    double[] T_to_eulerAxis(){
        return T_to_eulerAxis(this);
    }

    //======================================

    double[] quaternion_to_ypr(double[] q){
        double roll = Math.atan2( 2d*(q[0]*q[1]+q[2]*q[3]) , 1d-2d*(q[1]*q[1]+q[2]*q[2]) );
        double pitch = Math.asin( 2d*(q[0]*q[2]-q[3]*q[1]) );
        double yaw = Math.atan2( 2d*(q[0]*q[3]+q[1]*q[2]) , 1d-2d*(q[2]*q[2]+q[3]*q[3]) );
        return new double[]{yaw, pitch, roll};
    }

    //======================================
    Matrix ypr_to_T(double yaw, double pitch, double roll){
        return EYES(4).rotZ(yaw).rotY(pitch).rotX(roll);
    }

    double[] T_to_ypr(Matrix M){
        double q[] = T_to_quaternion(M);
        return quaternion_to_ypr(q);
    }

    double[] T_to_ypr(){
        return T_to_ypr(this);
    }

    double[] ypr_to_quaternion(double yaw, double pitch, double roll){
        Matrix T = ypr_to_T(yaw, pitch, roll);
        return T_to_quaternion(T);
    }

    double[] eulerAxis_to_ypr(double[] eulerAxis){
        double q[] = eulerAxis_to_quaternion(eulerAxis);
        return quaternion_to_ypr(q);
    }

    double[] ypr_to_eulerAxis(double yaw, double pitch, double roll){
        double q[] = ypr_to_quaternion(yaw, pitch, roll);
        return quaternion_to_eulerAxis(q);
    }

    Matrix Tr_interpolation(Matrix T0, Matrix T1, double s){
        if (Math.abs(s) > 1) s = s/Math.abs(s);

        Matrix Tr = T1.mult(T0.inverse());

        double tV[] = {Tr.value[0][3],Tr.value[1][3],Tr.value[2][3]};
        double tA[] = Tr.T_to_eulerAxis();

        tA[0] = s*compare_angle(0d, tA[0]);
           
        Matrix deltaTr = EYES(4).eulerAxis_to_T(tA).add(EYES(4).transXYZ(s*tV[0], s*tV[1],s*tV[2])).sub(EYES(4));
            
        return T0.mult(deltaTr);
    }

   





    //==========================================================================
    //                  END OF 3D ROBOTICS
    //==========================================================================





    //==========================================================================
    //                  THIS PART IS 2D ROBOTICS
    //==========================================================================

    Matrix rot_2D(Matrix M, double _theta){
        assert(M.m == M.m && M.m == 3);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix(new double[][]{{Math.cos(_theta), -Math.sin(_theta), 0}, {Math.sin(_theta), Math.cos(_theta), 0}, {0,0,1}}));
    }

    Matrix rot_2D(double _theta){
        return rot_2D(this, _theta);
    }

    Matrix transX_2D(Matrix M, double _a){
        assert (M.m == M.n && M.m == 3);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix(new double[][]{{0,0,_a},{0,0,0},{0,0,1}}));
    }

    Matrix transX_2D(double _a){
        return transX_2D(this, _a);
    }

    Matrix transY_2D(Matrix M, double _a){
        assert (M.m == M.n && M.m == 3);
        // println("Error!! Matrix size doesn't match!!");

        return mult(M, new Matrix(new double[][]{{0,0,0},{0,0,_a},{0,0,1}}));
    }

    Matrix transY_2D(double _a){
        return transY_2D(this, _a);
    }

    Matrix transXY_2D(Matrix M, double _x, double _y){
        return M.transX_2D(_x).transY_2D(_y);
    }

    Matrix transXY_2D(double _x, double _y){
        return transXY_2D(this, _x, _y);
    }

    //==========================================================================
    //                  END OF 2D ROBOTICS
    //==========================================================================



}

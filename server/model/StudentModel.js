module.exports = class StudentModel {
    
    constructor(db) {
        this.db = db;
        this.bycrypt = require('bcrypt');
    }
      
    
    createStudent  = async ({ national_code , name , family , email , password }) => {
        try {
            const passwordHashed = await this.bycrypt.hash(password ,parseInt(process.env.SALT_ROUND));
            const result = await this.db.pool.query("INSERT INTO student_tb(national_code , name , family , email , password) VALUES($1 , $2 , $3 ,$4 , $5) RETURNING id;" , [
                national_code , name , family , email , passwordHashed
            ]);

            if(result.rows == null) {
                return -1;
            }
 
            return result.rows[0].id;
        } catch(ex) {
            console.log(ex.message);
            return -1;
        }
    }


    loginStudent = async ({ national_code , password }) => {
        try {
            const result = await this.db.pool.query("SELECT * FROM student_tb WHERE national_code=$1;" , [national_code]);
            if(result.rows.length < 1) {
                return { status: "NOT_FOUND" };
            }

            const isValid = await this.bycrypt.compare(password , result.rows[0].password);
            if(isValid) {
                return { status: "SUCCESS" , rows: result.rows };
            }

            return { status: "PASSWORD" };
        } catch(ex) {
            console.log(ex.message);
            return { status: "ERROR" };
        }
    }

    removeStudent  = async ({ national_code , password }) => {
        try {
            const result = await this.db.query("DELETE FROM student_tb WHERE national_code=$1 AND password=$2" , [national_code , password]);

            if(result.rowCount > 0) 
                return true;
            else 
                return false;
        } catch(ex) {
            console.log(ex.message);
            return false;
        }
    }


    updateStudent  = async ({national_code , family , name , email , password , new_national_code , new_password}) => {
        try {
            const studentForUpdate = await this.db.pool.query("SELECT * FROM student_tb WHERE national_code=$1 ;" , [national_code]);
            if(studentForUpdate.rowCount === 0) {
                return {status: 'ERROR'};
            }

            const isValid = await this.bycrypt.compare(password , studentForUpdate.rows[0].password);
            if(!isValid) {
                return {staus: 'ERROR'};
            }


            const hashedPassword = await this.bycrypt.hash(new_password , parseInt(process.env.SALT_ROUND));
            const result = await this.db.pool.query("UPDATE student_tb SET national_code=$1 , email=$2 , password=$3 , name=$4 , family=$5  WHERE national_code=$6;" ,
                [new_national_code , email , hashedPassword , name , family , national_code]);
        
            if(result.rowCount > 0 ) {
                const studentForUpdate = await this.db.pool.query("SELECT * FROM student_tb WHERE national_code=$1 ;" , [new_national_code]);

                return {status: "SUCCESS" , rows: studentForUpdate.rows};
            }
            return {status: "ERROR"};
        } catch(ex) {
            console.log('catch in updateStudent ' + ex.message);
            return {status: "ERROR"};
        }
    }

}
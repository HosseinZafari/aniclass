const {query} = require('../boot')

module.exports = class StudentModel {
    
    constructor() {
        this.bycrypt = require('bcrypt');
    }
    
    getStudentByEmailNC = async ({nationalCode , email}) => {
        try {
            const result = await  query("SELECT * FROM student_tb WHERE national_code=$1 AND email=$2" , [nationalCode , email])
            return result.rowCount === 0 ? false : result.rows[0]
        } catch(err) {
            console.log(err.message)
            return false
        }
    }
    
    createStudent  = async ({ nationalCode , firstName , lastName , email , password } , registerTime) => {
        try {
            const passwordHashed = await this.bycrypt.hash(password ,parseInt(process.env.SALT_ROUND));
            const result = await query("INSERT INTO student_tb(national_code , name , family , email , password , createdat) VALUES($1 , $2 , $3 ,$4 , $5 , $6) RETURNING id;" , [
                nationalCode , firstName , lastName , email , passwordHashed , registerTime
            ]);

            if(result.rows == null) {
                return false;
            }
 
            return result.rows[0].id;
        } catch(ex) {
            console.log(ex.message);
            throw new Error("مشکلی در سیستم به وجود آماده لطفا بعدا امتحان کنید")
        }
    }


    loginStudent = async ({ nationalCode , password }) => {
        try {
            const result = await query("SELECT * FROM student_tb WHERE national_code=$1;" , [nationalCode]);
            if(result.rows.length < 1) {
                return "NOT_FOUND";
            }

            const isValid = await this.bycrypt.compare(password , result.rows[0].password);
            if(isValid) {
                return result.rows[0]
            }

            return "WRONG_PASSWORD"
        } catch(ex) {
            console.log(ex.message);
            return "ERROR"
        }
    }

    removeStudent  = async ({ national_code , password }) => {
        try {
            const result = await query("DELETE FROM student_tb WHERE national_code=$1 AND password=$2" , [national_code , password]);

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
            const studentForUpdate = await query("SELECT * FROM student_tb WHERE national_code=$1 ;" , [national_code]);
            if(studentForUpdate.rowCount === 0) {
                return {status: 'ERROR'};
            }

            const isValid = await this.bycrypt.compare(password , studentForUpdate.rows[0].password);
            if(!isValid) {
                return {staus: 'ERROR'};
            }


            const hashedPassword = await this.bycrypt.hash(new_password , parseInt(process.env.SALT_ROUND));
            const result = await query("UPDATE student_tb SET national_code=$1 , email=$2 , password=$3 , name=$4 , family=$5  WHERE national_code=$6;" ,
                [new_national_code , email , hashedPassword , name , family , national_code]);
        
            if(result.rowCount > 0 ) {
                const studentForUpdate = await query("SELECT * FROM student_tb WHERE national_code=$1 ;" , [new_national_code]);

                return {status: "SUCCESS" , rows: studentForUpdate.rows};
            }
            return {status: "ERROR"};
        } catch(ex) {
            console.log('catch in updateStudent ' + ex.message);
            return {status: "ERROR"};
        }
    }

}

const {query} = require('../boot')
const bcrypt = require('bcrypt');

module.exports = class StudentModel {
    
    constructor() {
    }
    
    static async getStudentById (id) {
        try {
            const result = await  query("SELECT * FROM student_tb WHERE id=$1" , [id])
            return result.rowCount === 0 ? false : result.rows[0]
        } catch(err) {
            console.log(err.message)
            return false
        }
    }
    
    getStudentByEmailNC = async ({nationalCode , email}) => {
        try {
            const result = await  query("SELECT * FROM student_tb WHERE national_code=$1 OR email=$2" , [nationalCode , email])
            return result.rowCount === 0 ? false : result.rows[0]
        } catch(err) {
            console.log(err.message)
            return false
        }
    }
    
    createStudent  = async ({ nationalCode , firstName , lastName , email , password } , registerTime) => {
        try {
            const passwordHashed = await bcrypt.hash(password ,parseInt(process.env.SALT_ROUND));
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

            const isValid = await bcrypt.compare(password , result.rows[0].password);
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
    
    
    static updateStudent  = async ({nationalCode , email , firstName , lastName , password } , id) => {
        try {
            const studentForUpdate = await query("SELECT * FROM student_tb WHERE id=$1 ;" , [id]);
            if(studentForUpdate.rowCount === 0) {
                return false
            }
            
            const isValid = await bcrypt.compare(password , studentForUpdate.rows[0].password);
            if(!isValid) {
                return 'PASSWORD_IS_WRONG';
            }
            
            const result = await query("UPDATE student_tb SET national_code=$1 , email=$2  , name=$3 , family=$4  WHERE id=$5;" ,
              [nationalCode , email , firstName , lastName , id]);
            
            return result.rowCount > 0 ? true : 'NOT_CHANGED'
        } catch(ex) {
            console.log('ERROR ' + ex);
            return false
        }
    }

}

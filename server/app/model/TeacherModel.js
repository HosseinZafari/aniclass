const { query } = require('../boot')
const bcrypt = require('bcrypt');

module.exports = class TeacherModel {



    createTeacher  = async ({  nationalCode , firstName , lastName , email , password } , registerTime) => {
        try {
            const passwordHashed = await bcrypt.hash(password ,parseInt(process.env.SALT_ROUND));
            const result = await query("INSERT INTO teacher_tb(national_code , name , family , email , password , createdat) VALUES($1 , $2 , $3 ,$4 , $5 , $6) RETURNING id;" , [
                nationalCode , firstName , lastName , email , passwordHashed , registerTime
            ]);

            if(result.rows == null) {
                return false
            }

            return result.rows[0].id;
        } catch(ex) {
            console.log(ex.message)
            return false
        }
    }
    
    getTeacherByEmailNC = async ({nationalCode , email}) => {
        try {
            const result = await  query("SELECT * FROM teacher_tb WHERE national_code=$1 OR email=$2" , [nationalCode , email])
            return result.rowCount === 0 ? false : result.rows[0]
        } catch(err) {
            console.log(err.message)
            return false
        }
    }

    static async getTeacherById (id)  {
        try {
            const result = await  query("SELECT * FROM teacher_tb WHERE id=$1" , [id])
            return result.rowCount === 0 ? false : result.rows[0]
        } catch(err) {
            console.log(err.message)
            return false
        }
    }

    removeTeacher  = async ({ national_code , password }) => {
        try {
            const result = await this.db.query("DELETE FROM teacher_tb WHERE national_code=$1 AND password=$2" , [national_code , password]);

            return result.rowCount > 0;
        } catch(ex) {
            console.log(ex.message);
            return false;
        }
    }

    loginTeacher = async ({ nationalCode , password }) => {
        try {
            const result = await query("SELECT * FROM teacher_tb WHERE national_code=$1;" , [nationalCode]);
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

   static updateTeacher  = async ({nationalCode , email , firstName , lastName , password } , id) => {
        console.log(nationalCode , email , firstName , lastName , password , id)
        try {
            const teacherForUpdate = await query("SELECT * FROM teacher_tb WHERE id=$1 ;" , [id]);
            if(teacherForUpdate.rowCount === 0) {
                return false
            }

            const isValid = await bcrypt.compare(password , teacherForUpdate.rows[0].password);
            if(!isValid) {
                return 'PASSWORD_IS_WRONG';
            }

            const result = await query("UPDATE teacher_tb SET national_code=$1 , email=$2  , name=$3 , family=$4  WHERE id=$5;" ,
                [nationalCode , email , firstName , lastName , id]);

            return result.rowCount > 0 ? true : "NO_CHANGED"
        } catch(ex) {
            console.log('ERROR ' + ex);
            return false
        }
    }

    updateTeacherEmailOrPassword  = async ({password , email , new_email , new_password}) => {
        try {
            const result = await this.db.query("UPDATE teacher_tb SET email=$1 , password=$2  WHERE email=$3 AND password=$4;",
                [new_email , new_password , email , password ]);
        
            if(result.rowCount > 0 ) {
                return {status: "SUCCESS"};
            }
            return {status: "ERROR"};
        } catch(ex) {
            console.log(ex.message);
            return {status: "ERROR"};
        }
    }

}

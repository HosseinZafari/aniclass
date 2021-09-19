const { query } = require('../boot')
module.exports = class TeacherModel {

    constructor(db) {
        this.db = db;
        this.bycrypt = require('bcrypt');
    }


    createTeacher  = async ({  nationalCode , firstName , lastName , email , password}) => {
        try {
            const passwordHashed = await this.bycrypt.hash(password ,parseInt(process.env.SALT_ROUND));
            const result = await this.db.pool.query("INSERT INTO teacher_tb(national_code , name , family , email , password) VALUES($1 , $2 , $3 ,$4 , $5) RETURNING id;" , [
                nationalCode , firstName , lastName , email , passwordHashed
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
            const result = await  query("SELECT * FROM teacher_tb WHERE national_code=$1 AND email=$2" , [nationalCode , email])
            return result.rowCount === 0 ? false : result.rows[0]
        } catch(err) {
            console.log(err.message)
            return false
        }
    }

    getTeacherById = () => {

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

    loginTeacher = async ({ national_code , password }) => {
        try {
            const result = await this.db.pool.query("SELECT * FROM teacher_tb WHERE national_code=$1 ;" , [national_code]);
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

    updateTeacher  = async ({national_code , family , name , email , password , new_national_code , new_password}) => {
        try {
            const teacherForUpdate = await this.db.pool.query("SELECT * FROM teacher_tb WHERE national_code=$1 ;" , [national_code]);
            if(teacherForUpdate.rowCount === 0) {
                return {status: 'ERROR'};
            }

            const isValid = await this.bycrypt.compare(password , teacherForUpdate.rows[0].password);
            if(!isValid) {
                return {staus: 'ERROR'};
            }

            const hashedPassword = await this.bycrypt.hash(new_password , parseInt(process.env.SALT_ROUND));
            const result = await this.db.pool.query("UPDATE teacher_tb SET national_code=$1 , email=$2 , password=$3 , name=$4 , family=$5  WHERE national_code=$6;" ,
                [new_national_code , email , hashedPassword , name , family , national_code]);

            if(result.rowCount > 0 ) {
                const result = await this.db.pool.query("SELECT * FROM teacher_tb WHERE national_code=$1 ;" , [new_national_code]);

                return {status: "SUCCESS" , rows: result.rows};
            }
            return {status: "ERROR"};
        } catch(ex) {
            console.log('catch in updateStudent ' + ex.message);
            return {status: "ERROR"};
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

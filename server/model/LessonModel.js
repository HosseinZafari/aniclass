module.exports = class LessonModel {

    constructor(db) {
        this.db = db;
    }


    createLesson = async ({name , study_id}) => {
        try {
            const result = await this.db.query("INSERT INTO lesson_tb(lesson_name, study_tb_id) VALUES ($1 , $2) RETURNING id; " , [name , study_id]);
            if(result.rows.length > 0) {
                return {status: "success" , id: result.rows[0].id};
            } else {
                return {status: "error"};
            }
        } catch(err) {
            console.log(err.message);
            return {status: "error"};
        }
    }


    removeLesson = async ({id}) => {
        try {
            const result = await this.db.query("DELETE FROM lesson_tb WHERE id=$1" , [id]);
            if(result.rowCount > 0) 
                return true;
            else 
                return false;
        } catch(ex) {
            console.log(ex.message);
            return false;
        }
    }

    getLessonById= async ({id}) => {
        try {
            const result = await this.db.query("SELECT * FROM lesson_tb WHERE id=$1" , [id]);
            console.log(result.rows.length)
            if(result.rows.length > 0) {
                return {status: "success" , row: result.rows[0]};
            } else {
                return {status: "error"};
            }
        } catch(err) {
            console.log(err.message);
            return {status: "error"};
        }
    }

    updateLesson = async ({id , new_name , new_study_id}) => {
        try {
            const result = await this.db.query("UPDATE lesson_tb SET lesson_name=$1 , study_tb_id=$2 WHERE id=$3;" , [new_name , new_study_id , id]);
        
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
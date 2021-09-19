module.exports = class StudyModel {

    constructor(db) {
        this.db = db;
    }

    createStudy = async ({ name }) => {
        try {
            const result = await this.db.query("INSERT INTO study_tb(study_name) VALUES ($1) RETURNING id;" ,  [name]);
            if(result.rows == null || result.rows == undefined) {
                return {status: "error"};
            }

            return { status: "success" , id: result.rows[0].id };
        } catch(ex) {
            console.log(ex.message);
            return { status: "error" };
        }
    }

    removeStudy = async ({id}) => {
        try {
            const result = await this.db.query("DELETE FROM study_tb WHERE id=$1" , [id]);

            if(result.rowCount > 0) 
                return true;
            else 
                return false;
        } catch(ex) {
            console.log(ex.message);
            return false;
        }
    }

    updateStudy = async ({id , new_name}) => {
        try {
            const result = await this.db.query("UPDATE student_tb SET study_name=$1 , WHERE id=$2;" , [new_name , id]);
        
            if(result.rowCount > 0 ) {
                return {status: "SUCCESS"};
            }
            return {status: "ERROR"};
        } catch(ex) {
            console.log(ex.message);
            return {status: "ERROR"};
        }
    }

    getStudyById = async ({id}) => {
        try {
            const result = await this.db.query("SELECT * FROM study_tb WHERE id=$1" , [id]);
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
}
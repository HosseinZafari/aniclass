module.exports = class UniversityModel {

    constructor(db) {
        this.db = db;
    }

    getUniversities = async () => {
        try {
            const result = await this.db.pool.query("SELECT id,name,capacity FROM university_tb;" , []);
            if(result.rowCount > 0) {
                return {status: "success" , rows: result.rows};
            }

            return {status: "error"};
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }

    getUniversityById = async (id) => {
        try {
            const result = await this.db.pool.query("SELECT * FROM university_tb WHERE id=$1;" , [id]);

            if(result.rowCount > 0) {
                return {status: "success" , row: result.rows[0]};
            }
            return {status: "error"};
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }
}
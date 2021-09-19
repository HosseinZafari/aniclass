module.exports = class DepartmentModel {

    constructor(db) {
        this.db = db;
    }

    getDepartments = async () => {
        try {
            const result = await this.db.pool.query("SELECT * FROM department_tb;" , []);
            if(result.rowCount > 0) {
              return {status: "success" , rows: result.rows};
            }

            return {status: "error"};
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }

}
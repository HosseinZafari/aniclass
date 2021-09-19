module.exports = class CityModel {

    constructor(db) {
        this.db = db;
    }

    getAllCity = async () => {
        try {
            const result = await this.db.pool.query("SELECT * FROM city_tb;" , []);
            if(result.rowCount > 0) {
                return {status: 'success' , rows: result.rows} ;
            } else {
                return {status: 'not_found'} ;
            }
        } catch (err) {
            console.log(err.message);
            return {status: 'error'} ;
        }
    }
}
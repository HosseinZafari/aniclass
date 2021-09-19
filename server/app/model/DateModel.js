module.exports = class DateModel {

    constructor(db) {
        this.db = db;
    }


    createDate = async (date) => {
        try {
            const result1 = await this.db.pool.query("INSERT INTO date_tb(dated) SELECT $1 WHERE NOT EXISTS(SELECT dated FROM date_tb WHERE dated=$2)" , [
                date , date
            ]);

            if(result1) {
                const result2 = await this.db.pool.query("SELECT id FROM date_tb WHERE dated=$1" , [date]);
                return {status: 'success' , date_id: result2.rows[0].id}
            } else {
                return {status: 'error'}
            }

        } catch (err) {
            console.log(err.message)
            return {status: 'error'}
        }
    }

}
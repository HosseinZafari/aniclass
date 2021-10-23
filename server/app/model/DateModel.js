const {query} = require('../boot')


module.exports = class DateModel {

    constructor(db) {
        this.db = db;
    }


    static createDate = async (date) => {
        try {
            const result1 = await query("INSERT INTO date_tb(dated) SELECT $1 WHERE NOT EXISTS(SELECT dated FROM date_tb WHERE dated=$2) " , [
                date , date
            ]);

            if(result1) {
                const dates = await query("SELECT id FROM date_tb WHERE dated=$1" , [date]);
                return dates.rows[0].id 
            } else {
                return false
            }

        } catch (err) {
            console.log(err.message)
            return false
        }
    }

}
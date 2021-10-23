const { query } = require('../boot');
const { getStartTimes } = require('../service/Common');
module.exports = class SessionModel {

    constructor(db) {
        this.moment = require('moment-jalaali');
    }

    static createSessionItem = async ({name, date, timeId , classId}) => {
        try {
            const result = await  query("INSERT INTO session_tb(class_tb_id, date_tb_id, time_tb_id, name) VALUES ($1 , $2 , $3,$4) RETURNING id", [
                classId, date, timeId , name
            ]);
            return result.rowCount > 0 ? result.rows[0].id : false
        } catch (err) {
            console.log(err.message)
            return false
        }

    }

    static getSessionByIdClass = async (class_id) => {
        try {
            const result = await query("SELECT session_id, link, dated, name ,start as time\n" +
                "FROM (SELECT session_tb.id as session_id, name ,date_tb_id, time_tb_id, link\n" +
                "      FROM session_tb\n" +
                "               JOIN class_tb ON session_tb.class_tb_id = class_tb.id\n" +
                "      WHERE class_tb_id = $1) sub\n" +
                "         JOIN date_tb ON date_tb_id = date_tb.id\n" +
                "         JOIN time_tb ON time_tb_id = time_tb.id ORDER BY dated , time", [class_id]);
            if(result.rowCount > 0) {
                return result.rows
            } else {
                return 'NOT_FOUND'
            }
        } catch (err) {
            console.log(err.message)
            return false
        }
    }

    static getTimeByDate = async ({classId, date}) => {
        const isHaveDate = await query('SELECT id FROM date_tb WHERE dated=$1' , [date])
        if(isHaveDate.rowCount  === 0) {
            return 'FREE'
        }

        const command = "SELECT university_capacity , class_capacity , dated , start FROM (SELECT *\n" +
            "FROM (SELECT *\n" +
            "      FROM (SELECT *\n" +
            "            FROM (SELECT sub2.university_capacity,\n" +
            "                         class_tb.id       as class_tb_idd,\n" +
            "                         class_tb.capacity as class_capacity\n" +
            "                  FROM (SELECT university_tb.capacity as university_capacity,\n" +
            "                               university_tb.id       as university_tb_id\n" +
            "                        FROM (SELECT university_tb_id FROM class_tb WHERE class_tb.id = $1) sub\n" +
            "                                 JOIN university_tb ON sub.university_tb_id = university_tb.id) sub2\n" +
            "                           JOIN class_tb ON class_tb.university_tb_id = sub2.university_tb_id) sub3\n" +
            "                     JOIN session_tb ON session_tb.class_tb_id = class_tb_idd) sub4\n" +
            "               JOIN date_tb ON date_tb.id = sub4.date_tb_id\n" +
            "               JOIN time_tb ON time_tb.id = sub4.time_tb_id) sub6\n" +
            "WHERE dated = $2) sub7 ORDER BY start";

        try {
            const result = await query(command, [classId, date]);
            return result.rowCount > 0 ? result.rows : 'EMPTY'
        } catch (err) {
            console.log(err.message)
            return false
        }
    } 
    


    static splitSessionAndTime = (sessionRows) => {
        const university_capacity = sessionRows[0].university_capacity;
        console.log(sessionRows)
        const times = new Object(getStartTimes)


        sessionRows.forEach((sessionValue, index) => {
            times.forEach((timeValue, index) => {
                if (timeValue.time === sessionValue.start) {
                    times[index].capacity += parseInt(sessionValue.class_capacity);
                }
            })
        });

        const timesAvailable = times.filter(time =>  university_capacity > time.capacity)
        return timesAvailable;
    }

    removeSession = async ({session_id}) => {
        try {
            const result = await this.db.pool.query("DELETE FROM session_tb WHERE id=$1", [session_id]);
            if(result.rowCount > 0) {
                return {status: 'success'}
            } else {
                return {status: 'error'}
            }
        } catch (err) {
            console.log(err.message)
            return {status: 'error'}
        }
    }


        
}

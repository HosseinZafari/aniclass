module.exports = class SessionModel {

    constructor(db) {
        this.db = db;
        this.moment = require('moment-jalaali');
    }

    createSessionItem = async (class_id, date_id, time_id) => {
        try {
            const result = await this.db.pool.query("INSERT INTO session_tb(class_tb_id, date_tb_id, time_tb_id) VALUES ($1 , $2 , $3) RETURNING id", [
                class_id, date_id, time_id
            ]);
            if(result.rowCount > 0) {
                return {status: 'success' , rows: result.rows[0].id}
            } else {
                return {status: 'error'}
            }
        } catch (err) {
            console.log(err.message)
            return {status: 'error'}
        }

    }

    getSessionByIdClass = async (class_id) => {
        try {
            const result = await this.db.pool.query("SELECT session_id, link, dated, start as time\n" +
                "FROM (SELECT session_tb.id as session_id, date_tb_id, time_tb_id, link\n" +
                "      FROM session_tb\n" +
                "               JOIN class_tb ON session_tb.class_tb_id = class_tb.id\n" +
                "      WHERE class_tb_id = $1) sub\n" +
                "         JOIN date_tb ON date_tb_id = date_tb.id\n" +
                "         JOIN time_tb ON time_tb_id = time_tb.id ORDER BY dated , time", [class_id]);
            if(result.rowCount > 0) {
                return {status: 'success' , rows: result.rows}
            } else {
                return {status: 'error'}
            }
        } catch (err) {
            console.log(err.message)
            return {status: 'error'}
        }
    }

    getAllSession = async ({class_id, date}) => {
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
            const result = await this.db.pool.query(command, [class_id, date]);
            if (result.rowCount > 0) {
                return {status: 'success', rows: result.rows}
            } else {
                return {status: 'empty'}
            }
        } catch (err) {
            console.log(err.message)
            return {status: 'error'}
        }
    }


    splitSessionAndTime = (sessionRows) => {
        const university_capacity = sessionRows[0].university_capacity;
        const times = [
            {id: 1, time: "06:00:00", capacity: 0},
            {id: 2, time: "07:00:00", capacity: 0},
            {id: 3, time: "08:00:00", capacity: 0},
            {id: 4, time: "09:00:00", capacity: 0},
            {id: 5, time: "10:00:00", capacity: 0},
            {id: 6, time: "11:00:00", capacity: 0},
            {id: 7, time: "12:00:00", capacity: 0},
            {id: 8, time: "13:00:00", capacity: 0},
            {id: 9, time: "14:00:00", capacity: 0},
            {id: 10, time: "15:00:00", capacity: 0},
            {id: 11, time: "16:00:00", capacity: 0},
            {id: 12, time: "17:00:00", capacity: 0},
            {id: 13, time: "18:00:00", capacity: 0},
            {id: 14, time: "19:00:00", capacity: 0},
            {id: 15, time: "20:00:00", capacity: 0},
            {id: 16, time: "21:00:00", capacity: 0}
        ];


        sessionRows.forEach((sessionValue, index) => {
            times.forEach((timeValue, index) => {
                if (timeValue.time === sessionValue.start) {
                    times[index].capacity += parseInt(sessionValue.class_capacity);
                }
            })
        });

        times.forEach((time, index) => {
            if (university_capacity <= time.capacity) {
                times.splice(index, 1);
            }
        });

        return times;
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
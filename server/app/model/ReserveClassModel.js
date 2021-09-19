const { query } = require('../boot')

module.exports =  class ReserveClassModel {

    static reserveClass = async (studentId , classId) => {
        try {
            const result = await query("INSERT INTO class_reserved_tb (student_tb_id , class_tb_id) VALUES($1 , $2) RETURNING id" , [studentId , classId]);
            if(result.rows.length > 0)
                return true
            else
                return false
        } catch(err) {
            console.log(err.message);
            return false;
        }
    }

   static getReservedClass = async ({student_id , class_id}) => {
        try {
            const result = await query("SELECT * FROM class_reserved_tb WHERE class_reserved_tb.student_tb_id=$1 AND class_reserved_tb.class_tb_id=$2;" , [student_id , class_id]);
            if(result.rows.length > 0)
                return {status: 'success' , data: true};
            else
                return {status: 'success' , data: false};
        } catch(err) {
            console.log(err.message);
            return {status: 'error'};
        }
    }

    unreserveClass = async ({student_id , class_id}) => {
        try {
            const result = await this.db.pool.query("DELETE FROM class_reserved_tb WHERE class_reserved_tb.student_tb_id=$1 AND class_reserved_tb.class_tb_id=$2" , [student_id , class_id]);
            console.log(result);
            if(result.rowCount > 0)
                return {status: 'success' , data: false};
            else
                return {status: 'error'};
        } catch(err) {
            console.log(err.message);
            return {status: 'error'};
        }
    }

   static getAllReservedClass = async (studentId) => {
        try {
            const query = "SELECT sub.id  as id,\n" +
                "       class_id,\n" +
                "       class_title,\n" +
                "       department_name,\n" +
                "       teacher_tb.name   as teacher_name,\n" +
                "       teacher_tb.family as teacher_family\n" +
                "\n" +
                "FROM (SELECT class_reserved_tb.id as id,\n" +
                "             class_tb_id          as class_id,\n" +
                "             teacher_tb_id        as teacher_id,\n" +
                "             departmant_tb_id     as department_id,\n" +
                "             class_tb.title       as class_title\n" +
                "      FROM class_reserved_tb\n" +
                "               JOIN class_tb ON class_reserved_tb.class_tb_id = class_tb.id\n" +
                "      WHERE class_reserved_tb.student_tb_id = $1\n" +
                "     ) sub\n" +
                "         JOIN department_tb ON department_tb.id = department_id\n" +
                "         JOIN teacher_tb ON teacher_tb.id = teacher_id;";

            const result = await query(query , [studentId]);
            if(result.rows.length > 0)
                return result.rows
            else
                return false
        } catch(err) {
            console.log(err.message);
            return false
        }
    }
}

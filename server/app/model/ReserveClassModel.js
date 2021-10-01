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

    static unReserveClass = async (student_id , class_id) => {
        try {
            const result = await query("DELETE FROM class_reserved_tb WHERE class_reserved_tb.student_tb_id=$1 AND class_reserved_tb.class_tb_id=$2" , [student_id , class_id]);
            if(result.rowCount > 0)
                return true;
            else
                return false;
        } catch(err) {
            console.log(err.message);
            return false
        }
    }

    static getAllReservedClassCountStudent = async (studentId) => {
      try {
        const cmd = "SELECT COUNT(*) FROM class_reserved_tb WHERE student_tb_id=$1"
    
        const result = await query(cmd , [studentId]);
        if(result.rows.length > 0)
          return result.rows[0]
        else
          return false
      } catch(err) {
        console.log(err.message);
        return false
      }
    }
    
    static getAllReservedClassCountTeacher = async (teacherId) => {
      try {
        const cmd = "SELECT COUNT(*) FROM class_tb WHERE teacher_tb_id=$1"
    
        const result = await query(cmd , [teacherId]);
        if(result.rows.length > 0)
          return result.rows[0]
        else
          return false
      } catch(err) {
        console.log(err.message);
        return false
      }
    }
    
   static getClassReservedByStudentId =  async (id) => {
     try {
       const cmd = "SELECT * FROM class_reserved_tb WHERE student_tb_id=$1"
    
       const result = await query(cmd , [id]);
       if(result.rows.length > 0)
         return result.rows
       else
         return false
     } catch(err) {
       console.log(err.message);
       return false
     }
   }
   
   static getAllReservedClass = async (studentId) => {
        try {
            const cmd = "SELECT sub.id as id,class_id, class_title, description , department_name, teacher_tb.name as teacher_name,teacher_tb.family as teacher_family , university_tb.name as university_name FROM (SELECT class_reserved_tb.id as id, class_tb_id as class_id, teacher_tb_id as teacher_id, departmant_tb_id as department_id, university_tb_id as university_id, class_tb.title as class_title , class_tb.description as description FROM class_reserved_tb JOIN class_tb ON class_reserved_tb.class_tb_id = class_tb.id WHERE class_reserved_tb.student_tb_id = $1 ) sub JOIN department_tb ON department_tb.id = department_id JOIN university_tb ON university_tb.id = university_id JOIN teacher_tb ON teacher_tb.id = teacher_id;";
            const result = await query(cmd , [studentId]);
            if(result.rows.length > 0)
                return result.rows
            else
                return 'NOT_FOUND'
        } catch(err) {
            console.log(err.message);
            return false
        }
    }
   static getAllReservedClassTeacher = async (id) => {
        try {
            const cmd = 'SELECT\n' +
              '       class_id,\n' +
              '       class_title,\n' +
              '       description,\n' +
              '       department_name,\n' +
              '       teacher_tb.name    as teacher_name,\n' +
              '       teacher_tb.family  as teacher_family,\n' +
              '       university_tb.name as university_name\n' +
              'FROM (SELECT id                   as class_id,\n' +
              '             teacher_tb_id        as teacher_id,\n' +
              '             departmant_tb_id     as department_id,\n' +
              '             university_tb_id     as university_id,\n' +
              '             class_tb.title       as class_title,\n' +
              '             class_tb.description as description\n' +
              '      FROM class_tb\n' +
              '      WHERE class_tb.teacher_tb_id = $1) sub\n' +
              '         JOIN department_tb ON department_tb.id = department_id\n' +
              '         JOIN university_tb ON university_tb.id = university_id\n' +
              '         JOIN teacher_tb ON teacher_tb.id = teacher_id\n'
            const result = await query(cmd , [id]);
            if(result.rows.length > 0)
                return result.rows
            else
                return 'NOT_FOUND'
        } catch(err) {
            console.log(err.message);
            return false
        }
    }
}

const { query } = require('../boot')
module.exports =  class ClazzModel {

    static createClass  = async (teacher_id , { description , class_code , capasity , link , title,  department_id , university_id , password}) => {
      try {
        const result = await query('INSERT INTO class_tb (teacher_tb_id , description , link , capacity , title , class_code , departmant_tb_id , university_tb_id , password) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9) RETURNING id' , [teacher_id , description , link , capasity, title,  class_code , department_id , university_id , password]);
        return result.rowCount > 0
      } catch(err) {
        console.log(err.message)
        return false
      }
    }

    getClassesByLastId = async (req) => {
        var slicedQuery = ["SELECT * FROM lesson_tb " , " ORDER BY lesson_tb.id DESC LIMIT 6 "];
        let rightQuery = '';
        let isFirst = false;
      
        switch(req.query.direction) {
          case 'first': {
            rightQuery = slicedQuery[0] + slicedQuery[1] ;
            isFirst = true;
            break;
          }
          case 'next' : {
            rightQuery = slicedQuery[0] + ' WHERE lesson_tb.id < $1 ' + slicedQuery[1];
            break;
          }
          case 'last' : {
            rightQuery = slicedQuery[0] + ' WHERE lesson_tb.id >= $1 ' + slicedQuery[1];
            break;
          }
        }
        
        let result = undefined;
        try {
            if(isFirst) {
                result = await this.db.query(rightQuery);
            } else {
                result = await this.db.query(rightQuery , [Number(req.query.lastid)]);
            }
        } catch(ex) {
            return {lastId: -1 , result: null};
        }

        let lastId = -1;
        if(result.rows.length > 0) {
          lastId = result.rows[result.rows.length - 1].id;
        }
        return {lastId: lastId , result: result};
    }

    static getClassById = async (id) => {
      try {
        const result = await query("SELECT class_tb.id , class_tb.title , class_tb.capacity , class_tb.class_code , class_tb.description , class_tb.link , teacher_tb.name as teacher_name ,  teacher_tb.family as teacher_family ,university_tb.name as university_name, department_tb.department_name as department_name FROM class_tb JOIN teacher_tb ON class_tb.teacher_tb_id=teacher_tb.id JOIN department_tb ON class_tb.departmant_tb_id=department_tb.id JOIN university_tb ON class_tb.university_tb_id=university_tb.id WHERE class_tb.id=$1;" , [parseInt(id)])
        if(result.rowCount > 0) {
            return result.rows[0]
        } else {
            return 'NOT_FOUND'
        }
      } catch(err) {
          console.log(err.message);
          return false;
      }
    }
    
    static getPasswordClass = async (id) => {
      try {
        const result = await query('SELECT password FROM class_tb WHERE id=$1' , [id])
        if(result.rowCount > 0) {
            return result.rows[0]
        } else {
            return false
        }
      } catch(err) {
          console.log(err.message);
          return false;
      }
    }

    getLastClass = async (num) => {
      try {
        const result = await this.db.pool.query("SELECT class_tb.id,class_tb.title,teacher_tb.name as teacher_name,teacher_tb.family as teacher_family,department_tb.department_name as department,university_tb.name as uni FROM class_tb JOIN teacher_tb ON class_tb.teacher_tb_id = teacher_tb.id JOIN department_tb ON class_tb.departmant_tb_id = department_tb.id JOIN university_tb ON class_tb.university_tb_id = university_tb.id ORDER BY id DESC LIMIT $1 ;" , [parseInt(num)]);
        if(result.rowCount > 0) {
            return {status: "success" , rows: result.rows};
        } else {
            return {status: "not_found"};
        }
      } catch(err) {
          console.log(err.message);
          return {status: "error"};
      }
    }

    updateClass = async ({description , link , title , class_code , capasity , class_id , department_id , university_id , teacher_id }) => {
        try {
            const result = await this.db.pool.query("UPDATE class_tb SET class_code=$1 , title=$2 , link=$3 , description=$4 , departmant_tb_id=$5 , university_tb_id=$6 , capacity=$7 WHERE teacher_tb_id=$8 AND class_tb.id=$9;" , [
                class_code , title , link , description , department_id , university_id , capasity , teacher_id , class_id
            ]);

            return result.rowCount > 0 ? {status: 'SUCCESS'} :  {status: 'error'};
        } catch (err) {
            console.log(err.message);
            return {status: 'error'};
        }
    }


    getClassesTeacher = async (teacherId) => {
        try {
            const result = await this.db.pool.query("SELECT class_tb.id , class_tb.title , teacher_tb.name , teacher_tb.family, department_tb.department_name FROM class_tb JOIN teacher_tb ON class_tb.teacher_tb_id=teacher_tb.id JOIN department_tb ON class_tb.departmant_tb_id=department_tb.id WHERE class_tb.teacher_tb_id=$1;" , [teacherId]);
            if(result.rowCount > 0) {
                return {status: "success" , rows: result.rows};
            } else {
                return {status: "not_found" , rows: result.rows};
            }
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }

    static removeClass  = async ( teacherId , classId ) => {
      try {
        console.log(teacherId , classId)
        const cleanReserved = await query("DELETE FROM class_reserved_tb WHERE class_reserved_tb.class_tb_id=(SELECT id FROM class_tb WHERE class_tb.teacher_tb_id=$1 AND class_tb.id=$2);" , [teacherId , classId]);
        const cleanSession = await query("DELETE FROM session_tb WHERE session_tb.class_tb_id=(SELECT id FROM class_tb WHERE class_tb.teacher_tb_id=$1 AND class_tb.id=$2);" , [teacherId , classId]);
        const result = await query("DELETE FROM class_tb WHERE class_tb.teacher_tb_id=$1 AND class_tb.id=$2;" , [teacherId , classId]);
        return result.rowCount > 0 ;
      } catch(err) {
        console.log(err.message);
        return false
      
     }
    }
}

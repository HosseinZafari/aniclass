const { query } = require('../boot')
module.exports = class DepartmentModel {
  
    static getDepartments = async (universityId , teacherId) => {
        try {
            const result = await query(" SELECT * FROM teacher_access_department_tb  JOIN department_tb ON teacher_access_department_tb.department_id=department_tb.id WHERE teacher_id=$1 AND university_id=$2 " , [teacherId , universityId]);
            return result.rowCount > 0 ? result.rows : "NOT_FOUND"
        } catch (err) {
            console.log(err.message); 
            return false
        }
    }
    
    
    static addDepartmentAccessTeacher = async (universityId , qrcode , teacherId) => {
        try {
            const isValid = await query("SELECT * FROM university_access_department_tb WHERE secure_code=$1 AND university_id=$2" ,[qrcode , universityId])
            if(isValid.rowCount > 0){
                const result = await query("INSERT INTO teacher_access_department_tb ( university_id, teacher_id, department_id)  VALUES  ($1 , $2 , $3) RETURNING id" , [universityId , teacherId , isValid.rows[0].department_id]);
                if(result.rowCount > 0) {
                    return true
                } else
                    return false 
            } else {
                return "WRONG_QRCODE"
            }
        } catch (err) {
            console.log(err.message);
            return false
        }
    }

}

const {query} = require('../boot')

module.exports = class UniversityModel {

    getUniversityByQrcode = async ({qrcode}) => {
        try {
            const result = await query("SELECT id FROM university_tb WHERE qrcode=$1" , [qrcode])
            return result.rowCount > 0 ? result.rows[0] : false;
        } catch(err) {
            console.log(err)
            return false
        }
    }
    
    getUniversityByQrcodeForStudent = async ({qrcode}) => {
        try {
            const result = await query("SELECT id FROM university_tb WHERE student_qrcode=$1" , [qrcode])
            return result.rowCount > 0 ? result.rows[0] : false;
        } catch(err) {
            console.log(err)
            return false
        }
    }
    
    static addUniversityReserveForTeacher = async (teacherId  , password) => {
        try {
            const isValidPassword = await query("SELECT * FROM university_tb WHERE qrcode=$1" , [password])
            const isExistsUniversity = await query("SELECT id FROM uni_reserved_teacher_tb WHERE uni_reserved_teacher_tb.universityid=$1 AND uni_reserved_teacher_tb.teacherid=$2" , [isValidPassword.rows[0].id , teacherId])
            if(isExistsUniversity.rowCount !== 0) {
                return "CONFLICT"
            }
            
            if(isValidPassword.rowCount > 0 ){
                const result = await query("INSERT INTO uni_reserved_teacher_tb (teacherid, universityid ) VALUES ($1 , $2) RETURNING id " , [teacherId , isValidPassword.rows[0].id])
                return result.count !== 0
            } else {
                return "WRONG_PASSWORD"
            }
        } catch(err) {
            console.log(err.message)
            return false
        }
    }
    
    static addUniversityReserveForStudent = async (studentId , universityId ) => {
        try {
            const result = await query("INSERT INTO uni_reserved_student_tb (studentid, universityid ) VALUES ($1 , $2) RETURNING id " , [studentId , universityId])
            return result.count !== 0
        } catch(err) {
            console.log(err.message)
            return true
        }
        
    }
    
    static getUniversities = async () => {
        try {
            const result = await query("SELECT id,name,capacity FROM university_tb;" , []);
            if(result.rowCount > 0) {
                return {status: "success" , rows: result.rows};
            }

            return {status: "error"};
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }
    
    static getUniversityByTeacherId = async (teacherId) => {
        try {
            const result = await query("SELECT university_tb.id,university_tb.name,university_tb.capacity FROM university_tb JOIN uni_reserved_teacher_tb ON university_tb.id = uni_reserved_teacher_tb.universityid WHERE uni_reserved_teacher_tb.teacherid=$1; " , [teacherId]);
            return result.rowCount > 0 ? result.rows : false
        } catch (err) {
            console.log(err.message);
            return false
        }
    }

    static getUniversityById = async (id) => {
        try {
            const result = await this.db.pool.query("SELECT * FROM university_tb WHERE id=$1;" , [id]);

            if(result.rowCount > 0) {
                return {status: "success" , row: result.rows[0]};
            }
            return {status: "error"};
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }
}

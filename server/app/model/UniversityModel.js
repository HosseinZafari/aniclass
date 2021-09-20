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
    
    addUniversityReserveForTeacher = async (teacherId , universityId) => {
        try {
            const result = await query("INSERT INTO uni_reserved_teacher_tb (teacherid, universityid ) VALUES ($1 , $2) RETURNING id " , [teacherId , universityId])
            return result.count !== 0
        } catch(err) {
            console.log(err.message)
            return true
        }
    }
    
    addUniversityReserveForStudent = async (studentId , universityId ) => {
        try {
            const result = await query("INSERT INTO uni_reserved_student_tb (studentid, universityid ) VALUES ($1 , $2) RETURNING id " , [studentId , universityId])
            return result.count !== 0
        } catch(err) {
            console.log(err.message)
            return true
        }
        
    }
    
    getUniversities = async () => {
        try {
            const result = await this.db.pool.query("SELECT id,name,capacity FROM university_tb;" , []);
            if(result.rowCount > 0) {
                return {status: "success" , rows: result.rows};
            }

            return {status: "error"};
        } catch (err) {
            console.log(err.message);
            return {status: "error"};
        }
    }

    getUniversityById = async (id) => {
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

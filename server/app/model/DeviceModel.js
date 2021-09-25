const {query} = require('../boot')

module.exports = class DeviceModel {
  
  static async getDeviceTeacherOrStudentByToken (token) {
    const isStudent = this.getDeviceStudentByToken(token)
    return isStudent ? isStudent : this.getDeviceTeacherByToken(token)
  }
  
  static async getDeviceTeacherByToken (token) {
    try {
      const result = await query("SELECT * FROM device_teacher_tb WHERE token=$1" , [token])
      return result.rowCount > 0 ? result.rows[0] : false
    } catch (err) {
      console.log(err.message)
      return false
    }
  }
  
  static async newDeviceStudent(studentId , ip  , token , deviceName , lastAccess ) {
    try {
      const result = await query("INSERT INTO device_student_tb(\"studentId\", ip ,  token ,\"deviceName\" , \"lastAccess\" ) VALUES($1 , $2 , $3 ,$4 , $5) RETURNING id;" , [
        studentId , ip  , token , deviceName , lastAccess
      ]);
    
      if(result.rows == null) {
        return false;
      }
    
      return result.rows[0].id;
    } catch(ex) {
      console.log(ex.message);
      return false
    }
  }
  
  static async getDeviceStudentByToken (token) {
    try {
      const result = await query("SELECT * FROM device_student_tb WHERE token=$1" , [token])
      return result.rowCount > 0 ? result.rows[0] : false
    } catch (err) {
      console.log(err.message)
      return false
    }
  }
  
  
  static async updateLastAccess (date , token) {
    try {
      const result = await query("Update device_student_tb SET \"lastAccess\"=$1 WHERE token=$2" , [date , token])
      return result.rowCount > 0;
    } catch (err) {
      console.log(err.message)
      return false
    }
  }
  
  
  
  static async newDeviceTeacher(teacherId , ip  , token , deviceName , lastAccess) {
    try {
      const result = await query("INSERT INTO device_teacher_tb(\"teacherId\", ip ,  token ,\"deviceName\" , \"lastAccess\" ) VALUES($1 , $2 , $3 ,$4 , $5) RETURNING id;" , [
        teacherId , ip  , token , deviceName , lastAccess
      ]);
    
      if(result.rows == null) {
        return false;
      }
    
      return result.rows[0].id;
    } catch(ex) {
      console.log(ex.message);
      return false
    }
  }
  
}

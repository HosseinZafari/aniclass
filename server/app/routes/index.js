const studentRouter = require('./students')
const teacherRouter = require('./teachers')
const studentController = require('../controller/StudentsController')
const teacherController = require('../controller/TeacherController')
const { body, checkSchema } = require('express-validator')
const { schemaRegisterStudent , schemaLoginStudent  } = require('../schema')
const auth = require('../middleware/auth')

module.exports = (app) => {
  // Student
  app.post('/api/v1/student/register', schemaRegisterStudent , studentController.studentRegister)
  app.post('/api/v1/student/login' , schemaLoginStudent,  studentController.studentLogin)
  app.use('/api/v1/student', [auth], studentRouter)
  
  // Teacher
  app.use('/api/v1/teacher/login', teacherController.teacherLogin)
  app.use('/api/v1/teacher/register', teacherController.teacherRegister)
  app.use('/api/v1/teacher', [auth], teacherRouter)
  
}

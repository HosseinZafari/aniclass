const studentRouter = require('./students')
const teacherRouter = require('./teachers')
const studentController = require('../controller/StudentsController')
const teacherController = require('../controller/TeacherController')
const {
  body,
  checkSchema
} = require('express-validator')
const {
  schemaRegisterStudent,
  schemaLoginStudent,
  schemaRegisterTeacher,
  schemaLoginTeacher
} = require('../schema')
const auth = require('../middleware/auth')
const userController = require('../controller/UserController')

module.exports = (app) => {
  // Get User Info
  app.get('/api/v1/authentication' , [auth] , userController.authentication)
  // Student
  app.post('/api/v1/student/register', schemaRegisterStudent, studentController.studentRegister)
  app.post('/api/v1/student/login', schemaLoginStudent, studentController.studentLogin)
  app.use('/api/v1/student', [auth], studentRouter)
  
  // Teacher
  app.use('/api/v1/teacher/login', schemaLoginTeacher, teacherController.teacherLogin)
  app.use('/api/v1/teacher/register', schemaRegisterTeacher, teacherController.teacherRegister)
  app.use('/api/v1/teacher', [auth], teacherRouter)
  
}

const express = require('express')
const teacherController = require('../controller/TeacherController')
const router = express.Router()

router.get('/' , teacherController.getTeacher)

module.exports = router

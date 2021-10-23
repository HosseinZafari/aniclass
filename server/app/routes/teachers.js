const express = require('express')
const teacherController = require('../controller/TeacherController')
const { schemaUserUpdate } = require('../schema')
const router = express.Router()

router.get('/' , teacherController.getTeacher)
router.patch('/update' , schemaUserUpdate , teacherController.update)

module.exports = router

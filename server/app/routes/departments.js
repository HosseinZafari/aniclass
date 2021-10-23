const express = require('express')
const router  = express.Router()
const departmentController = require('../controller/DepartmentController')
const { schemaAddDepartment  , schemaGetDepartmentsTeacher} = require('../schema')

router.post('/add' , schemaAddDepartment , departmentController.addDepartmentForTeacher)
router.post('/get/all' ,schemaGetDepartmentsTeacher , departmentController.getDepartments)

module.exports = router

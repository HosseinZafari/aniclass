const express = require('express')
const studentController = require('../controller/StudentsController')
const {schemaReserveClassStudent} = require('../schema')
const router  = express.Router()

router.get('/reservedClass' ,  studentController.reservedClassList)
router.post('/reserveClass' , schemaReserveClassStudent , studentController.reserveClass)

module.exports = router

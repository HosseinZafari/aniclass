const express = require('express')
const studentController = require('../controller/StudentsController')
const { schemaUserUpdate } = require('../schema')
const {schemaReserveClassStudent} = require('../schema')
const router  = express.Router()

router.get('/reservedClass' ,  studentController.reservedClassList)
router.post('/reserveClass' , schemaReserveClassStudent , studentController.reserveClass)
router.patch('/update' , schemaUserUpdate , studentController.update)

module.exports = router

const express = require('express')
const classController = require('../controller/ClassController')
const { schemaUnReserveClass } = require('../schema')
const { schemaReserveClass } = require('../schema')
const { schemaClassSession } = require('../schema')
const { schemaGetClass } = require('../schema')
const router  = express.Router()

router.get( '/:id' , schemaGetClass , classController.getClassInfo)
// students
router.get('/reserved/all/count' , classController.getNumbersOfClassReserved)
router.get('/reserved/all' , classController.getClassReserved)
router.get('/:id/sessions/all' , schemaClassSession ,classController.getSessionsOfAClass)
router.post('/:id/reserve' ,schemaReserveClass ,classController.setReserveClass)
router.delete('/:id/unreserve' ,schemaUnReserveClass ,classController.unReserveClass)

// teacher
router.get('/created/all/count' , classController.getCreatedClassTeacherCount)
router.get('/created/all' , classController.getCreatedClassTeacher)

module.exports = router


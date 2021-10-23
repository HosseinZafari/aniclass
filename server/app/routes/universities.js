const express = require('express')
const router  = express.Router()
const universityController = require('../controller/UniversityController')
const { schemaAddUniversity } = require('../schema')

router.post('/add' , schemaAddUniversity , universityController.addUniversity)
router.get('/get/all'   , universityController.getUniversities)

module.exports = router

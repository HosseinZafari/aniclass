const express = require('express')
const router  = express.Router()
const timeController = require('../controller/TimeController')
const { schemaAvailableSession , schemaCreateSesison } = require('../schema')

router.get('/now' , timeController.getNow)

router.post('/available/day/' ,  schemaAvailableSession , timeController.getAvailable)
router.post('/session/new' , schemaCreateSesison , timeController.createSession)


module.exports = router 
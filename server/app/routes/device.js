const express = require('express')
const router  = express.Router()
const deviceController = require('../controller/DeviceController')

router.delete('/remove' , deviceController.removeDevice)

module.exports = router

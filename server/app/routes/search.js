const express = require('express')
const searchController = require('../controller/SearchController')
const { schemaSearch } = require('../schema')
const router = express.Router()

router.post('/:department/:province/:page/' ,  schemaSearch ,searchController.search)

module.exports = router


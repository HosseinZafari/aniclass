require('dotenv').config()
const bootServer = require('./app')
bootServer(process.env.APP_PORT)


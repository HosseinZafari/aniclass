const express = require('express')
const app = express()

require('./middleware')(app)
require('./routes')(app)
require('./middleware/LastAccess')(app)
require('./middleware/exeptions')(app)
require('./middleware/404')(app)

module.exports = (port) => {
  app.listen(port ,  () => {
    console.log(`Server is Running with port ${port}`)
  })
}

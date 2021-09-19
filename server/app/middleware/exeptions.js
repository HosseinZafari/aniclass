const { isJsonString } = require('../service/Common')

module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || 500
    res.status(status).send({
      'status': 'error',
      code: status,
      msg: isJsonString(error.message) ? JSON.parse(error.message) : error.message,
    })
  })
}

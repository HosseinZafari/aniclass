const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (app) => {
  app.set('trust proxy', true);
  app.use(bodyParser.json())
  app.use(cors())
}

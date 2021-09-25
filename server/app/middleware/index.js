const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (app) => {
  const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ["POST" , "GET" , "PUT" , "DELETE"] ,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
  app.set('trust proxy', true);
  app.use(bodyParser.json())
  app.use(cors(corsOptions))
}

const DeviceModel = require('../model/DeviceModel')

module.exports = async (app) => {
  app.use(async (err , req , res , next ) => {
    if(req.userInfo == undefined) {
      return next(err)
    }
    
    const result = await DeviceModel.updateLastAccess(new Date() , req.userInfo.token)
    if(!result) {
      res.status(500).send({
        status: 'success' ,
        msg: 'سیستم در حال حاضر در دسترس نیست لطفا بعدا امتحان کنید'
      })
    }
 
    await next(err)
  })
}

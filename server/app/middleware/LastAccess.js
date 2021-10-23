const DeviceModel = require('../model/DeviceModel')
const { simpleError } = require('../service/ErrorService')

module.exports = async (app) => {
  app.use(async (req , res , next ) => {
    if(req.userInfo == undefined) {
      return simpleError('سیستم در حال حاضر در دسترس نیست لطفا بعدا امتحان کنید' , 500 , next)
    }
    
    console.log(req.userInfo)

    let result = false
    if(req.userInfo.role === 'student') {
      result = await DeviceModel.updateLastAccess(new Date() , req.userInfo.token)
    } else {
      result = await DeviceModel.updateLastAccessTeacher(new Date() , req.userInfo.token)
    }

    if(result) {
      next()
    } else {
      return simpleError('سیستم در حال حاضر در دسترس نیست لطفا بعدا امتحان کنید' , 500 , next)
    }
 
  })
}

const DeviceModel = require('../model/DeviceModel')
const { simpleError } = require('../service/ErrorService')

const removeDevice = async (req , res , next) => {
    let result = false
  
    if(req.userInfo.role === 'student') {
      result = await DeviceModel.removeDeviceStudent(req.userInfo.token)
    } else {
      result = await DeviceModel.removeDeviceTeacher(req.userInfo.token)
    }
    
    if(!result) {
      return simpleError('مشکلی در سرور وجود دارد لطفا بعدا امتحان کنید' , 500 , next)
    }
    
    res.send({
      status: 'success',
      msg: 'با موفقیت بیرون رفتید',
      code: 200 ,
    })
}


module.exports = {
  removeDevice
}

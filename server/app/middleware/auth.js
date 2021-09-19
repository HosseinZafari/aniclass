const TokenService = require('../service/TokenService')
const DeviceModel = require('../model/DeviceModel')

module.exports = async (req, res, next) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send({
      success: false,
      code: 401,
      msg: 'You\'re not authorized'
    })
  }
  
  const isVerifiedToken = await TokenService.verify(req.headers.authorization)
  if (!isVerifiedToken) {
    return res.status(401).send({
      success: false,
      code: 401,
      msg: 'You\'re not Accessibility'
    })
  }
  
  const studentResult = await DeviceModel.getDeviceStudentByToken(req.headers.authorization)
  if (!studentResult) {
    return res.status(401).send({
      success: false,
      code: 401,
      msg: 'Not Found Token'
    })
  }
  
  req.userInfo = studentResult
  
  await next()
}

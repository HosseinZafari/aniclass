const TokenService = require('../service/TokenService')
const DeviceModel = require('../model/DeviceModel')
const StudentModel = require('../model/StudentModel')
const TeacherModel = require('../model/TeacherModel')

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
  
  const isExistsUser = await DeviceModel.getDeviceTeacherOrStudentByToken(req.headers.authorization)
  if (!isExistsUser) {
    return res.status(401).send({
      success: false,
      code: 401,
      msg: 'Not Found Token'
    })
  }
  
  if(isExistsUser.studentId){
    req.userInfo = await StudentModel.getStudentById(isExistsUser.studentId)
    req.userInfo.role = 'student'
    req.userInfo.token = req.headers.authorization
  } else if(isExistsUser.teacherId) {
    req.userInfo = await TeacherModel.getTeacherById(isExistsUser.teacherId)
    req.userInfo.role = 'teacher'
    req.userInfo.token = req.headers.authorization
  } else {
     res.status(401).send({
      success: false,
      code: 401,
      msg: 'Not Found User'
    })
  }
  
  
  await next()
}

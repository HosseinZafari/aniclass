const UniversityModel = require('../model/UniversityModel')
const StudentModel = require('../model/StudentModel')
const TeacherModel = require('../model/TeacherModel')
const DeviceModel = require('../model/DeviceModel')
const getTeacher = (req , res , next) => {

}

const teacherLogin = (req , res , next) => {
  res.send({root: 'bagher'})
}

const teacherRegister = async (req , res , next) => {
  if (isHaveAnyErrors(req, (errors) => {
    err(errors, 422, next)
  })) {
    return
  }
  
  const universityModel = new UniversityModel()
  const userModel = new TeacherModel()
  
  const studentIsExists = await userModel.getTeacherByEmailNC(req.body)
  if (studentIsExists) {
    next(new Error('این ایمیل یا کد ملی قبلا استفاده شده'))
    return
  }
  
  const validQrcode = await universityModel.getUniversityByQrcode(req.body)
  if (!validQrcode) {
    next(new Error('کد امنیتی دانشگاه صحیح نمیباشد'))
    return
  }
  
  const userCreated = await userModel.createTeacher(req.body)
  if (!userCreated) {
    next(new Error('مشکلی در ثبت نام وجود دارد لطفا بعدا امتحان کنید'))
    return
  }
  
  const reservedCreated = await universityModel.addUniversityReserveForTeacher(userCreated, validQrcode.id)
  if (!reservedCreated) {
    next(new Error('مشکلی در ثبت نام وجود دارد لطفا بعدا امتحان کنید'))
    return
  }
  
  const token = await sign({
    userId: userCreated,
    nationalCode: req.body.nationalCode,
    email: req.body.email
  })
  const isCreatedDevice = await DeviceModel.newDeviceTeacher(userCreated, req.ip, token, req.body.deviceModel, new Date())
  if (!isCreatedDevice) {
    next(new Error('مشکلی در شناسایی دستگاه شما وجود دارد لطفا بعدا لاگین فرمایید'))
    return
  }
  
  res.status(202).send({
    status: 'success',
    id: userCreated,
    nationalCode: req.body.nationalCode,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    token,
  })
}

module.exports = {
  getTeacher ,
  teacherRegister ,
  teacherLogin
}

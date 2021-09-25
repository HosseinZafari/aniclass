const UniversityModel = require('../model/UniversityModel')
const StudentModel = require('../model/StudentModel')
const TeacherModel = require('../model/TeacherModel')
const DeviceModel = require('../model/DeviceModel')
const { sign } = require('../service/TokenService')
const { simpleError } = require('../service/ErrorService')
const { err } = require('../service/ErrorService')
const { isHaveAnyErrors } = require('../service/Common')
const getTeacher = (req , res , next) => {

}

const teacherLogin = async (req , res , next) => {
  if (isHaveAnyErrors(req, (errors) => {
    err(errors, 422, next)
  })) {
    return
  }
  
  const userModel = new TeacherModel()
  const result = await userModel.loginTeacher(req.body)
  
  switch (result) {
    case 'WRONG_PASSWORD':
      simpleError('رمز عبور شما صحیح نمی باشد' , 403 , next)
      return
    case 'NOT_FOUND':
      simpleError('نام کاربری شما صحیح نمیباشد' , 403 , next)
      return
    case 'ERROR' :
      simpleError("مشکلی در سرور به وجود آمده لطفا بعدا امتحان کنید" , 500 , next)
      return
  }
  
  const token = await sign({
    userId: result.id,
    nationalCode: req.body.nationalCode,
    email: req.body.email
  })
  
  const isCreatedDevice = await DeviceModel.newDeviceTeacher( result.id , req.ip , token , req.body.deviceModel, new Date() )
  if(!isCreatedDevice) {
    simpleError("مشکلی در حال حاضر وجود دارد لطفا بعدا امتحان کنید")
    return
  }
  
  const {id , national_code: nationalCode , name: firstName , family: lastName , email } = result
  res.status(200).send({
    status: 'success',
    msg: 'به پنل کاربری خود خوش آمدید',
    code: 200 ,
    id ,
    role: "teacher",
    nationalCode ,
    firstName ,
    lastName ,
    email ,
    token
  })
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
  
  const userCreated = await userModel.createTeacher(req.body , new Date())
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
    msg: "به پنل کاربری خود خوش آمدید" ,
    id: userCreated,
    role: "teacher" ,
    nationalCode: req.body.nationalCode,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    token ,
    code: 200
  })
}

module.exports = {
  getTeacher ,
  teacherRegister ,
  teacherLogin
}

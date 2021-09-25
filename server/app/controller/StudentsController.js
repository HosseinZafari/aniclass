const StudentModel = require('../model/StudentModel')
const UniversityModel = require('../model/UniversityModel')
const DeviceModel = require('../model/DeviceModel')
const ReserveClassModel = require('../model/ReserveClassModel')
const { simpleError } = require('../service/ErrorService')
const { sign } = require('../service/TokenService')
const { isHaveAnyErrors } = require('../service/Common')
const { err } = require('../service/ErrorService')
const { query } = require('../boot')
const { validationResult } = require('express-validator')

const reservedClassList = async (req, res, next) => {
  if(isHaveAnyErrors(req , (errors) => {
    err(errors , 422 , next)
  })) return
  
  res.send({
    success: true,
    msg: 'لیست کاربران با موفقیت تولید شد.',
    rows: (await query('select * from teacher_tb')).rows
  })
}

const reserveClass = async (req , res , next) => {
  if(isHaveAnyErrors(req , (errors) => {
    err(errors , 422 , next)
  })) return
  
  const model = await ReserveClassModel.reserveClass(req.userInfo.studentId , req.body.classId)
  if(model){
    return res.status(202).send({
      status: "success",
      msg: 'کلاس با موفقیت دنبال شد'
    })
  }
  
  return simpleError('مشکلی در دنبال کردن کلاس وجود دارد' , 500 , next)
}


const studentLogin = async (req , res , next) => {
  if (isHaveAnyErrors(req, (errors) => {
    err(errors, 422, next)
  })) {
    return
  }
  
  const userModel = new StudentModel()
  const result = await userModel.loginStudent(req.body)
  
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
  
  const isCreatedDevice = await DeviceModel.newDeviceStudent( result.id , req.ip , token , req.body.deviceModel, new Date() )
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
    role: "student",
    nationalCode ,
    firstName ,
    lastName ,
    email ,
    token
  })
}

const studentRegister = async (req, res, next) => {
  if (isHaveAnyErrors(req, (errors) => {
    err(errors, 422, next)
  })) {
    return
  }
  
  const universityModel = new UniversityModel()
  const userModel = new StudentModel()
  
  const studentIsExists = await userModel.getStudentByEmailNC(req.body)
  if (studentIsExists) {
    simpleError('این ایمیل یا کد ملی قبلا استفاده شده' , 403 , next)
    return
  }
  const validQrcode = await universityModel.getUniversityByQrcodeForStudent(req.body)
  if (!validQrcode) {
    simpleError('کد امنیتی دانشگاه صحیح نمیباشد' , 403 , next)
    return
  }
  
  const userCreated = await userModel.createStudent(req.body , new Date())
  if (!userCreated) {
    simpleError('مشکلی در ثبت نام وجود دارد لطفا بعدا امتحان کنید' , 403 , next)
    return
  }
  
  const reservedCreated = await universityModel.addUniversityReserveForStudent(userCreated, validQrcode.id)
  if (!reservedCreated) {
    simpleError('مشکلی در ثبت نام وجود دارد لطفا بعدا امتحان کنید' , 500 , next)
    return
  }
  
  const token = await sign({
    userId: userCreated,
    nationalCode: req.body.nationalCode,
    email: req.body.email
  })
  const isCreatedDevice = await DeviceModel.newDeviceStudent(userCreated, req.ip, token, req.body.deviceModel, new Date())
  if (!isCreatedDevice) {
    simpleError('مشکلی در شناسایی دستگاه شما وجود دارد لطفا بعدا لاگین فرمایید' , 403 , next)
    return
  }
  
  res.status(202).send({
    status: 'success',
    msg: "به پنل کاربری خود خوش آمدید" ,
    id: userCreated,
    role: "student" ,
    nationalCode: req.body.nationalCode,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    token,
    code: 200
  })
}

module.exports = {
  reservedClassList,
  studentLogin,
  studentRegister ,
  reserveClass ,
}

const ReserveClassModel = require('../model/ReserveClassModel')
const ClazzModel = require('../model/ClazzModel')
const SessionModel = require('../model/SessionModel')
const { err } = require('../service/ErrorService')
const { isHaveAnyErrors } = require('../service/Common')
const { simpleError } = require('../service/ErrorService')

const getNumbersOfClassReserved = async (req , res , next) => {
   const result = await ReserveClassModel.getAllReservedClassCountStudent(req.userInfo.id)
  
  if(!result){
   return simpleError('مشکلی در سیستم به وجود آمده لطفا بعدا امتحان کنید' , 500 , next)
  }
  
  res.status(200).send({
    status: 'success' ,
    msg:  'با موفقیت دریافت شد',
    count: result.count
  })
}

const getCreatedClassTeacherCount = async (req , res , next) => {
  const  result = await ReserveClassModel.getAllReservedClassCountTeacher(req.userInfo.id)
  
  if(!result){
   return simpleError('مشکلی در سیستم به وجود آمده لطفا بعدا امتحان کنید' , 500 , next)
  }
  
  res.status(200).send({
    status: 'success' ,
    msg:  'با موفقیت دریافت شد',
    count: result.count
  })
}

const getCreatedClassTeacher = async (req , res , next) => {
  const reservedClass = await ReserveClassModel.getAllReservedClassTeacher(req.userInfo.id)
  if(reservedClass === 'NOT_FOUND') {
     return res.status(404).send({
       status: 'success',
       msg: 'شما هیچگونه کلاسی ایجاد نکرده اید.'
     })
  } else if(!reservedClass) {
    return simpleError('مشکلی در سرور به وجود امده لطفا بعدا امتحان کنید' , 500 , next)
  }
  
  res.status(200).send({
    status: 'success' ,
    msg: 'اطلاعات با موفقیت دریافت شد',
    rows: reservedClass
  })
}

const getClassReserved = async (req , res , next) => {
  const reservedClass = await ReserveClassModel.getAllReservedClass(req.userInfo.id)
  if(reservedClass === 'NOT_FOUND') {
     return res.status(404).send({
       status: 'success',
       msg: 'شما هیچگونه کلاسی ثبت نامی ندارید.'
     })
  } else if(!reservedClass) {
    return simpleError('مشکلی در سرور به وجود امده لطفا بعدا امتحان کنید' , 500 , next)
  }
  
  res.status(200).send({
    status: 'success' ,
    msg: 'اطلاعات با موفقیت دریافت شد',
    rows: reservedClass
  })
}

const getClassInfo = async (req , res , next) => {
  if(isHaveAnyErrors(req , (error) => {
    err(error, 422 , next)
  })) return
 
  const result = await ClazzModel.getClassById(req.params.id)
  if(result === 'NOT_FOUND') {
    return res.status(404).send({
      status: 'success',
      msg: 'کلاس مورد نظر شما یافت نشد.'
    })
  } else if (!result){
    return simpleError('مشکلی در سرور رخ داده لطفا بعدا امتحان کنید', 500 , next)
  }
  
  res.status(200).send({
    status: 'success' ,
    msg: 'اطلاعات با موفقیت دریافت شد',
    class: result
  })
}

const getSessionsOfAClass = async (req , res , next) => {
  if(isHaveAnyErrors(req , (error) => {
    err(error, 422 , next)
  })) return
 
  const result = await SessionModel.getSessionByIdClass(req.params.id)
  if(result === 'NOT_FOUND') {
    return res.status(404).send({
      status: 'success',
      msg: 'کلاس مورد نظر شما یافت نشد.'
    })
  } else if (!result){
    return simpleError('مشکلی در سرور رخ داده لطفا بعدا امتحان کنید', 500 , next)
  }
  
  res.status(200).send({
    status: 'success' ,
    msg: 'اطلاعات با موفقیت دریافت شد',
    sessions: result
  })
}

const setReserveClass = async (req , res , next) => {
  if(isHaveAnyErrors(req , (error) => {
    err(error, 422 , next)
  })) return
 
  const classDetail = await ClazzModel.getPasswordClass(req.params.id)
  if(!classDetail) {
    return simpleError('مشکلی در سرور رخ داده لطفا بعدا امتحان کنید', 500 , next)
  }
  
  if(classDetail.password != null && classDetail.password !== req.body.password) {
    return simpleError('رمز عبور شما صحیح نیست', 403 , next)
  }
  
  const result = await ReserveClassModel.reserveClass(req.userInfo.id , req.params.id)
  if(result) {
    res.status(200).send({
      status: 'success' ,
      msg: 'شما با موفقیت ثبت نام شده اید',
    })
  } else if (!result) {
    return simpleError('شما قبلا این کلاس را ثبت نموده اید', 409 , next)
  }
}

const unReserveClass = async (req , res , next) => {
  if(isHaveAnyErrors(req , (error) => {
    err(error, 422 , next)
  })) return
 
  const result = await ReserveClassModel.unReserveClass(req.userInfo.id , req.params.id)
  if(result) {
    res.status(200).send({
      status: 'success' ,
      msg: 'با موفقیت ثبت نام شما لغو شد.',
    })
  } else if (!result) {
    return simpleError('مشکلی در لغو ثبت نام وجود دارد', 500 , next)
  }
}


module.exports = {
 getNumbersOfClassReserved ,
  getClassReserved,
  getClassInfo ,
  getSessionsOfAClass,
  setReserveClass ,
  getCreatedClassTeacherCount,
  getCreatedClassTeacher,
  unReserveClass
}


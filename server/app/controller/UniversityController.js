const UniversityModel = require('../model/UniversityModel')
const { simpleError } = require('../service/ErrorService')
const { err } = require('../service/ErrorService')
const { isHaveAnyErrors } = require('../service/Common')

const addUniversity = async (req , res , next) => {
  if (isHaveAnyErrors(req, (errors) => {
    err(errors, 422, next)
  })) return
  
  const result = await UniversityModel.addUniversityReserveForTeacher(req.userInfo.id , req.body.qrcode)
  if(result === 'CONFLICT') {
      return simpleError('دانشگاه شما از قبل وجود دارد!' , 409 , next)
  } else if(result === 'WRONG_PASSWORD') {
      return simpleError('کد امنیتی شما صحیح نیست!' , 403 , next)
  } else if(result) {
      return res.status(202).send({
        status: 'success' ,
        msg: 'با موفقیت اضافه شد',
        code: 202
      })
  } else {
      return simpleError('مشکلی در اضافه کردن دانشگاه به وجود آمده' , 500 , next)
  }
}

const getUniversities = async (req , res ,next) => {
  if (isHaveAnyErrors(req, (errors) => {
    err(errors, 422, next)
  })) return
  
  const result = await UniversityModel.getUniversityByTeacherId(req.userInfo.id)
  if(result) {
    return res.status(202).send({
      status: 'success' ,
      msg: 'با موفقیت دریافت  شد',
      code: 202,
      rows: result
    })
  } else {
    return simpleError('مشکلی در اضافه کردن دانشگاه به وجود آمده' , 500 , next)
  }
}

module.exports = {
  addUniversity,
  getUniversities , 
}

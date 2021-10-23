const DepartmentModel = require('../model/DepartmentModel')
const { simpleError } = require('../service/ErrorService')
const { err } = require('../service/ErrorService')
const { isHaveAnyErrors } = require('../service/Common')

const addDepartmentForTeacher = async (req , res , next) => {
  if(isHaveAnyErrors(req , (errors) => {
    err(errors , 422 , next)
  })) return

  const result = await DepartmentModel.addDepartmentAccessTeacher(req.body.universityId , req.body.qrcode , req.userInfo.id)
  if (result === 'WRONG_QRCODE') {
    return simpleError('کد امنیتی شما اشتباه میباشد' , 403 , next)
  } else if(result) {
    return res.status(202).send({
      msg: 'با موفقیت اضافه شد' ,
      code: 202 ,
      status: "success" ,
    })
  } else {
    return simpleError('شما از قبل این دپارتمان را اضافه کرده اید . ' , 409 , next)
  }
}

const getDepartments = async (req , res , next) => {
  if(isHaveAnyErrors(req , (errors) => {
    err(errors , 422 , next)
  })) return
  
  
  const result = await DepartmentModel.getDepartments(req.body.universityId , req.userInfo.id)
  if(result === 'NOT_FOUND') {
    return simpleError('شما هیچ دپارتمانی بر ای این دانشگاه ثبت نکرده اید' , 404 , next)
  } else if(result) {
    return res.send({
      msg: 'با موفقیت دریافت شد' ,
      code: 200 ,
      status: "success" ,
      rows: result
    })
  } else {
    return simpleError('مشکلی در سرور رخ داده لطفا بعدا سعی کنید ' , 409 , next)
  }
}


module.exports = {
  addDepartmentForTeacher , 
  getDepartments
}

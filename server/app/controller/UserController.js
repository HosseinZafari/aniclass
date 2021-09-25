const { simpleError } = require('../service/ErrorService')
const authentication = (req , res, next) => {
  if(!req.userInfo) {
    return simpleError('مشخصات حساب شما در دسترس نیست!' , 404, next)
  }
  
  const {id , family: lastName , name: firstName , email , national_code: nationalCode , role } = req.userInfo
  res.status(200).send({
    status: 'success',
    msg: 'با موفقیت دریافت شد',
    code: 200 ,
    id ,
    role,
    nationalCode ,
    firstName ,
    lastName ,
    email ,
    token: req.headers.authorization
  })
}


module.exports = {
  authentication
}

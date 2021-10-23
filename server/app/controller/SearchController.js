const SearchModel = require('../model/SearchModel')
const { err } = require('../service/ErrorService')
const { isHaveAnyErrors } = require('../service/Common')

const search = async (req , res , next) => {
  if(isHaveAnyErrors(req , (errors) => {
    err(errors , 422 , next)
  })) return
  
  const { words , lastId } = req.body
  const { province , department , page} = req.params
  
  const result = await SearchModel.search(province , department , page , words , lastId)
  if(!result || result === 'NOT_FOUND') {
    return res.status(404).send({
      status: 'success' ,
      code: 404,
      msg: 'هیچ صفحه ای وجود ندارد'
    })
  }
  
  let newResult = []
  newResult = result.map(value => {
    value.password = !(value.password === '' || value.password === null || !value.password);
    return value
  })
  
  return res.send({
    status: 'success' ,
    code: 200 ,
    msg: 'با موفقیت دریافت شد',
    rows: newResult
  })
}


module.exports = {
  search
}

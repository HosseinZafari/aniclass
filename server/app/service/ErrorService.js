exports.err = (errors , code = 500 , next) => {
  // console.log(errors)
  const params = []
  const messages = []
  for(let i = 0 ; i <  errors.array().length ; i ++) {
    const param = errors.array()[i].param
    const msg = errors.array()[i].msg
    if(!params.find((value , index) =>  value === param)){
      params.push(param)
      messages.push(msg)
    }
  }
  const str = JSON.stringify({messages,params})
  const error  = new Error(str)
  error.status = code
  next(error)
}

exports.simpleError = (msg , code = 500 , next) => {
  const error = new Error(msg)
  error.status = code
  next(error)
}

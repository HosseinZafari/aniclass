const jwt = require('jsonwebtoken')

exports.sign = (data , expiresIn = '30 days') => jwt.sign(data , process.env.JWT_SECRET , {expiresIn})


exports.verify = async (token , maxAge = '180 days') => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET , {maxAge})
  } catch(err) {
    return false
  }
}

exports.decode = async (token) => {
  return await jwt.decode(token , process.env.JWT_SECRET)
}

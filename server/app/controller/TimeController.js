const { err, simpleError } = require('../service/ErrorService')
const { isHaveAnyErrors, getStartTimes } = require('../service/Common')
const SessionModel = require('../model/SessionModel')
const DateModel = require('../model/DateModel')

const getNow = async (req , res , next) => {
    const time = new Date()
    return res.send({
        status: 'success' , 
        msg: 'با موفقیت دریافت شد' ,
        time
    })
}

const getAvailable = async (req  ,res , next) => {
    if (isHaveAnyErrors(req, (errors) => {
        err(errors, 422, next)
    })) return
    const result = await SessionModel.getTimeByDate(req.body)
    try {
        if(result === 'FREE') {
            return res.send({
                status: 'success' , 
                msg: 'با موفقیت دریافت شد' ,
                times: getStartTimes 
            })
        } else if (result){
            const times = SessionModel.splitSessionAndTime(result)
            if(times) {
                return res.send({
                    status: 'success' , 
                    msg: 'با موفقیت دریافت شد' ,
                    times 
                })
            }
        } else {
            return simpleError('مشکلی در دریافت اطلاعات وجود دارد' , 500 , next)
        }
        
    } catch (err) {
        console.log(err)
        return simpleError('مشکلی در دریافت اطلاعات وجود دارد' , 500 , next)
    } 
    
}

const createSession = async (req , res , next) => {
    if (isHaveAnyErrors(req, (errors) => {
        err(errors, 422, next)
    })) return
    
    req.body.date = await  DateModel.createDate(req.body.date)
    const result = await SessionModel.createSessionItem(req.body)
    if(result) {
        return res.status(202).send({
            status: 'success' , 
            msg: 'با موفقیت دریافت شد' ,
        }) 
    } else {
        return simpleError('مشکلی در دریافت اطلاعات وجود دارد' , 500 , next)
    }
}


module.exports = {
    getNow , 
    getAvailable , 
    createSession
}
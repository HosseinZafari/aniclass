const { checkSchema } = require('express-validator')
exports.schemaRegisterStudent =   checkSchema({
  firstName: {
    isString: true,
    toLowerCase: true,
    notEmpty: true,
    errorMessage: 'لطفا نام خود را وارد نمایید'
  },
  lastName: {
    isString: true,
    toLowerCase: true,
    notEmpty: true,
    errorMessage: 'لطفا نام خانوادگی خود را وارد نمایید'
  },
  nationalCode: {
    isString: true,
    errorMessage: 'کد ملی شما صحیح نیست',
    isLength: {
      options: {
        min: 7,
        max: 10
      },
    }
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
  },
  password: {
    errorMessage: 'رمز عبور شما نادرست است',
    isString : true,
    isLength: {
      options: { min: 7 }
    } ,
  } ,
  qrcode: {
    errorMessage: 'کد امنیتی آموزشگاه برای ثبت نام را وارد نمایید',
    isString: true
  } ,
  deviceModel: {
    errorMessage: 'نام دستگاه خود را وارد نمایید',
    isString: true
  },
})

exports.schemaLoginStudent = checkSchema({
  nationalCode: {
    isNumeric: true ,
    isLength : {
      options: {min: 7 , max: 10}
    },
    errorMessage: "کد ملی خود را صحیح وارد نمایید",
  } ,
  password: {
    isString : true ,
    errorMessage: "رمز عبور خود را صحیح وارد کنید",
    isLength : {
      options: {min: 7}
    }
  } ,
  deviceModel: {
    isString: true ,
    errorMessage: "لطفا نام دستگاه خود را وارد کنید"
  }
  
})

exports.schemaRegisterTeacher =   checkSchema({
  firstName: {
    isString: true,
    toLowerCase: true,
    notEmpty: true,
    errorMessage: 'لطفا نام خود را وارد نمایید'
  },
  lastName: {
    isString: true,
    toLowerCase: true,
    notEmpty: true,
    errorMessage: 'لطفا نام خانوادگی خود را وارد نمایید'
  },
  nationalCode: {
    isString: true,
    errorMessage: 'کد ملی شما صحیح نیست',
    isLength: {
      options: {
        min: 7,
        max: 10
      },
    }
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
  },
  password: {
    errorMessage: 'رمز عبور شما نادرست است',
    isString : true,
    isLength: {
      options: { min: 7 }
    } ,
  } ,
  qrcode: {
    errorMessage: 'کد امنیتی آموزشگاه برای ثبت نام را وارد نمایید',
    isString: true
  } ,
  deviceModel: {
    errorMessage: 'نام دستگاه خود را وارد نمایید',
    isString: true
  },
})

exports.schemaLoginTeacher = checkSchema({
  nationalCode: {
    isNumeric: true ,
    isLength : {
      options: {min: 7 , max: 10}
    },
    errorMessage: "کد ملی خود را صحیح وارد نمایید",
  } ,
  password: {
    isString : true ,
    errorMessage: "رمز عبور خود را صحیح وارد کنید",
    isLength : {
      options: {min: 7}
    }
  } ,
  deviceModel: {
    isString: true ,
    errorMessage: "لطفا نام دستگاه خود را وارد کنید"
  }
  
})


exports.schemaReserveClassStudent = checkSchema({
  classId : {
    errorMessage: "کلاس شما مشخص نیست" ,
  } ,
})

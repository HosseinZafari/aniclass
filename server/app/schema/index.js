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

exports.schemaAddClass =   checkSchema({
  link: {
    isString: true,
    toLowerCase: true,
    notEmpty: true,
    errorMessage: 'لطفا لینک خود را وارد نمایید'
  },
  class_code: {
    isNumeric: true,
    errorMessage: 'لطفا کد کلاس خود را وارد نمایید'
  },
  password: {
    errorMessage: 'رمز عبور شما صحیح نیست',
  },
  title: {
    isString: true,
    errorMessage: 'لطفا عنوان خود را وارد نمایید'
  },
  description: {
    errorMessage: 'لطفا توضیحات خود را وارد نمایید' ,
    isString : true,
  } ,
  department_id: {
    errorMessage: 'کد دپارتمان را وارد نمایید',
    isNumeric: true
  } ,
  university_id: {
    errorMessage: ' کد دانشگاه خود را وارد نمایید',
    isNumeric: true
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


exports.schemaCreateSesison = checkSchema({
  date: {
    isDate: true ,
    errorMessage: " تاریخ را صحیح وارد نمایید",
  } ,
  timeId: {
    isNumeric : true ,
    errorMessage: "کد زمانی خود را صحیح وارد کنید",
  } ,
  classId: {
    isNumeric: true ,
    errorMessage: "لطفا کد کلاس خود را وارد کنید"
  },
  name: {
    isString: true ,
    errorMessage: "لطفا نام جلسه خود را وارد کنید"
  }
  
})


exports.schemaGetDepartmentsTeacher = checkSchema({
  universityId: {
    in: ['body'] ,
    isInt: true ,
    errorMessage: "لطفا شناسه آموزشگاه خود را وارد کنید ",
  } 
})


exports.schemaReserveClassStudent = checkSchema({
  classId : {
    errorMessage: "کلاس شما مشخص نیست" ,
  } ,
})

exports.schemaGetClass = checkSchema({
  id: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه کلاس خود را صحیح وارد کنید'
  }
})

exports.schemaClassSession = checkSchema({
  id: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه کلاس خود را صحیح وارد کنید'
  }
})

exports.schemaRemoveClass = checkSchema({
  classId: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه کلاس خود را صحیح وارد کنید'
  }
})

exports.schemaReserveClass = checkSchema({
  id: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه کلاس خود را صحیح وارد کنید'
  } ,
  password: {
    in: ['body'] ,
    isString : true ,
    errorMessage: 'لطفا رمز عبور خود را وارد کنید'
  }
})

exports.schemaAddUniversity = checkSchema({
  qrcode: {
    isString: true,
    errorMessage: 'لطفا کد امنیتی دانشگاه را وارد کنید'
  } ,
})

exports.schemaAddDepartment = checkSchema({
  qrcode: {
    isString: true,
    errorMessage: 'لطفا کد امنیتی برای دپارتمان را وارد کنید .'
  } ,
  universityId: {
    isInt : true ,
    errorMessage: "لطفا دانشگاه خود را وارد کنید"
  }
})

exports.schemaAvailableSession = checkSchema({
  date: {
    isString: true,
    errorMessage: 'لطفا تاریخ روز  را وارد کنید .'
  },
  classId: {
    isNumeric: true,
    errorMessage: 'لطفا شناسه کلاس  را وارد کنید .'
  } ,
})

exports.schemaUnReserveClass = checkSchema({
  id: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه کلاس خود را صحیح وارد کنید'
  } ,
})

exports.schemaSearch = checkSchema({
  province: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه استان خود را صحیح وارد کنید'
  } ,
  department: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه دپارتمان خود را صحیح وارد کنید'
  } ,
  page: {
    in: ['params' , 'query'] ,
    isInt : true ,
    errorMessage: 'لطفا شماره صفحه خود را صحیح وارد کنید'
  } ,
  lastId: {
    in: ['body'] ,
    isInt : true ,
    errorMessage: 'لطفا شناسه اخرین آیتم خود را صحیح وارد کنید'
  } ,
  words: {
    in: ['body'],
    isString: true ,
    errorMessage: 'شما هیچ کلمه ای برای جستجو ندارید.'
  },
  
})


exports.schemaUserUpdate =   checkSchema({
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
    errorMessage: 'ایمیل شما صحیح نیست'
  },
  password: {
    errorMessage: 'رمز عبور شما نادرست است',
    isString : true,
    isLength: {
      options: { min: 7 }
    } ,
  }
})

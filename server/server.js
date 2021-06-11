require( 'dotenv').config();
const  express =  require( "express");
const  cors =  require( "cors" );
const  morgan = require( "morgan" );
const  session = require( 'express-session');
const  cookieParser = require( 'cookie-parser');
const  FileStore = require( 'session-file-store')(session);
const  common =  require( "./common.js" );
const  db =  require( "./db/index.js" );
const  moment =  require( "moment-jalaali" );
const  ClazzModel = require( "./model/ClazzModel.js" );
const  TeacherModel = require( "./model/TeacherModel.js" );
const  StudentModel = require( "./model/StudentModel.js" );
const  StudyModel = require( "./model/StudyModel.js" );
const  LessonModel = require( "./model/LessonModel.js" );
const  DepartmentModel = require( "./model/DepartmentModel.js" );
const  UniversityModel = require( "./model/UniversityModel.js" );
const  ReserveModel = require( "./model/ReserveClass.js" );
const  SessionModel = require( "./model/SessionModel.js" );
const  DateModel = require( "./model/DateModel.js" );
const  SearchModel = require( "./model/SearchModel.js" );
const  CityModel = require( "./model/CityModel.js" );
const  ProvinceModel = require( "./model/ProvinceModel.js" );

// initialize base server
const app = express();
const port = process.env.PORT || 3012; 
const baseUrl = process.env.BASE_URL;


const configSession = {
  secret: process.env.SECRET_SESSION , 
  name: "__susId" , 
  saveUninitialized: true ,
  store: new FileStore(),
  resave: true ,
  cookie: {
    maxAge: common.getMiliSecOfDays(21) ,
    secure: false
  } 
};

if(process.env.NODE_ENV === 'production'){
  app.set('trust proxy' , 1);
  configSession.cookie.secure = true;
}

// Middleware
app.use(cors({
  origin: ["http://localhost:3000" , "http://localhost:5000"]  ,
  methods: ["POST" , "GET" , "PUT" , "DELETE"] , 
  credentials: true
}));
app.use(cookieParser());
app.use(session(configSession));
app.use(morgan("tiny"));
app.use(express.json());

// ######################################## Class Api  
// Get all classes by page (pagination) the route for the main page

app.get(baseUrl + '/' , async(req , res) => {
  if (req.session.info === undefined || req.session.info === null || !req.session.info.loggined) {
    console.log("You no login");
    res.status(200).json({
      'status': 'fail' ,
      'message': 'you arent to login'
    })
  } else {
    res.status(200).json({
      status: "success" ,
      message: 'you loggined' ,
      data: req.session.info
    });
  }
});

app.delete(baseUrl + 'logout' , async(req , res) => {
  if (req.session.info === undefined || req.session.info === null || !req.session.info.loggined) {
    console.log("You no login");
    res.status(200).json({
      'status': 'fail' ,
      'message': 'you arent to login'
    })
  } else {
    req.session.destroy((err) => {
      if(err){
        res.status(400).json({status: "error" , message: "we have an error !"});
        return;
      }

      res.status(202).json({status: "success" , message: "you successfully logout!"});
    });
  }
});


app.get(baseUrl + "allclass/", async (req, res) => {
  if (common.checkIsNaN(req.query.lastid) || req.query.direction == null) {
    res.status(400)
       .json({status: "error" , message: "can not read classes because your parameter is wrong!"});
    return;
  }

  try {
    const clazz = new ClazzModel(db);
    const results = await clazz.getClassesByLastId(req);

    res.status(200).json({
      status: "success",
      message: "successfully loaded classes!",
      data: {
        rows: results.result.rows.length,
        last_id: results.lastId,
        classes: results.result.rows,
      },
    });
  } catch (ex) {
    console.log(ex.message);
    res.status(400).send("error in your request");
  }
});

// get a class
app.get(baseUrl + "class/:id", async (req, res) => {
  if(req.params.id == null) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });
  }

  try {
    const result = await new ClazzModel(db).getClassById(req.params);
    if (result.status == "error") {
      res.status(400).json({
        status: "error",
        message: "it have a problem to get class !!!",
      });
    } else {
      res.status(201).json({
        status: "success",
        message: "this is your class !!!",
        data: {
          class: result.row,
        },
      });
    }
  } catch (ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error",
      message: "it have a problem in the server!!!",
    });
  }
});

// create a class
app.post(baseUrl + "create-class/", async (req, res) => {
  if(req.body.description == null || req.body.link == null || req.body.title == null || req.session == null || !req.session.info.is_teacher
    || req.body.class_code == null || req.body.capasity == null
    || req.body.department_id == null || req.body.university_id == null) {

    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });
    return;
  } 

  try {
    const university = await new UniversityModel(db).getUniversityById(req.body.university_id);
    if(university.status === 'error') {
      res.status(400).json({
        status: "error" ,
        message: "we have a problem!"
      });
      return;
    }

    if(parseInt(university.row.capacity) < req.body.capasity) {
      res.status(202).json({
        status: "error" ,
        message: "ظرفیت کلاس شما نمیتواند از حداکثر ظرفیت دانشگاه شما باشد."
      });
      return;
    }

    req.body.teacher_id = req.session.info.id;
    const result = await new ClazzModel(db).createClass(req.body);

    if(result.status === "success") {
      res.status(200).json({
        status: "success" , 
        message: "successfully created class !!!" , 
        id: result.id
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "We have a problem in creating class!"
      });
    }

  } catch(err) {
    console.log(err.message);
    res.status(400).json({
      status: "error" , 
      message: "We have a problem in the server !!!"
    });
  }
});

// get a class
app.get(baseUrl + 'class/:id' , async (req , res) => {
  const {id} = req.params;
  try {
    const result = await new ClazzModel(db).getClassById(id);
    if(result.status === 'success') {
      res.status(200).json({
        status: "success",
        message: "successfully geted",
        data: result.row
      });
    } else {
      res.status(200).json({
        status: "error",
        message: "not founded",
      });
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      status: "error",
      message: "We have a problem in the server!!!",
    });
  }
});

app.get(baseUrl + "classes-teacher/" , async (req , res) => {
  if(req.session == null || !req.session.info.is_teacher) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return;
  }

  try {
    const result = await new ClazzModel(db).getClassesTeacher(req.session.info.id);
    if(result.status === 'success') {
      res.status(200).json({
        status: 'success' ,
        data: result.rows
      });
    } else if(result.status === 'not_found') {
      res.status(200).json({
        status: 'not_found' ,
        data: result.rows
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "we have a problem in the server!"
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "error" ,
      message: "we have a problem in the server!"
    });
  }
});

// delete a class
app.delete(baseUrl + "delete-class/:id", async (req, res) => {
  if(req.session == null || !req.session.info.is_teacher || parseInt(req.session.info.id) !== parseInt(req.body.teacher_id)) {
    res.status(400).json({
      status: "error",
      message: "Plase enter valid params!!!",
    });  
    return;
  }

  try {
    req.body.class_id = req.params.id;
    const result = await new ClazzModel(db).removeClass(req.body);
    if(result.status === "success") {
      res.status(200).json({
        status: "success",
        message: "delete successfully",
      });
    } else {
      res.status(202).json({
        status: "error",
        message: "We can't delete class!!!",
      });  
    }
  } catch(err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "We have a problem in the server!!!",
    });
  }
});

// update class 
app.put(baseUrl + "update-class/:id" , async (req , res) => {
  if(req.body.description == null || req.body.link == null || req.body.title == null || req.session == null || !req.session.info.is_teacher
      || req.body.class_code == null || req.body.capasity == null
      || req.body.department_id == null || req.body.university_id == null  || !req.session.info.is_teacher || req.body.teacher_id !== req.session.info.id) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return;
  }

  try {
    const university = await new UniversityModel(db).getUniversityById(req.body.university_id);
    if(university.status === 'error') {
      res.status(400).json({
        status: "error" ,
        message: "we have a problem!"
      });
      return;
    }

    if(parseInt(university.row.capacity) < req.body.capasity) {
      res.status(202).json({
        status: "error" ,
        message: "ظرفیت کلاس شما نمیتواند از حداکثر ظرفیت دانشگاه شما باشد."
      });
      return;
    }

    req.body.class_id = req.params.id;
    const result = await new ClazzModel(db).updateClass(req.body);

    if(result.status === "SUCCESS"){
      req.session.reload((err) => {
        res.status(200).json({
          status: "success" ,
          message: "We successed to update class!" ,
        });
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "We have a problem in server !!" ,
      });
    }
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error" ,
      message: "We have a problem in server !"
    });
  }
});

// ######################################## Teacher Api
// register teacher
app.post(baseUrl + "register-teacher", async (req, res) => {
  try {
    const id = await new TeacherModel(db).createTeacher(req.body);
    if (id === -1) {
      res.status(500).json({
        status: "error",
        message: "it have a problem to create teacher!!!",
      });
    } else {
      req.session.info = {
        loggined: true ,
        id: id ,
        name: req.body.name ,
        family: req.body.family ,
        national_code: req.body.national_code ,
        email: req.body.email ,
        is_teacher: true
      };

      res.status(201).json({
        status: "success",
        message: "teacher succeesfully generated!",
        data: {
          teacher_id: id,
        },
      });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).json({
      status: "error",
      message: "it have a problem in the server!!!",
    });
  }
});

// remove teacher 
app.delete(baseUrl + 'removeTeacher' , async (req , res) => {
  if(req.body == null) {
    res.status(400).json({
      status: "error" , 
      message: "please enter params required"
    });

    return;
  }

  try {
    const teacherModel = new TeacherModel(db);
    if(await teacherModel.removeTeacher(req.body)) {
      res.status(202).json({
        status: "success" , 
        message: "successfully delete"
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "can not find teacher for deleting"
      });
    }
  } catch(ex) {
    console.log(ex);
    res.status(500).json({
      status: "error" , 
      message: "someting error in server"
    });
  }
}); 


// logging teacher
app.post(baseUrl + "login-teacher" , async (req , res) => {
  if(req.body.password == null || req.body.national_code == null) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });

    return;
  } 

  try {
    const result =  await new TeacherModel(db).loginTeacher(req.body);

    if(result.status === "SUCCESS") {
      req.session.info = {
        loggined: true ,
        id: result.rows[0].id ,
        name: result.rows[0].name ,
        family: result.rows[0].family ,
        national_code: result.rows[0].national_code ,
        email: result.rows[0].email ,
        is_teacher: true
      };

      res.status(200).json({
        status: "success" , 
        message: "Successfully loggined!" , 
        data: {
          id: result.rows[0].id , 
          email: result.rows[0].email , 
          name: result.rows[0].name , 
          family: result.rows[0].family  
        }
      });
    } else if(result.status === "NOT_FOUND") {
      res.status(400).json({
        status: "not_found" , 
        message: "Not Found with these params!"
      });
    } else {
      res.status(500).json({
        status: "error" , 
        message: "We have a problem in server !"
      });
    }
    
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error",
      message: "it have a problem in the server!!!",
    });
  }
});

// update teacher full name 
app.put(baseUrl + "update-teacher" , async (req , res) => {
  if(req.body.email == null  || req.body.password == null  || req.body.name == null || req.body.new_national_code == null ||
      req.body.family == null || req.body.new_password == null || req.session == null || req.session.info.national_code == null || !req.session.info.is_teacher
  ) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return;
  }

  try {
    req.body.national_code = req.session.info.national_code;
    const result = await new TeacherModel(db).updateTeacher(req.body);

    if(result.status === "SUCCESS"){
      req.session.reload((err) => {
        req.session.info = {
          loggined: true ,
          national_code: result.rows[0].national_code ,
          name: result.rows[0].name ,
          family: result.rows[0].family ,
          email: result.rows[0].email ,
          id: result.rows[0].id ,
          is_teacher: true
        };

        res.status(200).json({
          status: "success" ,
          message: "We successed to update teacher!" ,
        });
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "We have a problem in server !!" ,
      });
    }
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error" ,
      message: "We have a problem in server !"
    });
  }
});

// update teacher email or password 
app.put(baseUrl + "updateTeacherEmailOrPassword" , async (req , res) => {
  if(req.body.email == null || req.body.password == null || req.body.new_email == null || req.body.new_password == null) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });

    return;
  }

  try {
    const result = await new TeacherModel(db).updateTeacherEmailOrPassword(req.body); 

    if(result.status == "SUCCESS"){
      res.status(200).json({
        status: "success" , 
        message: "We successed to update teacher!" , 
      });
    } else {
      res.status(500).json({
        status: "error" , 
        message: "We have a problem in server !!" , 
      });
    }
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error" , 
      message: "We have a problem in server !"
    });
  }
});


// ######################################## Student Api 
// register student
app.post(baseUrl + "register-student", async (req, res) => {
  try {
    const id = await new StudentModel(db).createStudent(req.body);
    if (id === -1) {
      res.status(400).json({
        status: "error",
        message: "it have a problem to create student!!!",
      });
    } else {

      req.session.info = {
        loggined: true ,
        id: id ,
        name: req.body.name ,
        family: req.body.family ,
        national_code: req.body.national_code ,
        email: req.body.email ,
        is_teacher: false
      } ;

      res.status(201).json({
        status: "success",
        message: "student succeesfully generated!",
        data: {
          student_id: id,
        },
      });
    }
  } catch (ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error",
      message: "it have a problem in the server!!!",
    });
  }
});


// loggin student
app.post(baseUrl + "login-student" , async (req , res) => {
  if(req.body.password == null || req.body.national_code == null) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return;
  }

  try {
    const result =  await new StudentModel(db).loginStudent(req.body);

    if(result.status === "SUCCESS") {
      req.session.info = {
        loggined: true ,
        id: result.rows[0].id ,
        name: result.rows[0].name ,
        family: result.rows[0].family ,
        national_code: result.rows[0].national_code ,
        email: result.rows[0].email ,
        is_teacher: false
      };

      res.status(200).json({
        status: "success" , 
        message: "Successfully loggined!" , 
        data: {
          id: result.rows[0].id , 
          national_code: result.rows[0].national_code ,  
          email: result.rows[0].email , 
          name: result.rows[0].name , 
          family: result.rows[0].family  
        }
      });
    } else if(result.status === "NOT_FOUND") {
      console.log('not found');
      res.status(400).json({
        status: "not_found" ,
        message: "Not Found with these params!"
      });
    } else if(result.status === "PASSWORD"){
      console.log('not found2');
      res.status(400).json({
        status: "password" ,
        message: "incorrect password!"
      });
    } else {
      res.status(500).json({
        status: "error" , 
        message: "We have a problem in server !"
      });
    }
    
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error",
      message: "it have a problem in the server!!!",
    });
  }
});

// remove student 
app.delete(baseUrl + 'removeStudent' , async (req , res) => {
  if(req.body == null) {
    res.status(400).json({
      status: "error" , 
      message: "please enter params required"
    });

    return;
  }

  try {
    const isRemoved = await new StudentModel(db).removeStudent(req.body);
    if(isRemoved) {
      res.status(202).json({
        status: "success" , 
        message: "successfully delete"
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "can not find student for deleting"
      });
    }
  } catch(ex) {
    console.log(ex);
    res.status(500).json({
      status: "error" , 
      message: "someting error in server"
    });
  }
}); 

// update student email or password 
app.put(baseUrl + "update-student" , async (req , res) => {
  if(req.body.email == null  || req.body.password == null  || req.body.name == null || req.body.new_national_code == null ||
     req.body.family == null || req.body.new_password == null || req.session == null || req.session.info.national_code == null
    ) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });
    return;
  }



  try {
    req.body.national_code = req.session.info.national_code;
    const result = await new StudentModel(db).updateStudent(req.body);

    console.log(result);
    if(result.status === "SUCCESS"){
      req.session.reload((err) => {
        req.session.info = {
          loggined: true ,
          national_code: result.rows[0].national_code ,
          name: result.rows[0].name ,
          family: result.rows[0].family ,
          email: result.rows[0].email ,
          id: result.rows[0].id ,
          is_teacher: false
        };

        res.status(200).json({
          status: "success" ,
          message: "We successed to update student!" ,
        });
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "We have a problem in server !!" , 
      });
    }
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error" , 
      message: "We have a problem in server !"
    });
  }
});

// ######################################## Study
// create study
app.post(baseUrl + "createStudy", async (req, res) => {
  if(req.body.name == null) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });
  }

  try {
    const result = await new StudyModel(db).createStudy(req.body);
    if (result.status == "error") {
      res.status(400).json({
        status: "error",
        message: "it have a problem to create study!!!",
      });
    } else {
      res.status(201).json({
        status: "success",
        message: "study succeesfully generated!",
        data: {
          study_id: result.id,
        },
      });
    }
  } catch (ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error",
      message: "it have a problem in the server!!!",
    });
  }
});


// get studys by id 
app.get(baseUrl + "getStudy/:id" , async (req , res) => {
  console.log(req.params);;

  if(req.params.id == null) {
    res.status(400).json({
      status: "error",
      message: "please enter valid params!!!",
    }); 

    return;
  }

  try {
    const result = await new StudyModel(db).getStudyById(req.params);
    if(result.status == "success") {
      res.status(200).json({
        status: "success",
        message: "you are successfully loaded study!!!", 
        data: result.row
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "it have a problem to get study!!!",
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "it have a problem in server!!!",
    });
  }
});

// remove study 
app.delete(baseUrl + 'removeStudy/:id' , async (req , res) => {
  if(req.params == null) {
    res.status(400).json({
      status: "error" , 
      message: "please enter params required"
    });

    return;
  }

  try {
    const isRemoved = await new StudyModel(db).removeStudy(req.params);
    if(isRemoved) {
      res.status(202).json({
        status: "success" , 
        message: "successfully delete"
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "can not find study for deleting"
      });
    }
  } catch(ex) {
    console.log(ex);
    res.status(500).json({
      status: "error" , 
      message: "someting error in server"
    });
  }
}); 

// update study 
app.put(baseUrl + "updateStudy" , async (req , res) => {
  if(req.body.id == null  || req.body.new_name == null) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });
    
    return;
  }
  
  try {
    const result = await new StudentModel(db).updateStudent(req.body); 
    
    if(result.status == "SUCCESS"){
      res.status(200).json({
        status: "success" , 
        message: "We successed to update study!" , 
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "We have a problem in server !!" , 
      });
    }
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error" , 
      message: "We have a problem in server !"
    });
  }
});

// ######################################## Lesson 
// create lesson
app.post(baseUrl + "createLesson" , async (req , res) => {
  if(req.body.name == null || req.body.study_id == null) {
    res.status(400).json({
        status: "error" , 
        message: "Please enter correct params!"
    });
    return ;
  }

  try {
    const result = await new LessonModel(db).createLesson(req.body);
    if(result.status == "success") {
      res.status(202).json({
        status: "success" , 
        message: "Successfully Lesson Created " , 
        id: result.id
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "We can not create lesson !!!" , 
      });
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).json({
      status: "error" , 
      message: "We have a problem in the server"
  });
  }
});

// get lessons
app.get(baseUrl + "getLesson/:id" , async (req , res) => {
  console.log(req.params);;

  if(req.params.id == null) {
    res.status(400).json({
      status: "error",
      message: "please enter valid params!!!",
    }); 

    return;
  }

  try {
    const result = await new LessonModel(db).getLessonById(req.params);
    if(result.status == "success") {
      res.status(200).json({
        status: "success",
        message: "you are successfully loaded lesson!!!", 
        data: result.row
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "it have a problem to get lesson!!!",
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "it have a problem in server!!!",
    });
  }
});

// remove lesson 
app.delete(baseUrl + 'removeLesson/:id' , async (req , res) => {
  if(req.params == null) {
    res.status(400).json({
      status: "error" , 
      message: "please enter params required"
    });

    return;
  }

  try {
    const isRemoved = await new LessonModel(db).removeLesson(req.params);
    if(isRemoved) {
      res.status(202).json({
        status: "success" , 
        message: "successfully delete"
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "can not find Lesson for deleting"
      });
    }
  } catch(ex) {
    console.log(ex);
    res.status(500).json({
      status: "error" , 
      message: "something error in server"
    });
  }
}); 

// update lesson 
app.put(baseUrl + "updateLesson" , async (req , res) => {
  if(req.body.id == null  || req.body.new_name == null || req.body.new_study_id == null) {
    res.status(400).json({
      status: "error" , 
      message: "Please enter correct params!"
    });
    
    return;
  }
  
  try {
    const result = await new LessonModel(db).updateLesson(req.body); 
    
    if(result.status == "SUCCESS"){
      res.status(200).json({
        status: "success" , 
        message: "We successed to update study!" , 
      });
    } else {universities
      res.status(400).json({
        status: "error" , 
        message: "We have a problem in server !!" , 
      });
    }
  } catch(ex) {
    console.log(ex.message);
    res.status(500).json({
      status: "error" , 
      message: "We have a problem in server !"
    });
  }
});

// last class
app.get(baseUrl + 'classes', async (req , res) => {
  try {
    const result = await new ClazzModel(db).getLastClass(10);
    if(result.status === 'success') {
      res.status(200).json({
        status: "success" ,
        message: "Successfully classes" ,
        data: result.rows
      });
    } else {
      res.status(200).json({
        status: "not_found" ,
        message: "we haven't any class" ,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "We have a problem in server !"
    });
  }
});

// reserve class 
app.post(baseUrl + "create-reserve-class/:id" , async (req , res) => {
  if(req.session == null || req.session.info.is_teacher) {
    res.status(400).json({
        status: "error" , 
        message: "Please enter correct params!"
    });
    return ;
  }

  try {
    req.body.class_id   = req.params.id;
    req.body.student_id = req.session.info.id;
    const result = await new ReserveModel(db).reserveClass(req.body);
    if(result.status === "success") {
      res.status(200).json({
        status: "success" , 
        message: "Successfully reserved  " , 
        id: result.id
      });
    } else {
      res.status(400).json({
        status: "error" , 
        message: "We can not reserve class !!!" , 
      });
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).json({
      status: "error" , 
      message: "We have a problem in the server"
  });
  }
});

// get reserved class
app.get(baseUrl + 'reserved-class/:id' , async (req, res) => {
  if(req.session == null || req.session.info.is_teacher) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return ;
  }

  try {
    req.body.class_id   = req.params.id;
    req.body.student_id = req.session.info.id;
    const result = await new ReserveModel(db).getReservedClass(req.body);
    if(result.status === "success") {
      res.status(200).json({
        status: "success" ,
        message: "Successfully reserved  " ,
        data: result.data
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "We can not reserve class !!!" ,
      });
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).json({
      status: "error" ,
      message: "We have a problem in the server"
    });
  }
})


// unresere class 
app.delete(baseUrl + 'unreserve-class/:id' , async (req , res) => {
  if(req.session == null || req.session.info.is_teacher) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return ;
  }

  try {
    req.body.class_id   = req.params.id;
    req.body.student_id = req.session.info.id;
    const result = await new ReserveModel(db).unreserveClass(req.body);
    if(result.status === "success") {
      res.status(202).json({
        status: "success" ,
        message: "Successfully unreserved  " ,
        data: result.data
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "We can not reserve class !!!" ,
      });
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).json({
      status: "error" ,
      message: "We have a problem in the server"
    });
  }
});

// all reserved class
app.get(baseUrl + 'reserve-class/all' , async (req , res) => {
  if(req.session == null || req.session.info.is_teacher) {
    res.status(400).json({
      status: "error" ,
      message: "Please enter correct params!"
    });
    return ;
  }

  try {
    const result = await new ReserveModel(db).getAllReservedClass(req.session.info.id);
    if(result.status === "success") {
      res.status(200).json({
        status: "success" ,
        message: "Successfully get  " ,
        data: result.data
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "We can not reserve class !!!" ,
      });
    }
  } catch(err) {
    console.log(err.message)
    res.status(500).json({
      status: "error" ,
      message: "We have a problem in the server"
    });
  }
});

// department
app.get(baseUrl + "departments" ,async (req , res) => {
  try {
    const result = await new DepartmentModel(db).getDepartments();
    if(result.status === 'success') {
      res.status(200).json({
        status: "success" ,
        message: "successfully got" ,
        data: result.rows
      });

      return;
    }

    res.status(400).json({
      status: "error" ,
      message: "can not read!"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "we have a problem in the server !"
    });
  }
});


// university api
app.get(baseUrl + "universities" ,async (req , res) => {
  try {
    const result = await new UniversityModel(db).getUniversities();
    if(result.status === 'success') {
      res.status(200).json({
        status: "success" ,
        message: "successfully got" ,
        data: result.rows
      });

      return;
    }

    res.status(400).json({
      status: "error" ,
      message: "can not read!"
    });
  } catch (err) {
    console.log(err.message)
    res.status(400).json({
      status: "error" ,
      message: "can not read!"
    });
  }
});

// get session by class id
app.get(baseUrl + 'class/:class_id/session/' , async (req , res) => {
  if(req.session == null || req.params.class_id == null ) {
    res.status(403).json({
      status: "error" ,
      message: "Your Status is Denid!"
    });
    return;
  }

  try {
    const result = await new SessionModel(db).getSessionByIdClass(req.params.class_id);
    if(result.status === 'success') {
      res.status(200).json({
        status: "success" ,
        data: result.rows
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "session for this class is empty"
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "we have a problem in the server "
    });
  }
});




// api sessions table
app.post(baseUrl + 'teacher-get-session/' , async (req , res) => {
  if(req.session == null || !req.session.info.is_teacher ||
      req.body.class_id == null || req.body.date == null ) {
    res.status(403).json({
      status: "error" ,
      message: "Your Status is Denid!"
    });
    return;
  }

  try {
    const sessionModel = new SessionModel(db);
    const result = await sessionModel.getAllSession(req.body);
    if(result.status === 'empty') {
      res.status(200).json({
        status: "success" ,
        data: common.getStartTimes
      });
    } else {
      const times = sessionModel.splitSessionAndTime(result.rows);
      res.status(200).json({
        status: "success" ,
        data: times
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "we have a problem in the server "
    });
  }
});

// create sessions item
app.post(baseUrl + 'create-session/' , async (req , res) => {
  if(req.session == null || !req.session.info.is_teacher ||
      req.body.class_id == null || req.body.date == null ||
      req.body.time_id == null) {
    res.status(403).json({
      status: "error" ,
      message: "Your Status is Denid!"
    });
    return;
  }

  try {
    const resultDate = await new DateModel(db).createDate(req.body.date);
    if(resultDate.status === 'success') {
      const result = await new SessionModel(db).createSessionItem(
          req.body.class_id , resultDate.date_id , req.body.time_id
      );

      if(result.status === 'success') {
        res.status(200).json({
          status: "success" ,
          id: result.id
        });
      } else {
        res.status(401).json({
          status: "error" ,
          message: "we have a problem in create session item "
        });
      }
    } else {
      res.status(400).json({
        status: "error" ,
        message: "we have a problem in create date item "
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "we have a problem in the server "
    });
  }
});
// remove sessions
app.delete(baseUrl + "delete-session" , async (req , res) => {
  if(req.session == null || !req.session.info.is_teacher || req.body.session_id == null) {
    res.status(403).json({
      status: "error" ,
      message: "Your Status is Denid!"
    });
    return;
  }

  try {
    const result = await new SessionModel(db).removeSession(req.body);
    if(result.status === 'success') {
      res.status(200).json({
        status: "success" ,
        message: "we successfully deleted"
      });
    } else {
      res.status(400).json({
        status: "error" ,
        message: "we have a problem in remove session"
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "we have a problem in the server "
    });
  }
});

// search the website
app.get(baseUrl + "search", async (req, res) => {
  if(req.query.city == null || req.query.department == null ||
      req.query.uni == null || req.query.words == null) {
    res.status(403).json({
      status: "error" ,
      message: "Your Status is Denid!"
    });
    return;
  }


  try {
    req.query = {
      city: parseInt(req.query.city) ,
      uni: parseInt(req.query.uni) ,
      department: parseInt(req.query.department) ,
      words: String(req.query.words)
    }
    const result = await new SearchModel(db).search(req.query);
    if(result.status === 'success') {
      res.status(200).json({
        status: "success" ,
        message: "we successfully loaded classes! " ,
        data: result.rows
      });
    } else {
      res.status(200).json({
        status: "not_found" ,
        message: "we not founded any class! "
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error" ,
      message: "we have a problem in the server "
    });
  }
});

// get city
app.get(baseUrl + 'all-city/' , async (req , res) => {
    try {
        const result = await new CityModel(db).getAllCity();
        if(result.status === 'success') {
            res.status(200).json({
                status: "success" ,
                message: "we successfully loaded city! " ,
                data: result.rows
            });
        } else {
            res.status(200).json({
                status: "not_found" ,
                message: "we not founded any city! "
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            status: "error" ,
            message: "we have a problem in the server "
        });
    }
});

// get province
app.get(baseUrl + 'all-province/' , async (req , res) => {
    try {
        const result = await new ProvinceModel(db).getAllProvince();
        if(result.status === 'success') {
            res.status(200).json({
                status: "success" ,
                message: "we successfully loaded province! " ,
                data: result.rows
            });
        } else {
            res.status(200).json({
                status: "not_found" ,
                message: "we not founded any province! "
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            status: "error" ,
            message: "we have a problem in the server "
        });
    }
});

// listen server
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

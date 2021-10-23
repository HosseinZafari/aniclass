import api from './index'
import { convertProgressLengthToPercent } from '../common/Useful'

export const getUserInfo = async (data = {}) => await api.get('/authentication' , data)

export const studentLogin =  (data, onProgress = (p) => {}) =>  api.post('/student/login', data, {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const studentSignup = async (data, onProgress = (p) => {}) => await api.post('/student/register', data , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const teacherLogin =  (data, onProgress = (p) => {}) =>  api.post('/teacher/login', data, {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const teacherSignup = async (data, onProgress = (P) => {}) => await api.post('/teacher/register', data, {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})


export const getClassReservedCount = async (onProgress = (p) => {}) => await api.get('/class/reserved/all/count'  , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const getClassReservedTeacherCount = async (onProgress = (p) => {}) => await api.get('/class/created/all/count'  , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const getClassReserved = async (onProgress = (p) => {}) => await api.get('/class/reserved/all'  , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const getClassCreated = async (onProgress = (p) => {}) => await api.get('/class/created/all'  , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const getClassById = async (id , onProgress = (p) => {}) => await api.get(`/class/${id}`  , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const getSessionsOfClass = async (id , onProgress = (p) => {}) => await api.get(`/class/${id}/sessions/all`  , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const logoutStudent = async (onProgress = (p) => {}) => await api.delete('/device/remove' , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})
export const logoutTeacher = async (onProgress = (p) => {}) => await api.delete('/device/remove' , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const unReserveClassStudent = async (id , onProgress = (p) => {}) => await api.delete(`/class/${id}/unreserve` , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const removeClassApi = async (id , onProgress = (p) => {}) => await api.delete(`/class/${id}/remove/` , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})


export const reserveClassApi = async (id , password , onProgress = (p) => {}) => await api.post(`/class/${id}/reserve` , {
  password,
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const searchClass = async (department, province, page, words, lastId, onProgress = (P) => {}) => await api.post(`/search/${department}/${province}/${page}`, {
  words,
  lastId,
}, {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})


export const teacherUpdate = async (firstName, lastName, email , nationalCode , password , onProgress = (P) => {}) => await api.patch('/teacher/update', {
  firstName,
  lastName,
  email,
  nationalCode,
  password
} , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const studentUpdate = async (firstName, lastName, email , nationalCode , password , onProgress = (P) => {}) => await api.patch('/student/update', {
  firstName,
  lastName,
  email,
  nationalCode,
  password
} , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})


export const addUniversity = async(qrcode , onProgress = (P) => {}) => await api.post('/university/add' , {
  qrcode,
} , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})

export const addDepartment = async (qrcode, universityId, onProgress = (s) => {
}) => await api.post('/department/add' , {
  qrcode ,
  universityId
})   

export const getUniversitiesApi = async (onProgress = (s) => {
}) => await api.get('/university/get/all' )

export const getDepartmenstTeacher = async (universityId , onProgress = (s) => {
}) => await api.post('/department/get/all' , {
  universityId
})

export const addLesson = async (title , class_code , description , department_id , university_id , capacity , link ,  password , onProgress = (s) => {}) => await api.post('/class/new' , {
  title , 
  class_code , 
  description , 
  department_id, 
  link,
  university_id , 
  capacity,
  password: password === '' ? -1 : password
})

export const getTimeNow = async () => await api.get('/time/now')

export const getAvailableHourOfDay = async (date , classId) => await api.post(`/time/available/day/` , {
  date,
  classId: parseInt( classId)
})  


export const createSession = async (timeId , date , name , classId) => 
await api .post('/time/session/new' , {
  timeId ,
  date , 
  name , 
  classId
}) 
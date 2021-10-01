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

export const reserveClass = async (id , onProgress = (p) => {}) => await api.post(`/class/${id}/reserve` , {
  onDownloadProgress: (event) => {
    const percent = convertProgressLengthToPercent(event.loaded, event.total)
    onProgress(percent)
  }
})


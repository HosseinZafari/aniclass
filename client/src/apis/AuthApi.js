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

import axios from 'axios';
import Config from 'src/common/Config';
import store from '../redux/store/Store'
import { disableProgressbar, enableProgressbar } from '../redux/reducers/ProgressbarSlice'
import { getInfo } from '../common/Useful'

const api = axios.create({
    baseURL: Config.serverUrl ,
    withCredentials: true
});

api.interceptors.request.use((req) => {
    store.dispatch(enableProgressbar())
    if(getInfo()){
        req.headers.Authorization = getInfo().token
    }
    return req
} , error => {
    return Promise.reject(error);
})

api.interceptors.response.use((res) => {
    store.dispatch(disableProgressbar())
    return res
} , error => {
    store.dispatch(disableProgressbar())
    return Promise.reject(error);
})
export default api

import axios from 'axios';
import Config from 'src/common/Config';

const AniClassApi = axios.create({
    baseURL: Config.serverUrl , 
    withCredentials: true 
});


export default AniClassApi;

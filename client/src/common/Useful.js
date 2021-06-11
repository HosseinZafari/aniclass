import {useLocation} from 'react-router-dom';


export const importFromPublic = (src) => {
    return window.location.origin + "/" + src;
}

export const convertProgressLengthToPercent = (loaded , total) => {
    return loaded * 100 / total;
}

export const isEnableProgressBar = percent => !Array.isArray(percent)
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

Array.prototype.removeValue = function(name, value){
    this.forEach((v,i) => {
        if(v[name] === value) {
            this.splice(i , 1);
        }
    });
}
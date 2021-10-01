import {useLocation} from 'react-router-dom';
import { useEffect } from 'react'


export const importFromPublic = (src) => {
    return window.location.origin + "/" + src;
}

export const convertProgressLengthToPercent = (loaded , total) => {
    return loaded * 100 / total;
}

export const getInfo = () => {
    const info = {}
    info.token = localStorage.getItem('$ecret' )
    info.isTeacher = localStorage.getItem('ist') !== '0'
    return info
}

export const setInfo = (token , isTeacher= '0') => {
    localStorage.setItem('$ecret' , token )
    localStorage.setItem('ist' , isTeacher)
}

export const clearInfo = () => {
    localStorage.setItem('$ecret' , null)
    localStorage.setItem('ist' , '0')
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

export const copyToClipboard = (text , onSuccess) => {
    navigator.clipboard.writeText(text)
      .then(r => onSuccess())
}

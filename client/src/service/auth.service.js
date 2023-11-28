import { Axios } from "./axiosConfig";

export const openLogin = () => {
    return Axios('/auth/login').then(res => res.data);
}

export const saveSession = (data) => {
    sessionStorage.setItem(
        "checkedLogin",
        JSON.stringify(data)
      );
}

export const getSavedSession = () => {
    const savedToken = sessionStorage.getItem("checkedLogin")
    if(savedToken)
        return JSON.parse(sessionStorage.getItem("checkedLogin"));
    else 
        return null;
}
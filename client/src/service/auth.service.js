import { Axios } from "./axiosConfig";

export const openLogin = () => {
    return Axios('/auth/login').then(res => res.data);
}

export const checkAuth = () => {
    return new Promise((resolve, reject) => {
        const token = getSavedSession();

        if (token) 
            resolve(token);
        else 
            Axios("/auth")
            .then(response => {
                saveSession(response.data);
                resolve(response.data)
            })
            .catch(reject);
    });    
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
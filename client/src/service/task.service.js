import { Axios } from "./axiosConfig"

export const getTasks = () => {
    return Axios.get('/task/list');
}
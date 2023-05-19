import { axiosApi } from "../utils/mainApi"

export const doRegister = async (data) => {
    try {
        const response = await axiosApi.post(`/api/auth/register`, data);
        return response.data;
    } catch (error) {
        //console.log(("error", error));
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doLogin = async (data) => {
    try {
        const response = await axiosApi.post(`/api/auth/login`, data);
        return response.data;
    } catch (error) {
        //console.log(("error", error));
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}
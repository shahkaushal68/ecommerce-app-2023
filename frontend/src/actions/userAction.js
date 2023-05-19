import { axiosApi } from "../utils/mainApi"

export const getLoginUser = async (data) => {
    try {
        const response = await axiosApi.get(`/api/user/loginUserDetails`, data);
        //console.log("response1", response);
        return response.data;
    } catch (error) {
        //console.log(("error", error));
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}
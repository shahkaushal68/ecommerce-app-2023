import { axiosApi } from "../../utils/mainApi";

export const getAllCats = async () => {
    try {
        const response = await axiosApi.get(`api/category`);
        return response.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const addCat = async (data) => {
    try {
        const response = await axiosApi.post(`api/category/add`, data);
        return response.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const updateCat = async ({slug, data}) => {
    try {
        const response = await axiosApi.put(`api/category/${slug}`, data);
        return response.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const deleteCat = async (id) => {
    try {
        const response = await axiosApi.delete(`api/category/${id}`);
        return response.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const getSingleCat = async (slug) => {
    try {
        const response = await axiosApi.get(`api/category/${slug}`);
        return response.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}
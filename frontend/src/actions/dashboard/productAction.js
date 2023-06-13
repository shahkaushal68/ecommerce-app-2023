import { axiosApi } from "../../utils/mainApi"

export const fetchAllProducts = async () => {
    try {
        const response = await axiosApi.get(`api/product`);
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const fetchSingleProduct = async (slug) => {
    try {
        const response = await axiosApi.get(`api/product/single/${slug}`);
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const addProduct = async (data) => {
    //console.log("data", data);
    try {
        const response = await axiosApi.post(`api/product/add`, data);
        return response?.data;
    } catch (error) {
        console.log("error", error);
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const updateProduct = async (id, data) => {
    try {
        const response = await axiosApi.put(`api/product/${id}`, data);
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axiosApi.delete(`api/product/${id}`);
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

//FilterProducts
export const filterProduct = async ({ checkVal, checkRadio }) => {
    //console.log("action---", {checkVal, checkRadio});
    try {
        const response = await axiosApi.post(`api/product/filter`, {checkVal, checkRadio});
        //console.log("res", response);
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

// Paginate Products
export const getPaginateProduct = async (num) => {
    try {
        const response = await axiosApi.get(`api/product/product-list?page=${num}`);
        //console.log("res", response);
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}
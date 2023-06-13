import React, { useState, useEffect } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useParams } from 'react-router-dom'
import { fetchSingleProduct } from '../../../actions/dashboard/productAction';

const ViewProduct = () => {
    const { slug = "" } = useParams();
    const [productDetail, setProductDetail] = useState({})
    const getSingleProduct = async (slug) => {
        if (slug) {
            const singleProdRes = await fetchSingleProduct(slug);
            if (singleProdRes?.status === 200) {
                setProductDetail(singleProdRes?.data);
            } else {
                toast.error(singleProdRes?.message);
            }
        }
    }
    //console.log("productDetail", productDetail);
    useEffect(() => {
        getSingleProduct(slug);
    }, [slug])

    return (
        <AdminLayout>
            <div className='row'>
                <b>Name: {productDetail?.name}</b>
            </div>
        </AdminLayout>
    )
}

export default ViewProduct

import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAllProducts } from '../../../actions/dashboard/productAction';
import { toast } from 'react-toastify';


const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const getAllProducts = async () => {
        const allProdRes = await fetchAllProducts();
        if (allProdRes?.status === 200) {
            setAllProducts(allProdRes?.data);
        } else {
            toast.error(allCatResponse?.message);
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);

    const handleDelete = async (id) => {
        const deleteRes = await deleteProduct(id);
        if (deleteRes?.status === 200) {
            toast.success("product deleted successfully");
            getAllProducts();
        } else {
            toast.error(deleteRes?.message);
        }
    }

    return (
        <AdminLayout>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProducts?.map((allProd, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={`${import.meta.env.VITE_REACT_APP_API_BASE_URI}/images/product-images/${allProd?.image}`} width="100px" />{allProd?.name}</td>
                                    <td>{allProd?.price}</td>
                                    <td>{allProd?.quantity}</td>
                                    <td>{allProd?.category?.name}</td>
                                    <td>
                                        <Link to={`/admin/products/view/${allProd?.slug}`} className="btn">
                                            <i className="bi bi-eye" />
                                        </Link>
                                        <Link to={`/admin/products/edit/${allProd?.slug}`} className="btn">
                                            <i className="bi bi-pencil" />
                                        </Link>
                                        <button className="btn" onClick={() => handleDelete(allProd?._id)} > <i className="bi bi-trash" /></button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </AdminLayout >
    )
}

export default AllProducts

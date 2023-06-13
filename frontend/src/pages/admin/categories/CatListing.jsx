import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { Link } from 'react-router-dom'
import { deleteCat, getAllCats } from '../../../actions/dashboard/categoryAction';
import { toast } from 'react-toastify';

const CatListing = () => {
    const [allCats, setAllCats] = useState([]);
    useEffect(() => {
        fetchAllcats();
    }, []);
    const fetchAllcats = async () => {
        const allCatResponse = await getAllCats();
        //console.log("res", allCatResponse );
        if (allCatResponse?.status === 200) {
            setAllCats(allCatResponse?.data);
        } else {
            toast.error(allCatResponse?.message);
        }
    }
    const handleDelete = async (slug) => {
        const deleteCatRes = await deleteCat(slug);
        //console.log("deleteCatRes", deleteCatRes);
        if (deleteCatRes?.status === 200) {
            toast.success("category deleted successfully");
        } else {
            toast.error(deleteCatRes?.message);
        }
        fetchAllcats();
    }

    return (
        <AdminLayout title="Categories" subTitle="All categories">
            <table className="table table-bordered">
                <thead className='thead-dark'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Category Slug</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCats?.map((cat, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{cat?.name}</td>
                                    <td>{cat?.slug}</td>
                                    <td>
                                        <Link to={`/admin/categories/edit/${cat?.slug}`} className="btn">
                                            <i className="bi bi-pencil" />
                                        </Link>
                                        <button className="btn" onClick={() => handleDelete(cat?.slug)}><i className="bi bi-trash" /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </AdminLayout>
    )
}

export default CatListing

import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout';
import slugify from 'slugify';
import FormInput from '../../../components/form/FormInput';
import { addCat, getSingleCat, updateCat } from '../../../actions/dashboard/categoryAction';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const CatAdd = () => {
    const [inputField, setInputField] = useState({
        name: ""
    });
    const { slug = "" } = useParams();
    const navigate = useNavigate();
    const handleChange = (event) => {
        setInputField({
            ...inputField,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const catRes = await addCat({ ...inputField });
        //console.log("catRes", catRes);
        if (catRes.status === 200) {
            navigate("/admin/categories");
            toast.success("category added Successfully");
        } else {
            toast.error(catRes?.message);
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateCatRes = await updateCat({ slug, data: inputField });
        if (updateCatRes.status === 200) {
            navigate("/admin/categories");
            toast.success("category updated Successfully");
        } else {
            toast.error(updateCatRes?.message);
        }
    }
    const getCat = async (slug) => {
        if (slug) {
            const getCatRes = await getSingleCat(slug);
            if (getCatRes.status === 200) {
                setInputField({
                    name: getCatRes?.data?.name
                });
            } else {
                toast.error(getCatRes?.message);
            }
        }
    }
    useEffect(() => {
        getCat(slug);
    }, [slug])

    return (
        <AdminLayout title="Catgory" subTitle={slug ? "Update Category" : "Add New Category"}>
            <div className='row'>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Category Name</label>
                        <FormInput type="text" className="form-control" name="name" value={inputField.name} onChange={handleChange} required={true} />
                        <span>slug:-{slugify(inputField.name)}</span>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={slug ? handleUpdate : handleSubmit}>{slug ? "Update" : "Add"}</button>
                </form>

            </div>
        </AdminLayout>
    )
}

export default CatAdd

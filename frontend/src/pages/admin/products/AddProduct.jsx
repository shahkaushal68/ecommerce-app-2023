import React, { useState, useEffect } from 'react'
import AdminLayout from '../layout/AdminLayout'
import FormInput from '../../../components/form/FormInput'
import { getAllCats } from '../../../actions/dashboard/categoryAction';
import { toast } from 'react-toastify';
import { addProduct } from '../../../actions/dashboard/productAction';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [inputVal, setInputVal] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
    });
    const [shipping, setShipping] = useState(false);
    const [photo, setPhoto] = useState("");
    const [allCats, setAllCats] = useState([]);

    const handleChange = (e) => {
        setInputVal({
            ...inputVal,
            [e.target.name]: e.target.value
        })
    }

    const handleShippingChange = () => {
        setShipping(!shipping);
    }
    const navigate = useNavigate();
    const handleSumbit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // inputVal?.map((val, index) => (
        //     formData.append([val.key], val.value)
        // ))
        formData.append("name", inputVal?.name);
        formData.append("description", inputVal?.description);
        formData.append("price", inputVal?.price);
        formData.append("quantity", inputVal?.quantity);
        formData.append("category", inputVal?.category);
        formData.append("productImage", photo);
        formData.append("shipping", shipping);
        const addProdRes = await addProduct(formData);
        console.log("addProdRes", addProdRes);
        if (addProdRes?.status === 200) {
            toast.success("Product added successfully");
            navigate("/admin/products");
        } else {
            toast.error(addProdRes?.message);
        }
    }
    const fetchAllCats = async () => {
        const allCatsRes = await getAllCats();
        if (allCatsRes?.status === 200) {
            setAllCats(allCatsRes?.data)
        } else {
            toast.error(allCatsRes?.message);
        }
    }
    useEffect(() => {
        fetchAllCats();
    }, [])

    return (
        <AdminLayout>
            <h3>Add Product</h3>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <FormInput type="text" name="name" value={inputVal?.name} onChange={handleChange} className="form-control" placeholder="Enter Product name" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <FormInput type="text" name="description" value={inputVal?.description} onChange={handleChange} className="form-control" placeholder="Enter Product description" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <FormInput type="text" name="price" value={inputVal?.price} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <FormInput type="text" name="quantity" value={inputVal?.quantity} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" name="productImage" onChange={(e) => setPhoto(e.target.files[0])} className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label>Select Category</label>
                    <select name="category" className="custom-select" value={inputVal?.category} onChange={handleChange}>

                        <option>Choose...</option>
                        {
                            allCats?.map((allCat) => {
                                //console.log("allCat?._id---->", allCat?._id)
                                return (

                                    <option value={allCat?._id} key={allCat?._id}>{allCat?.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-check">
                    <input type="checkbox" name="shipping" onChange={handleShippingChange} className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Shipping</label>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" onClick={handleSumbit}>Submit</button>
            </form>
        </AdminLayout>
    )
}

export default AddProduct

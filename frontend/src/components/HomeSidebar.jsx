import React, { useState, useEffect } from 'react'
import { getAllCats } from '../actions/dashboard/categoryAction';
import { priceList } from '../utils/priceList';
import { json } from 'react-router-dom';

const HomeSidebar = () => {
    const [allCats, setAllCats] = useState([]);
    const [checkVal, setCheckVal] = useState([]);
    const [checkRadio, setCheckRadio] = useState([]);
    const fetchAllcats = async () => {
        const catsRes = await getAllCats();
        if (catsRes?.status === 200) {
            setAllCats(catsRes?.data);
        } else {
            toast.error(catsRes?.message);
        }
    }
    const handleCheck = (val, id) => {
        let allVal = [...checkVal];
        if (val) {
            allVal.push(id)
        } else {
            allVal = allVal.filter((item) => item !== id);
        }
        setCheckVal(allVal);
    }


    const handleRadio = (e) => {
        setCheckRadio(e.target.value);
    }

    useEffect(() => {
        fetchAllcats();
    }, []);

    return (
        <div className='filter-listing'>
            <div className='all-cats'>
                <h6>Categories</h6>
                <ul>
                    {
                        allCats?.map((cat) => {
                            return (
                                <li key={cat?._id}>
                                    <input
                                        name="checkVal"
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(e) => handleCheck(e.target.checked, cat?._id)} />{cat?.name}
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <div className='all-price'>
                <h6>Prices</h6>
                {
                    priceList.map((p) => {
                        return (
                            <div key={p.id} className="form-check">
                                <input type="radio" className="form-check-input" name="price" value={p.range} onChange={handleRadio} />{p.name}
                            </div>
                        )
                    })
                }

            </div>

        </div>

    )
}

export default HomeSidebar

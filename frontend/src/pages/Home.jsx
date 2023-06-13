import { Link } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { fetchAllProducts, filterProduct, getPaginateProduct } from "../actions/dashboard/productAction";
import { getAllCats } from "../actions/dashboard/categoryAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import HomeSidebar from "../components/HomeSidebar";
import { priceList } from "../utils/priceList";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allCats, setAllCats] = useState([]);
  const [checkVal, setCheckVal] = useState([]);
  const [checkRadio, setCheckRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);


  const getAllProds = async (page) => {

    const allProdsRes = await getPaginateProduct(page);
    //console.log("allProdsRes", allProdsRes);
    if (allProdsRes?.status === 200) {
      setAllProducts(allProdsRes?.data?.paginateProducts);
      setTotalCount(allProdsRes?.data?.totalCount);
    } else {
      toast.error(allProdsRes?.message);
    }
  }

  const fetchAllCats = async () => {
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

  const filterProducts = async ({ checkVal, checkRadio }) => {
    const filterRes = await filterProduct({ checkVal, checkRadio });
    //console.log("filterRes", filterRes);
    if (filterRes?.status === 200) {
      setAllProducts(filterRes?.data);
    } else {
      toast.error(filterRes?.message);
    }
  }

  const handleRadio = (e) => {
    let range = e.target.value;
    let rangeArray = range.split(",");
    //console.log("e", rangeArray);
    setCheckRadio(rangeArray);
  }
  useEffect(() => {
    if (!checkVal.length || !checkRadio) {
      getAllProds(page);
    }
  }, [checkVal.length, checkRadio.length]);

  useEffect(() => {
    if (checkVal.length || checkRadio.length) {
      filterProducts({ checkVal, checkRadio });
    }
  }, [checkVal, checkRadio]);

  useEffect(() => {
    fetchAllCats();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async (page) => {
    try {
      setLoading(true);
      const { data } = await getPaginateProduct(page);
      console.log("data", data);
      setLoading(false);
      setAllProducts([...allProducts, data?.paginateProducts]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //console.log(checkRadio, checkVal);
  const clearFilter = () => {
    setCheckRadio([]);
    setCheckVal([]);
  }
  const handleLoadMore = (e) => {
    e.preventDefault();
    setPage(page + 1);
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="clear-all">
              <button onClick={clearFilter}>Clear All</button>
            </div>
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
          </div>
          <div className="col-md-9">
            <div className="productLisitng">
              <div className="row">
                {
                  allProducts?.map((prod) => {
                    return (
                      <div className="col-md-4" key={prod?._id}>
                        <div className="card">
                          <img className="card-img-top" src={`${import.meta.env.VITE_REACT_APP_API_BASE_URI}/images/product-images/${prod?.image}`} alt="product_pic" />
                          <div className="card-body">
                            <h4 className="card-title">{prod?.name}</h4>
                            <p className="card-text">{prod?.category?.name}</p>
                            <p className="card-text">{prod?.price}</p>
                            <div className="action-button">
                              <Link to="#" className="btn btn-small btn-primary">See Profile</Link>
                              <button type="button" className="btn btn-info">Add to Cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <div className="load-more">
                  {
                    allProducts && allProducts.length < totalCount && (
                      <button type="button" className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

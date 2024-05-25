import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/cards/Product";
import { clearErrors, getProduct } from "../actions/productAction";
import { toast } from "react-toastify";
import Loader from "../components/layout/loader/Loader";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Slider } from "@mui/material";
import { Typography } from "@mui/material";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books & Media",
  "Toys & Games",
  "Health & Wellness",
  "Automotive",
  "Grocery & Gourmet Foods",
];

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProducts,
  } = useSelector((state) => state.products);

  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const handleCategory = (category) => {
    setCategory(category);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);
  let count = filteredProducts;
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="search-section">
            <div className="search-content">
              <h1>
                Search, Decide, <span>Acquire</span>
              </h1>
              <form onSubmit={searchSubmitHandler}>
                <input
                  type="text"
                  placeholder="Search for products"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </section>
          <section className="products-section">
            <div className="ps-left">
              <div className="filterbox">
                <div className="price-slider">
                  {" "}
                  <Typography>Price</Typography>
                  <Slider
                    sx={{ width: 300 }}
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={1000000}
                  />
                </div>
                <div className="category-select">
                  <Typography>Categories</Typography>
                  <select
                    value={category}
                    onChange={(event) => handleCategory(event.target.value)}
                  >
                    <option value="" className="category-option">
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        className="category-option"
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ratings-slider">
                  <fieldset>
                    <Typography component="legend">Ratings</Typography>
                    <Slider
                      sx={{ width: 300 }}
                      value={ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={5}
                      step={null}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="ps-right">
              <div className="products-heading">
                <h1>Discover Your Next Must-Have</h1>
                <p>
                  Browse our selection of top-rated products and uncover your
                  next favorite find!
                </p>
                <hr />
              </div>
              <div className="product-cards">
                {products ? (
                  <>
                    {products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </>
                ) : (
                  <div className="no-product">
                    <h1>No Products Found </h1>
                    <span>
                      <MdError />
                    </span>
                  </div>
                )}
              </div>

              {resultPerPage <= count && (
                <div className="pagination">
                  <Pagination
                    count={Math.ceil(productsCount / resultPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    hideNextButton
                    hidePrevButton
                    size="large"
                  />
                </div>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;

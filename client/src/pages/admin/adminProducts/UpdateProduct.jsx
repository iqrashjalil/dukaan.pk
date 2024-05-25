import React, { useEffect, useState } from "react";
import "./newproduct.css";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstant";
import SideBar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagePreview] = useState([]);

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

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, updateError, navigate, isUpdated, id, product]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("brand", brand);
    myForm.set("description", description);
    myForm.set("category", category);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <section className="dashboard">
        <SideBar />
        <form onSubmit={updateSubmitHandler} className="add-product-form">
          <h1>Add Products</h1>
          <div className="add-product">
            <div className="product-add-left">
              <div className="input">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter Product Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="category">Category </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  id="category"
                >
                  <option value="">Select Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  placeholder="Enter Brand Name Here"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="Enter Detailed Product Description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="product-add-right">
              <div className="input double-input">
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  {" "}
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              <div className="input">
                <label htmlFor="images">Product Images</label>
                <input
                  type="file"
                  accept="image/*"
                  name="avtar"
                  onChange={updateImagesChange}
                  multiple
                />
              </div>

              <div className="image-preview">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt={`Preview ${index}`} />
                  ))}
              </div>

              <div className="image-preview">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt={`Preview ${index}`} />
                ))}
              </div>

              <div className="add-button">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary add-btn"
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateProduct;

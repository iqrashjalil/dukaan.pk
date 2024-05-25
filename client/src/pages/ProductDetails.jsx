import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productAction.jsx";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loader from "../components/layout/loader/Loader.jsx";
import ReviewCard from "../components/cards/ReviewCard.jsx";
import { toast } from "react-toastify";
import { addItemsToCart } from "../actions/cartAction.jsx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../constants/productConstant.jsx";
const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, toast, reviewError, success]);
  if (!product) {
    return <div>No product data available</div>;
  }
  const options = {
    size: "large",
    value: parseFloat(product.ratings), // Convert to number
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="product-details">
            <div className="details-left ">
              <Carousel className="Carousel">
                {product.images && product.images.length > 0 ? (
                  product.images.map((item, i) => (
                    <img src={item.url} key={i} alt={`${i} Slide`} />
                  ))
                ) : (
                  <div>No images available</div>
                )}
              </Carousel>
            </div>
            <div className="details-right">
              <div className="product-title">
                <h2>{product.name}</h2>
                <p>
                  Product # <span className="tomato">{product._id}</span>
                </p>
                <p className="d-flex align-items-center">
                  Brand # <span> </span>
                  <h4 className="text-success">{product.brand}</h4>
                </p>
              </div>
              <hr />
              <div className="product-reviews d-flex align-items-center">
                <Rating {...options} />
                <span className=" mx-2 ">
                  Reviews ({product.numberOfReviews})
                </span>
                <button
                  onClick={submitReviewToggle}
                  className="btn btn-primary mx-2"
                >
                  Submit Review
                </button>
              </div>
              <hr />
              <Dialog
                aria-labelledby="Simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submit-dialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />
                  <textarea
                    className="submit-dialog-textarea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} className="red">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} className="green">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              <div className="product-status d-flex">
                <h5>Status:</h5>
                {product.stock > 0 ? (
                  <h5 className="text-success">In Stock</h5>
                ) : (
                  <h5 className="text-danger">Out of Stock</h5>
                )}
              </div>
              <hr />
              <div className="product-price d-flex align-items-center">
                <h5 className="margin-0">RS:</h5>
                <h3 className="price tomato margin-0">{product.price}</h3>
              </div>
              <hr />
              <div className="quantity d-flex align-items-center">
                <p className="margin-0">Quantity:</p>

                <button
                  disabled={1 >= quantity ? true : false}
                  onClick={decreaseQuantity}
                  type="button"
                  className="btn btn-secondary"
                >
                  <FaMinus />
                </button>
                <input
                  readOnly
                  className="counter-input"
                  type="number"
                  value={quantity}
                />
                <button
                  disabled={product.stock <= quantity ? true : false}
                  onClick={increaseQuantity}
                  className="btn btn-secondary"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={addToCartHandler}
                  className="btn btn-primary cart "
                  disabled={product.stock < 1 ? true : false}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </section>
          <section className="reviews-section">
            <div className="review-heading">
              <h2>Reviews</h2>
            </div>
            <hr />
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
              </div>
            ) : (
              "NO REVIEW AVAILABLE"
            )}
          </section>
          <section className="description-section">
            <div className="description-heading">
              <h2>Description</h2>
            </div>
            <hr />
            <div className="description">{product.description}</div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

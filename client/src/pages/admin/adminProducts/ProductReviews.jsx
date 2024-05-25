import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../../actions/productAction";
import { Button } from "@mui/material";
import SideBar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstant";

const ProductReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const [productId, setProductId] = useState("");
  const deleteBtnHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);
  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.value >= 3 ? "green" : "red";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteBtnHandler(params.id)}>
              <MdDeleteForever />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        comment: item.comment,
        rating: item.rating,
        user: item.name,
      });
    });
  return (
    <>
      <section className="dashboard">
        <SideBar />
        <div className="product-list-container">
          <form
            onSubmit={productReviewsSubmitHandler}
            className="add-product-form"
            style={{ marginBottom: "10px" }}
          >
            <h1>Product Reviews</h1>
            <div className="update-user">
              <div className="input">
                <label htmlFor="name">Id</label>
                <input
                  type="text"
                  placeholder="Enter Product Id Here"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
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
                    "Search"
                  )}
                </button>
              </div>
            </div>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="product-list-table"
            />
          ) : (
            <h1>No Reviews Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductReviews;

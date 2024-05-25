import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productlist.css";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../../actions/productAction";
import { Button } from "@mui/material";
import SideBar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "../dashboard.css";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstant";

const ProductList = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.product);

  const deleteBtnHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", minWidth: 270, flex: 0.5 },
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
            <NavLink to={`/admin/product/${params.id}`}>
              <MdModeEdit />
            </NavLink>

            <Button onClick={() => deleteBtnHandler(params.id)}>
              <MdDeleteForever />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      <section className="dashboard">
        <SideBar />
        <div className="product-list-container">
          <h1 id="product-list-heading">All Products</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="product-list-table"
          />
        </div>
      </section>
    </>
  );
};

export default ProductList;

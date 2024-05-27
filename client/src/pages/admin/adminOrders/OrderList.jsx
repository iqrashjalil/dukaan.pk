import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../adminProducts/productlist.css";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../../actions/orderAction";
import { Button } from "@mui/material";
import SideBar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "../dashboard.css";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstant";
import "./orderlist.css";

const OrderList = () => {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.orders);

  const deleteBtnHandler = (id) => {
    dispatch(deleteOrder(id));
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
      toast.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        console.log(params.value);
        return params.value === "Delivered" ? "green" : "red";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
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
            <NavLink to={`/admin/order/${params.id}`}>
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
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });
  return (
    <>
      <section className="dashboard">
        <SideBar />
        <div className="product-list-container">
          <h1 id="product-list-heading">All Orders</h1>
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

export default OrderList;

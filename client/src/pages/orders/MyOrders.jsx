import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import "./myorders.css";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../../components/layout/loader/Loader";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { MdLaunch } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myorders);
  const { user } = useSelector((state) => state.user);

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
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      flex: 0.3,
      sortable: false,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <NavLink to={`/order/${params.id}`}>
            <MdLaunch className="launch-icon" />
          </NavLink>
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
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error, toast]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="my-orders-page">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="my-orders-table"
              autoHeight
            />

            <Typography id="my-orders-heading">{user.name}'s Orders</Typography>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;

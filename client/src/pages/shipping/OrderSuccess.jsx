import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./success.css";

const OrderSuccess = () => {
  return (
    <>
      <div className="order-success">
        <FaCircleCheck className="success-icon" />
        <Typography variant="h4">Order Placed Successfully</Typography>
        <NavLink className="btn btn-primary" to={"/myorders"}>
          View Orders
        </NavLink>
      </div>
    </>
  );
};

export default OrderSuccess;

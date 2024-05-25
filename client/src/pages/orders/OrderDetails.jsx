import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, orderDetails } from "../../actions/orderAction";
import { Typography } from "@mui/material";
import "./orderdetails.css";
import Loader from "../../components/layout/loader/Loader";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(orderDetails(id));
  }, [dispatch, error, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="order-details-page">
            <div className="order-details-container">
              <Typography component="h1">
                Orders #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="order-details-container-box">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="order-details-container-box">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "green"
                        : "red"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="order-details-container-box">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "green"
                        : "red"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-details-cart-items">
              <Typography>Order Items:</Typography>
              <div className="order-details-cart-items-container">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="" />
                      <NavLink to={`/product/${item.product}`}>
                        {item.name}
                      </NavLink>
                      <span>
                        {item.quantity} X {item.price} ={" "}
                        <b>RS: {item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import SideBar from "../sidebar/Sidebar";
import {
  clearErrors,
  orderDetails,
  updateOrder,
} from "../../../actions/orderAction";
import Loader from "../../../components/layout/loader/Loader";
import { toast } from "react-toastify";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstant";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.orders
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(orderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  const submitOrderStatus = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <>
      <section className="dashboard">
        <SideBar />
        {loading ? (
          <Loader />
        ) : (
          <>
            <section
              className="confirm-order-page"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div style={{ borderLeft: "2px solid #f0f0f0" }}>
                <div className="confirm-shoping-area">
                  <Typography>Shoping Info</Typography>
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
                <div className="confirm-cart-items">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirm-cart-items-container">
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
              </div>

              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <div
                  className="order-summary"
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.247)" }}
                >
                  <div className="input">
                    <label htmlFor="category">Order Status </label>
                    <select
                      required
                      onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      id="status"
                    >
                      <option value="">Select Order Status</option>
                      {order.orderStatus &&
                        order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}

                      {order.orderStatus && order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <button
                    onClick={submitOrderStatus}
                    className="btn btn-primary"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default ProcessOrder;

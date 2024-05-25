import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.17;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <>
      <div className="steps">
        <CheckoutSteps activeStep={1} />
      </div>
      <section className="confirm-order-page">
        <div>
          <div className="confirm-shoping-area">
            <Typography>Shoping Info</Typography>
            <div className="confirm-shopping-area-box">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirm-cart-items">
            <Typography>Your Cart Items:</Typography>
            <div className="confirm-cart-items-container">
              {cartItems &&
                cartItems.map((item) => (
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

        <div>
          <div className="order-summary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>RS: {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>RS: {shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs: {tax}</span>
              </div>
            </div>
            <div className="order-summary-total">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs: {totalPrice}</span>
            </div>
            <button onClick={proceedToPayment} className="btn btn-primary">
              Proceed To Payment
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmOrder;

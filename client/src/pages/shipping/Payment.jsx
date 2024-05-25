import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import { FaCreditCard } from "react-icons/fa";
import { MdEvent, MdVpnKey } from "react-icons/md";
import { toast } from "react-toastify";
import serverUrl from "../../serverUrl";
import Stripe from "stripe";
import { clearErrors, createOrder } from "../../actions/orderAction";
import { removeItemFromCart } from "../../actions/cartAction";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingChanges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${serverUrl}/api/payment/process/payment`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          cartItems.forEach((item) => {
            dispatch(removeItemFromCart(item.product));
          });
          navigate("/success");
        } else {
          toast.error("There is some issue while processing your payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.messgae);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      <div className="steps">
        <CheckoutSteps activeStep={2} />
      </div>
      <section>
        <div className="payment-container">
          <form className="payment-form" onSubmit={(e) => submitHandler(e)}>
            <h2>Card Info</h2>
            <div>
              <FaCreditCard />
              <CardNumberElement className="payment-input" />
            </div>
            <div>
              <MdEvent />
              <CardExpiryElement className="payment-input" />
            </div>
            <div>
              <MdVpnKey />
              <CardCvcElement className="payment-input" />
            </div>
            <input
              type="submit"
              value={`Pay  Rs: ${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="btn btn-primary payment-btn"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;

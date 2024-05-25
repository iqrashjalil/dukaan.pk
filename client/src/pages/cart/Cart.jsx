import React from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../actions/cartAction.jsx";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <MdRemoveShoppingCart />
          <Typography>No Product In Your Cart</Typography>
          <NavLink className="btn btn-primary" to={"/products"}>
            View Products
          </NavLink>
        </div>
      ) : (
        <>
          <div className="cart-page">
            <div className="cart-header">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cart-container" key={item.product}>
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                  <div className="cart-input">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-subtotal">{`RS:${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cart-grossTotal">
              <div></div>
              <div className="cart-grossTotal-box">
                <p>Gross Total</p>
                <p>{`Rs:${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkout-btn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

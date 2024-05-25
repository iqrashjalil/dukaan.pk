import React from "react";
import "./cart.css";
import { NavLink } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt="" />
        <div>
          <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
          <span>{`Price: ${item.price}`}</span>
          <p onClick={() => deleteCartItem(item.product)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;

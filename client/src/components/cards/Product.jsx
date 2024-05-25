import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Product = ({ product }) => {
  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  // Check if images array exists and is not empty
  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0].url : "";

  return (
    <Link className="card" to={`/product/${product._id}`}>
      {imageUrl && <img src={imageUrl} alt="" />}
      <div className="text-truncate">
        <p className="mx-2">{product.name}</p>
      </div>
      <div className="ratings d-flex mx-2">
        <Rating {...options} />
        <span>({product.numberOfReviews} reviews)</span>
      </div>
      <span className="price mx-2">{product.price}</span>
    </Link>
  );
};

export default Product;

import React from "react";
import ProfilePic from "../../images/profile.png";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    size: "medium",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="review-container">
        <img src={ProfilePic} alt="" />
        <h5 className="margin-0">{review.name}</h5>
        <Rating {...options} />
        <p>{review.comment}</p>
      </div>
    </>
  );
};

export default ReviewCard;

import React from "react";
import error from "../images/404-error.png";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-404">
      <img src={error} alt="" />
      <NavLink to={"/"} className="btn btn-primary error-button">
        Home
      </NavLink>
    </div>
  );
};

export default Error;

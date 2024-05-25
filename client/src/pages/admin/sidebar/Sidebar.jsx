import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import {
  MdOutlinePostAdd,
  MdDashboard,
  MdOutlineRateReview,
} from "react-icons/md";
import { GoPlus } from "react-icons/go";
import logo from "../../../images/logo3.png";
import { FaListUl } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <NavLink to={"/"}>
        <img src={logo} alt="" />
      </NavLink>
      <NavLink to={"/admin/dashboard"}>
        <p>
          {" "}
          <MdDashboard /> Dashboard
        </p>
      </NavLink>

      <NavLink to={"/admin/products"}>
        <p>
          {" "}
          <MdOutlinePostAdd /> All Products
        </p>
      </NavLink>
      <NavLink to={"/admin/product"}>
        <p>
          {" "}
          <GoPlus /> Create Product{" "}
        </p>
      </NavLink>
      <NavLink to={"/admin/orders"}>
        <p>
          <FaListUl /> Orders
        </p>
      </NavLink>
      <NavLink to={"/admin/users"}>
        <p>
          <IoIosPeople /> Users
        </p>
      </NavLink>
      <NavLink to={"/admin/reviews"}>
        <p>
          <MdOutlineRateReview /> Reviews
        </p>
      </NavLink>
    </section>
  );
};

export default Sidebar;

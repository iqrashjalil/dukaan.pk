import React from "react";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import ProfileDD from "./ProfileDD";
import logo3 from "../../../images/logo3.png";
import "./navbar.css";

export const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Function to handle link click and close the navbar
  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid responsive">
          <NavLink to="/">
            <img className="navbar-logo" src={logo3} alt="Logo" />
          </NavLink>
          <div className="d-flex settings-short align-items-center">
            <div className="icons">
              <NavLink to="/cart">
                <button
                  type="button"
                  className="btn btn-primary position-relative rounded-circle"
                >
                  <LuShoppingCart className="shoppingcart-mobile" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              </NavLink>

              {user && isAuthenticated ? (
                <ProfileDD className="profile-icon mx-2 cursor" />
              ) : (
                ""
              )}
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleLinkClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleLinkClick}
                >
                  Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleLinkClick}
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleLinkClick}
                >
                  About
                </NavLink>
              </li>
            </ul>
            <div className="d-flex settings-full px-2 align-items-center">
              <NavLink to="/cart">
                <button
                  type="button"
                  className="btn btn-primary position-relative rounded-circle"
                >
                  <LuShoppingCart className="shoppingcart-mobile" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                </button>
              </NavLink>
            </div>
            {user && isAuthenticated ? (
              <ProfileDD />
            ) : (
              <NavLink to="/login" className="btn btn-primary">
                Signin
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

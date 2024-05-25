import React, { useState } from "react";
import "./ProfileStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { CiViewBoard } from "react-icons/ci";
import { toast } from "react-toastify";
import { logoutUser } from "../../../actions/userAction";

const ProfileDD = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logout = () => {
    dispatch(logoutUser());

    toast.success("logged out successfully");
  };
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <img
        className="profile-img cursor"
        src={user.avtar.url}
        alt=""
        onClick={toggleMenu}
      />
      <div
        id="subMenu"
        className={`sub-menu-wrap ${isMenuOpen ? "open-menu" : ""}`}
      >
        <div className="sub-menu">
          <div className="user-info">
            <img src={user.avtar.url} alt="" />
            <h3>{user.name}</h3>
          </div>
          <hr />
          {user && user.role === "admin" ? (
            <NavLink
              className="sub-menu-link"
              onClick={() => setIsMenuOpen(false)}
              to={"/admin/dashboard"}
            >
              <MdSpaceDashboard className="main-icon" />
              <p>Dashboard</p>
              <span>
                <FaChevronRight className="arrow-icon" />
              </span>
            </NavLink>
          ) : (
            ""
          )}
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className="sub-menu-link"
            to={"/account"}
          >
            <IoPersonSharp className="main-icon" />
            <p>Edit Profile</p>
            <span>
              <FaChevronRight className="arrow-icon" />
            </span>
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            className="sub-menu-link"
            to={"/myorders"}
          >
            <CiViewBoard className="main-icon" />
            <p>Orders</p>
            <span>
              <FaChevronRight className="arrow-icon" />
            </span>
          </NavLink>
          <NavLink className="sub-menu-link" to={"/"} onClick={logout}>
            <CiLogout className="main-icon" />
            <p>Logout</p>
            <span>
              <FaChevronRight className="arrow-icon" />
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ProfileDD;

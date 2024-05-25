import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";

const ProtectedRoute = (props) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const { Component, adminOnly } = props;
  const navigate = useNavigate();

  // Check if the user is authenticated and, if adminOnly is true, also check if the user is an admin
  const isAdmin = user && user.role === "admin";

  // Redirect non-admin users to "/" if they try to access an admin route
  if (adminOnly && isAuthenticated && !isAdmin) {
    navigate("/");
    return null; // Return null to prevent rendering anything while redirecting
  }

  return <>{loading ? <Loader /> : isAuthenticated ? <Component /> : ""}</>;
};

export default ProtectedRoute;

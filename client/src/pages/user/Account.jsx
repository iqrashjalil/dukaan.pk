import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import Loader from "../../components/layout/loader/Loader";
import { NavLink } from "react-router-dom";

const Account = () => {
  const { user, loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="profile-section">
            <div className="profile-left">
              <h1>Profile</h1>
              <img src={user.avtar.url} alt="" />
              <NavLink to={"/updateuser"} className="btn btn-primary">
                Edit Profile
              </NavLink>
            </div>
            <div className="profile-right">
              <div>
                {" "}
                <h5>Full Name</h5>
                <p>{user.name}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{user.email}</p>
              </div>
              <div>
                <h5>Phone</h5>
                <p>{user.phone}</p>
              </div>
              <div>
                <h5>Joined On</h5>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <NavLink to={"/myorders"} className="btn btn-outline-secondary">
                  My Orders
                </NavLink>
                <NavLink
                  to={"/account/updatepassword"}
                  className="btn btn-outline-secondary "
                >
                  Change Password
                </NavLink>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Account;

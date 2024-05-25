import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstant";
import {
  getUserDetails,
  clearErrors,
  updateProfile,
} from "../../../actions/userAction";
import "./updateprofile.css";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, updateError, navigate, isUpdated, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateProfile(id, myForm));
  };

  return (
    <>
      <section className="dashboard">
        <SideBar />
        <form onSubmit={updateUserSubmitHandler} className="add-product-form">
          <h1>Update User</h1>
          <div className="update-user">
            <div className="input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Product Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="role">Role </label>
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
                id="role"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="brand">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter Email Here"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="add-button">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary add-btn"
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateProfile;

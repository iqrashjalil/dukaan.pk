import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant.jsx";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } =
    useSelector((state) => state.profile) || {};

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Changed Successfully");
      dispatch(loadUser());
      navigate("/account");
    }
    dispatch({ type: UPDATE_PASSWORD_RESET });
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="outerwrapper">
            <div className="wrapper">
              <h2>Update User</h2>
              <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter your Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter your New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter your Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="input-box button">
                  <input
                    type="submit"
                    disabled={loading ? true : false}
                    value="Change"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;

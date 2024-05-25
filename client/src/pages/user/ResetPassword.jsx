import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, loading } =
    useSelector((state) => state.forgotPassword) || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="outerwrapper">
            <div className="wrapper">
              <h2>Update User</h2>
              <form onSubmit={onSubmit}>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter your New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value="Update"
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

export default ResetPassword;

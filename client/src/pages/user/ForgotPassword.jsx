import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./UpdateUser.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, loading } =
    useSelector((state) => state.forgotPassword) || {};
  const [email, setEmail] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="outerwrapper">
            <div className="wrapper">
              <h2>Forgot Password</h2>
              <form onSubmit={onSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-box button">
                  <input
                    type="submit"
                    disabled={loading ? true : false}
                    value="Send"
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

export default ForgotPassword;

import React, { useEffect } from "react";
import "./form.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors } from "../../actions/userAction.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    dispatch(loginUser(data.email, data.password));
  };
  const redirect = location.search
    ? `/${location.search.split("=")[1]}`
    : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="outerwrapper">
            <div className="wrapper">
              <h2>Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                </div>

                <div className="input-box button">
                  <input type="submit" value="Login" />
                  <NavLink className="forgot-password" to={"/forgotpassword"}>
                    Forgot Password?
                  </NavLink>
                </div>
                <div className="text">
                  <h3>
                    Don't have an account?{" "}
                    <NavLink to={"/register"}>Register now</NavLink>
                  </h3>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

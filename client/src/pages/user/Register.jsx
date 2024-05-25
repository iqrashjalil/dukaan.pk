import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./form.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../../actions/userAction.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";
import profile from "../../images/profile.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { name, email, phone, password } = user;
  const [avtar, setAvtar] = useState();
  const [avtarPreview, setAvtarPreview] = useState(profile);

  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("password", password);
    myForm.set("avtar", avtar);
    dispatch(registerUser(myForm));
    
  };

  const handleChange = (e) => {
    if (e.target.name === "avtar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvtarPreview(reader.result);
          setAvtar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="outerwrapper">
            <div className="wrapper">
              <h2>Registration</h2>
              <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your Phone Number"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-file">
                  <input
                    type="file"
                    name="avtar"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <div className="register-img">
                  <img src={avtarPreview} alt="Avtar Preview" />
                </div>
                <div className="input-box button">
                  <input
                    type="submit"
                    disabled={loading ? true : false}
                    value="Register Now"
                  />
                </div>
                <div className="text">
                  <h3>
                    Already have an account?{" "}
                    <NavLink to={"/login"}>Login now</NavLink>
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

export default Register;

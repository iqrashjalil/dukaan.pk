import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./UpdateUser.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_RESET } from "../../constants/userConstant.jsx";
import {
  clearErrors,
  loadUser,
  updateUser,
} from "../../actions/userAction.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } =
    useSelector((state) => state.profile) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [avtar, setAvtar] = useState();
  const [avtarPreview, setAvtarPreview] = useState(user.avtar.url);

  const onSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("avtar", avtar);
    dispatch(updateUser(myForm));
  };

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvtarPreview(reader.result);
        setAvtar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setphone(user.phone);
      setAvtarPreview(user.avtar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated");
      dispatch(loadUser());
      navigate("/account");
    }
    dispatch({ type: UPDATE_USER_RESET });
  }, [dispatch, error, isUpdated, user, navigate]);
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
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your Phone Number"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
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
                <div className="updateProfile-img">
                  <img src={avtarPreview} alt="Avtar Preview" />
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

export default UpdateUser;

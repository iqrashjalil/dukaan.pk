import React, { useState } from "react";
import "./shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setpinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 11 || phoneNo.length > 11) {
      return toast.error("Phone Number Should be 11 digit long");
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <section className="steps">
        <CheckoutSteps activeStep={0} />
        <div className="outerwrapper">
          <div className="wrapper">
            <h2>Shipping Details</h2>
            <form onSubmit={shippingSubmit} encType="multipart/form-data">
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter your Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter your city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="input-box">
                <input
                  type="number"
                  placeholder="Enter your pinCode"
                  required
                  value={pinCode}
                  onChange={(e) => setpinCode(e.target.value)}
                />
              </div>

              <div className="input-box">
                <input
                  type="number"
                  placeholder="Enter your phone"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="input-box">
                <select
                  className="shipping-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div className="input-box">
                  <select
                    className="shipping-select"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <div className="input-box button">
                <input
                  type="submit"
                  value="Continue"
                  disabled={state ? false : true}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;

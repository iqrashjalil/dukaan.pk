import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/shipping/Payment.jsx";
import axios from "axios";
import serverUrl from "./serverUrl.jsx";

const StripeWrapper = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${serverUrl}/api/payment/stripeapikey`);
    setStripeApiKey(data.api_key);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      )}
    </>
  );
};

export default StripeWrapper;

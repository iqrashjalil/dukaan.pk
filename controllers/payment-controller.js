import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "pkr",
    metadata: {
      company: "Dukaan.pk",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ api_key: process.env.STRIPE_API_KEY });
});
export default { processPayment, sendStripeApiKey };

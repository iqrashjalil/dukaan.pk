import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import paymentController from "../controllers/payment-controller.js";
const router = express.Router();

router.route("/process/payment").post(paymentController.processPayment);

router.route("/stripeapikey").get(paymentController.sendStripeApiKey);
export default router;

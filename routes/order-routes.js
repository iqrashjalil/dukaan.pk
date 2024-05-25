import express from "express";
import { authMiddleware, checkAdmin } from "../middlewares/auth-middleware.js";
import orderController from "../controllers/order-controller.js";

const router = express.Router();

router.route("/neworder").post(authMiddleware, orderController.newOrder);

router.route("/myorders").get(authMiddleware, orderController.myOrders);
router.route("/order/:id").get(authMiddleware, orderController.getSingleOrder);

router
  .route("/admin/orders")
  .get(authMiddleware, checkAdmin, orderController.getAllOrders);

router
  .route("/admin/order/:id")
  .put(authMiddleware, checkAdmin, orderController.updateOrder)
  .delete(authMiddleware, checkAdmin, orderController.deleteOrder);
export default router;

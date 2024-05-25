import express from "express";
import { authMiddleware, checkAdmin } from "../middlewares/auth-middleware.js";
import productController from "../controllers/product-controller.js";

const router = express.Router();

router
  .route("/addproduct")
  .post(authMiddleware, checkAdmin, productController.addProduct);
router.route("/getproduct/:id").get(productController.getProduct);
router.route("/getallproduct").get(productController.getAllProduct);
router
  .route("/updateproduct/:id")
  .put(authMiddleware, checkAdmin, productController.updateProduct);
router
  .route("/deleteproduct/:id")
  .delete(authMiddleware, checkAdmin, productController.deleteproduct);

router.route("/review").put(authMiddleware, productController.createReview);
router
  .route("/reviews")
  .get(productController.getProductReview)
  .delete(authMiddleware, productController.deleteReview);

router
  .route("/admin/products")
  .get(authMiddleware, checkAdmin, productController.getAdminProducts);
export default router;

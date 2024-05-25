import express from "express";
import authController from "../controllers/auth-controller.js";
import { authMiddleware, checkAdmin } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/getuser").get(authMiddleware, authController.getUser);
router
  .route("/admin/getalluser")
  .get(authMiddleware, checkAdmin, authController.getAllUser);
router
  .route("/admin/user/:id")
  .get(authMiddleware, checkAdmin, authController.getSingleUser)
  .put(authMiddleware, checkAdmin, authController.updateUser)
  .delete(authMiddleware, checkAdmin, authController.deleteUser);
router.route("/updateUser").put(authMiddleware, authController.updateProfile);
router
  .route("/deleteuser")
  .delete(authMiddleware, authController.deleteProfile);
router.route("/password/forget").post(authController.forgetPassword);
router
  .route("/password/update")
  .put(authMiddleware, authController.updatePassword);
router.route("/password/reset/:token").put(authController.resetPassword);

export default router;

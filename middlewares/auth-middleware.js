import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error-handler.js";
import User from "../models/user-model.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const authMiddleware = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  next();
});

export const checkAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role != "admin") {
    return next(new ErrorHandler("You Are Not Authorized To Access", 403));
  }
  next();
};

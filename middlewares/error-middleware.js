import { ErrorHandler } from "../utils/error-handler.js";

const errorMiddleware = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource Not Found Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000 || (err.name === "MongoError" && err.code === 11000)) {
    const message = `${Object.keys(err.keyValue)} Already Exists`;
    err = new ErrorHandler(message, 400);
  }
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export default errorMiddleware;

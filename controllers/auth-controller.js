import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/user-model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/send-email.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

// * Register Function
const register = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avtar, {
    folder: "avtars",
    width: 150,
    crop: "scale",
  });
  const { name, email, phone, password, role } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(
      new ErrorHandler(`User wtih email:${email} Already Exist`, 400)
    );
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    avtar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

// * Login Function

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  sendToken(user, 201, res);
  res.status(200).json({ message: "Logged In Successfully", user });
});

// * Logout Function

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out Successfully",
  });
});
// * Get user Function

const getUser = catchAsyncError(async (req, res, next) => {
  const userid = req.user.id;
  const user = await User.findById(userid);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json(user);
});

// * Get All User(admin) Function

const getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return next(new ErrorHandler("Users Not Found", 404));
  }
  res.status(200).json({ success: true, users: user });
});

// * Get Single User(Admin) Function
const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({ success: true, user: user });
});

// * Update User Function

const updateProfile = catchAsyncError(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  if (req.body.avtar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avtar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avtar, {
      folder: "avtars",
      width: 150,
      crop: "scale",
    });
    userData.avtar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true,
    userf: false,
  });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({ success: true, user });
});

// * Delete User Function

const deleteProfile = catchAsyncError(async (req, res, next) => {
  const userid = req.user.id;

  const user = await User.findByIdAndDelete(userid);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({ success: true, message: "User Deleted Successfully" });
});

// * Forget Password Function
const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\nPlease click on the following link to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nThanks\nTeam Dukaan.pk.\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Dukaan.pk Account Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email has been sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// * Reset Password Function
const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid Token", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password Reset Successfully" });
});

// * Change Password Function

const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old Password is incorrect ", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(" Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
  res.status(200).json({ success: true });
});

// * Update User function (Admin)
const updateUser = catchAsyncError(async (req, res, next) => {
  //   const userid = req.user.id;
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  res.status(200).json({ success: true, user: user });
});
// * Delete User Function

const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const imageId = user.avtar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();
  res.status(200).json({ success: true, message: "User Deleted Successfully" });
});

export default {
  register,
  login,
  logout,
  getUser,
  getAllUser,
  updateProfile,
  updateUser,
  deleteUser,
  deleteProfile,
  forgetPassword,
  resetPassword,
  updatePassword,
  getSingleUser,
};

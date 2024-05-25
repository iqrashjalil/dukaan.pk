import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter full name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please enter valid phone number"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avtar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(user.password, saltRound);
    user.password = hashed_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = model("User", userSchema);

export default User;

import mongoose from "mongoose";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: ".env" });
}
const uri = process.env.MONGODB_ATLAS;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to database");
  } catch (error) {
    console.log("Database connection failed");
    console.log(uri);
    process.exit(0);
  }
};

export default connectDb;

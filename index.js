import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import authRoutes from "./routes/auth-routes.js";
import productRoutes from "./routes/product-routes.js";
import orderRoutes from "./routes/order-routes.js";
import paymentRoutes from "./routes/payment-routes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
// import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// CORS options
// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };
// app.use(cors(corsOptions));

// Middleware setup
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Deployment setup
const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);

// Reference the static files from the client build directory

app.use(express.static(path.join(__dirname1, "./client/dist")));

// Catch-all route to serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "./client/dist", "index.html"));
});

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Product from "../models/product-model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import { ApiFeatures } from "../utils/features.js";
import cloudinary from "cloudinary";

// * Add Product Function (admin only)
const addProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.createdBy = req.user.id;

  const productAdded = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product Added Successfully",
    productAdded,
  });
});

// * Get Product Function

const getProduct = catchAsyncError(async (req, res, next) => {
  const productid = req.params.id;
  const product = await Product.findById(productid);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({ product: product });
});

// * Get All Product Function (User)

const getAllProduct = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 12;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query);
  apiFeatures.search().filter().pagination(resultPerPage);

  const products = await apiFeatures.query;
  const filteredProducts = products.length;

  res.status(200).json({
    productsCount,
    products,
    resultPerPage,
    filteredProducts,
  });
});

// * All Products (admin only)

const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new ErrorHandler("product Not Found", 404));
  }
  res.status(200).json({ success: true, products });
});

// * Update Product Function (admin only)

const updateProduct = catchAsyncError(async (req, res, next) => {
  const productid = req.params.id;
  const updateFields = req.body;
  let product = await Product.findById(productid);
  if (!product) {
    return next(new ErrorHandler("product Not Found", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    //! Deleting Products From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(productid, updateFields, {
    new: true,
  });

  res.status(200).json({ success: true, product });
});

// * Delete Product Function (admin only)

const deleteproduct = catchAsyncError(async (req, res, next) => {
  const productid = req.params.id;

  const product = await Product.findByIdAndDelete(productid);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  //! Deleting Products From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});

// * Review Function
const createReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  if (comment.length > 150) {
    return next(
      new ErrorHandler("Comment cannot exceed 130 characters characters", 400)
    );
  }
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let totalRatings = 0;
  let reviewsWithRatingCount = 0;

  product.reviews.forEach((rev) => {
    if (rev.rating) {
      totalRatings += rev.rating;
      reviewsWithRatingCount++;
    }
  });

  let avg = 0;
  if (reviewsWithRatingCount > 0) {
    avg = totalRatings / reviewsWithRatingCount;
  }

  product.ratings = avg;
  await product.save();

  res
    .status(201)
    .json({ success: true, message: "Review Added Successfully", avg });
});

// * Get Review Function
const getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({ reviews: product.reviews });
});
// * Delete Review Function

const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numberOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      validateBeforeSave: false,
      useFindAndModify: false,
    }
  );

  res
    .status(200)
    .json({ success: true, message: "Review Deleted Successfully" });
});

export default {
  addProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteproduct,
  createReview,
  deleteReview,
  getAdminProducts,
  getProductReview,
};

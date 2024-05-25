import Order from "../models/order-model.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Product from "../models/product-model.js";
import { ErrorHandler } from "../utils/error-handler.js";

// * Create New Order
const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ message: "Order Placed Successfully" });
});

// * Get My  Orders

const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// * Get Single Order
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }
  res.status(200).json({ order: order });
});

// * Get All Orders (Admin)

const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({ success: true, totalAmount, orders: orders });
});

// * Update Order (Admin)
const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res
    .status(200)
    .json({ success: true, message: "Order Updated Successfully" });
});
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// * Delete Order (Admin)
const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }

  await order.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Order Deleted Successfully" });
});
export default {
  newOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};

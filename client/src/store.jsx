import { configureStore } from "@reduxjs/toolkit";
import {
  productDetailsReducer,
  productReducer,
  newReviewReducer,
  newProductReducer,
  productsReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
  usersDetailsReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailReducer,
  orderReducer,
} from "./reducers/orderReducer";

// Retrieve cart items from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingItemFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};
const reducer = {
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order: newOrderReducer,
  myorders: myOrdersReducer,
  orderDetails: orderDetailReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  orders: orderReducer,
  allUsers: allUsersReducer,
  userDetails: usersDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
};

const store = configureStore({
  reducer,
  preloadedState: {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingInfo: shippingItemFromStorage,
    },
  },
});

export default store;

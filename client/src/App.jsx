import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/layout/Navbar/Navbar.jsx";
import { Footer } from "./components/layout/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Products from "./pages/Products.jsx";
import Register from "./pages/user/Register.jsx";
import Login from "./pages/user/Login.jsx";
import store from "./store.jsx";
import { loadUser } from "./actions/userAction.jsx";
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";
import Account from "./pages/user/Account.jsx";
import UpdateUser from "./pages/user/UpdateUser.jsx";
import UpdatePassword from "./pages/user/UpdatePassword.jsx";
import ForgotPassword from "./pages/user/ForgotPassword.jsx";
import ResetPassword from "./pages/user/ResetPassword.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Shipping from "./pages/shipping/Shipping.jsx";
import ConfirmOrder from "./pages/shipping/ConfirmOrder.jsx";
import StripeWrapper from "./StripeWrapper.jsx";
import OrderSuccess from "./pages/shipping/OrderSuccess.jsx";
import MyOrders from "./pages/orders/MyOrders.jsx";
import OrderDetails from "./pages/orders/OrderDetails.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductList from "./pages/admin/adminProducts/ProductList.jsx";
import NewProduct from "./pages/admin/adminProducts/NewProduct.jsx";
import UpdateProduct from "./pages/admin/adminProducts/UpdateProduct.jsx";
import OrderList from "./pages/admin/adminOrders/OrderList.jsx";
import ProcessOrder from "./pages/admin/adminOrders/ProcessOrder.jsx";
import UsersList from "./pages/admin/adminUsers/UsersList.jsx";
import UpdateProfile from "./pages/admin/adminUsers/UpdateUser.jsx";
import ProductReviews from "./pages/admin/adminProducts/ProductReviews.jsx";
import Error from "./pages/Error.jsx";
import AboutUs from "././pages/AboutUs.jsx";
import ContactUs from "././pages/ContactUs.jsx";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutUs />} />
          
          <Route path="/Contact" element={<ContactUs />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keywords" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={<ProtectedRoute Component={Account} />}
          />

          <Route
            path="/updateuser"
            element={<ProtectedRoute Component={UpdateUser} />}
          />
          <Route
            path="/account/updatepassword"
            element={<ProtectedRoute Component={UpdatePassword} />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={<ProtectedRoute Component={Shipping} />}
          />
          <Route
            path="/order/confirm"
            element={<ProtectedRoute Component={ConfirmOrder} />}
          />
          <Route
            path="/process/payment"
            element={<ProtectedRoute Component={StripeWrapper} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute Component={OrderSuccess} />}
          />
          <Route
            path="/myorders"
            element={<ProtectedRoute Component={MyOrders} />}
          />
          <Route
            path="/order/:id"
            element={<ProtectedRoute Component={OrderDetails} />}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute Component={Dashboard} adminOnly />}
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute Component={ProductList} adminOnly />}
          />

          <Route
            path="/admin/product"
            element={<ProtectedRoute Component={NewProduct} adminOnly />}
          />

          <Route
            path="/admin/product/:id"
            element={<ProtectedRoute Component={UpdateProduct} adminOnly />}
          />

          <Route
            path="/admin/orders"
            element={<ProtectedRoute Component={OrderList} adminOnly />}
          />
          <Route
            path="/admin/order/:id"
            element={<ProtectedRoute Component={ProcessOrder} adminOnly />}
          />

          <Route
            path="/admin/users"
            element={<ProtectedRoute Component={UsersList} adminOnly />}
          />

          <Route
            path="/admin/user/:id"
            element={<ProtectedRoute Component={UpdateProfile} adminOnly />}
          />

          <Route
            path="/admin/reviews"
            element={<ProtectedRoute Component={ProductReviews} adminOnly />}
          />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;

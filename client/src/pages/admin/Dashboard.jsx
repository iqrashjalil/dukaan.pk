import React, { useEffect } from "react";
import { getAdminProducts } from "../../actions/productAction";
import Sidebar from "./sidebar/Sidebar.jsx";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/orderAction.jsx";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { error, users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock++;
      }
    });
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned "],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["#0d6efd"],
        hoverBackgroundColor: ["rgb(33, 84, 194)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "Instock "],
    datasets: [
      {
        backgroundColor: ["#009596", "#0d6efd"],
        hoverBackgroundColor: ["#005F60", "#0a48a1"],

        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <>
      <section className="dashboard">
        <Sidebar />
        <div className="dashboard-container">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboard-summary">
            <div>
              <p>
                Total Amount <br /> Rs: {totalAmount}
              </p>
            </div>
            <div className="dashboard-summary-box2">
              <NavLink to={"/admin/products"}>
                <p>Products</p>
                <p>{products && products.length}</p>
              </NavLink>
              <NavLink to={"/admin/orders"}>
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </NavLink>
              <NavLink to={"/admin/users"}>
                <p>Users</p>
                <p>{users && users.length}</p>
              </NavLink>
            </div>
          </div>
          <div className="line-chart">
            <Line data={lineState} />
          </div>
          <div className="dougnut-chart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

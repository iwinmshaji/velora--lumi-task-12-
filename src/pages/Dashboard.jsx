import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaArrowRight
} from "react-icons/fa";

import {
  getProducts,
  getOrders
} from "../services/apiService";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productData = await getProducts();
      const orderData = await getOrders();

      setProducts(productData);
      setOrders(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  const totalSales = products.reduce(
    (total, product) =>
      total + Number(product.sales || 0),
    0
  );

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  const topProducts = [...products]
    .sort(
      (a, b) =>
        Number(b.sales || 0) -
        Number(a.sales || 0)
    )
    .slice(0, 5);

  const maxSales =
    products.length > 0
      ? Math.max(
          ...products.map(
            (product) =>
              Number(product.sales || 0)
          )
        )
      : 1;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Velora Admin Dashboard</h1>
          <p>Manage your store and products</p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-card-icon">
            <FaBox />
          </div>

          <div>
            <p>Total Products</p>

            <h2>{products.length}</h2>

            <span>Products in store</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            <FaShoppingCart />
          </div>

          <div>
            <p>Total Orders</p>

            <h2>{orders.length}</h2>

            <span>Orders received</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            <FaUsers />
          </div>

          <div>
            <p>Total Sales</p>

            <h2>{totalSales}</h2>

            <span>Items sold</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            <FaRupeeSign />
          </div>

          <div>
            <p>Total Revenue</p>

            <h2>{formatPrice(totalRevenue)}</h2>

            <span>Order revenue</span>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <h2>Sales Overview</h2>
              <span>Product sales</span>
            </div>

          </div>

          <div className="bar-chart">

            {topProducts.map((product) => {

              const sales =
                Number(product.sales || 0);

              const height =
                (sales / maxSales) * 180;

              return (
                <div
                  className="bar-item"
                  key={product.id}
                >

                  <span className="bar-value">
                    {sales}
                  </span>

                  <div className="bar-area">

                    <div
                      className="bar"
                      style={{
                        height: `${height}px`
                      }}
                    ></div>

                  </div>

                  <span className="bar-name">
                    {product.name}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <h2>Top Products</h2>
              <span>Best selling products</span>
            </div>

            <Link to="/products">
              <FaArrowRight />
            </Link>

          </div>

          {topProducts.map(
            (product, index) => (

              <div
                className="top-product"
                key={product.id}
              >

                <div className="rank">
                  #{index + 1}
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div
                  style={{
                    flex: 1
                  }}
                >

                  <strong>
                    {product.name}
                  </strong>

                  <small>
                    {product.category}
                  </small>

                </div>

                <div>

                  <strong>
                    {product.sales}
                  </strong>

                  <small>
                    sales
                  </small>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      <div
        className="dashboard-card"
        style={{
          marginTop: "20px"
        }}
      >

        <div className="card-heading">

          <div>
            <h2>Recent Orders</h2>
            <span>Latest orders</span>
          </div>

          <Link to="/orders">
            View All
          </Link>

        </div>

        <div className="table-container">

          <table className="product-table">

            <thead>

              <tr>

                <th>Order ID</th>

                <th>Customer</th>

                <th>Date</th>

                <th>Status</th>

                <th>Total</th>

              </tr>

            </thead>

            <tbody>

              {orders
                .slice(0, 5)
                .map((order) => (

                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>

                    <td>
                      {order.customer}
                    </td>

                    <td>
                      {order.date}
                    </td>

                    <td>

                      <span
                        className={`status ${order.status
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td>
                      {formatPrice(
                        order.total
                      )}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
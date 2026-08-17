import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
  FaExclamationTriangle
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import Loader from "../components/Loader";

import {
  getProducts,
  getOrders
} from "../services/apiService";

function Dashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadData = async () => {

      try {

        const [productData, orderData] =
          await Promise.all([
            getProducts(),
            getOrders()
          ]);

        setProducts(productData);
        setOrders(orderData);

      } catch (err) {

        setError(
          "Unable to load dashboard data."
        );

      } finally {

        setLoading(false);

      }
    };

    loadData();

  }, []);

  const totalRevenue = useMemo(() => {

    // REDUCE()
    return orders.reduce(
      (total, order) =>
        total + Number(order.total),
      0
    );

  }, [orders]);

  const outOfStock = useMemo(() => {

    // FILTER()
    return products.filter(
      (product) => product.stock === 0
    ).length;

  }, [products]);

  const topProducts = useMemo(() => {

    // SORT()
    return [...products]
      .sort(
        (a, b) =>
          Number(b.sales) -
          Number(a.sales)
      )
      .slice(0, 5);

  }, [products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>DashBoard</h1>
          <p>
            Welcome to Velora 
          </p>
        </div>

      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div className="stats-grid">

        <StatCard
          title="Total Products"
          value={products.length}
          icon={<FaBox />}
          description="Products in store"
        />

        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={<FaShoppingCart />}
          description="Orders received"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={<FaRupeeSign />}
          description="Total order revenue"
        />

        <StatCard
          title="Out of Stock"
          value={outOfStock}
          icon={<FaExclamationTriangle />}
          description="Products unavailable"
        />

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-heading">
            <h2>Top Products</h2>
            <span>Based on sales</span>
          </div>

          <div className="top-products">

            {topProducts.map(
              (product, index) => (
                <div
                  className="top-product"
                  key={product.id}
                >

                  <span className="rank">
                    #{index + 1}
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <small>
                      {product.sales} sales
                    </small>
                  </div>

                </div>
              )
            )}

          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-heading">
            <h2>Sales Overview</h2>
            <span>Top 5 products</span>
          </div>

          <div className="chart">

            {topProducts.map(
              (product) => {

                const maxSales =
                  topProducts[0]?.sales || 1;

                const width =
                  (product.sales / maxSales) *
                  100;

                return (
                  <div
                    className="chart-row"
                    key={product.id}
                  >

                    <span>
                      {product.name}
                    </span>

                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${width}%`
                        }}
                      ></div>
                    </div>

                    <strong>
                      {product.sales}
                    </strong>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
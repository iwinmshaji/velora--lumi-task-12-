import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import {
  FaArrowLeft,
  FaShoppingCart
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getOrderById
} from "../services/apiService";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const data =
          await getOrderById(id);

        setOrder(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

    fetchOrder();

  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <div className="page">
        <div className="error-box">
          Order not found.
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <Link
        to="/orders"
        className="back-link"
      >
        <FaArrowLeft />
        Back to Orders
      </Link>

      <div className="order-details">

        <div className="order-icon">
          <FaShoppingCart />
        </div>

        <h1>
          Order #{order.id}
        </h1>

        <div className="order-info">

          <div>
            <span>Customer</span>
            <strong>{order.customer}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{order.date}</strong>
          </div>

          <div>
            <span>Items</span>
            <strong>{order.items}</strong>
          </div>

          <div>
            <span>Status</span>

            <span
              className={`status ${order.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {order.status}
            </span>

          </div>

          <div className="order-total">
            <span>Total Amount</span>

            <strong>
              ₹{Number(order.total)
                .toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;
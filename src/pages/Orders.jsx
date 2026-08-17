import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  FaEye
} from "react-icons/fa";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

import {
  getOrders
} from "../services/apiService";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data =
          await getOrders();

        setOrders(data);

      } catch (err) {

        setError(
          "Unable to load orders."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchOrders();

  }, []);

  const processedOrders = useMemo(() => {

    let result = orders;

    // SEARCH USING FILTER()
    result = result.filter(
      (order) =>
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(order.id).includes(search)
    );

    // STATUS FILTER
    result = result.filter((order) =>
      status === "All"
        ? true
        : order.status === status
    );

    // DATE SORT
    result = [...result].sort(
      (a, b) => {

        const dateA =
          new Date(a.date);

        const dateB =
          new Date(b.date);

        if (sort === "Newest") {
          return dateB - dateA;
        }

        return dateA - dateB;
      }
    );

    return result;

  }, [orders, search, status, sort]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Orders</h1>
          <p>
            Manage and monitor customer orders
          </p>
        </div>

      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div className="filters">

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search orders or customers..."
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="Newest">
            Newest First
          </option>

          <option value="Oldest">
            Oldest First
          </option>

        </select>

      </div>

      <div className="table-container">

        <table className="product-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {processedOrders.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="empty"
                >
                  No orders found.
                </td>
              </tr>

            ) : (

              processedOrders.map(
                (order) => (
                  <tr key={order.id}>

                    <td>
                      <strong>
                        #{order.id}
                      </strong>
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
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      {order.items}
                    </td>

                    <td>
                      ₹{Number(order.total)
                        .toLocaleString("en-IN")}
                    </td>

                    <td>

                      <Link
                        to={`/orders/${order.id}`}
                        className="action view"
                      >
                        <FaEye />
                      </Link>

                    </td>

                  </tr>
                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;
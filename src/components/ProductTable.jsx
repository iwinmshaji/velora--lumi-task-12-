import React from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaStar
} from "react-icons/fa";

function ProductTable({ products, onDelete }) {
  return (
    <div className="table-container">
      <table className="product-table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty">
                No products found.
              </td>
            </tr>
          ) : (

            products.map((product) => (
              <tr key={product.id}>

                <td>
                  <div className="product-info">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div>
                      <strong>{product.name}</strong>
                      <small>#{product.id}</small>
                    </div>

                  </div>
                </td>

                <td>{product.category}</td>

                <td>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </td>

                <td>{product.stock}</td>

                <td>
                  <span className="rating">
                    <FaStar />
                    {product.rating}
                  </span>
                </td>

                <td>
                  {product.stock > 0 ? (
                    <span className="status in-stock">
                      In Stock
                    </span>
                  ) : (
                    <span className="status out-stock">
                      Out of Stock
                    </span>
                  )}
                </td>

                <td>
                  <div className="action-buttons">

                    <Link
                      to={`/products/${product.id}`}
                      className="action view"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/products/edit/${product.id}`}
                      className="action edit"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      className="action delete"
                      onClick={() => onDelete(product.id)}
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>

              </tr>
            ))

          )}

        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
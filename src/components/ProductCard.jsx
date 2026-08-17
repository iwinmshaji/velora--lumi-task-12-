import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaEye, FaEdit } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">

        <span className="category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="card-rating">
          <FaStar />
          {product.rating}
        </div>

        <div className="card-price">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </div>

        <p>
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        <div className="card-actions">

          <Link to={`/products/${product.id}`}>
            <FaEye />
            View
          </Link>

          <Link to={`/products/edit/${product.id}`}>
            <FaEdit />
            Edit
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;
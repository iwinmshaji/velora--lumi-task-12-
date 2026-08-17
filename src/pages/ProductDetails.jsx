import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductById,
  deleteProduct
} from "../services/apiService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProductById(id);

      setProduct(data);
    } catch (err) {
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product deleted successfully.");

      navigate("/products");
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-box">
          {error}
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h1>Product Details</h1>

          <p>
            View complete information about this product
          </p>
        </div>

        <button
          className="secondary-btn"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>

      </div>


      {/* PRODUCT DETAILS */}

      <div className="details-card">

        {/* IMAGE */}

        <div className="details-image-container">

          <img
            src={product.image}
            alt={product.title || product.name}
            className="details-image"
          />

        </div>


        {/* CONTENT */}

        <div className="details-content">

          <span className="category">
            {product.category || "Uncategorized"}
          </span>

          <h2>
            {product.title || product.name}
          </h2>

          <div className="details-rating">

            <span className="rating">
              ⭐ {product.rating || "N/A"}
            </span>

            {product.reviews && (
              <span>
                ({product.reviews} reviews)
              </span>
            )}

          </div>


          <h3 className="details-price">
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </h3>


          <div className="stock-info">

            <strong>Stock:</strong>{" "}

            {product.stock > 0 ? (
              <span className="in-stock">
                {product.stock} available
              </span>
            ) : (
              <span className="out-stock">
                Out of stock
              </span>
            )}

          </div>


          <div className="details-description">

            <h3>Description</h3>

            <p>
              {product.description ||
                "No description available for this product."}
            </p>

          </div>


          {/* ACTION BUTTONS */}

          <div className="details-actions">

            <button
              className="edit-btn"
              onClick={() =>
                navigate(`/products/edit/${product.id}`)
              }
            >
              ✏️ Edit Product
            </button>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              🗑️ Delete Product
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
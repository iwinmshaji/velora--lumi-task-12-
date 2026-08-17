import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import { addProduct } from "../services/apiService";

function AddProduct() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleAdd = async (product) => {
    try {
      setError("");

      await addProduct(product);

      navigate("/products");

    } catch (err) {
      setError("Failed to add product.");
    }
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Add Product</h1>
          <p>Add a new product to Velora</p>
        </div>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div className="form-card">

        <ProductForm
          onSubmit={handleAdd}
          buttonText="Add Product"
        />

      </div>

    </div>
  );
}

export default AddProduct;
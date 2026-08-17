import React, { useEffect, useState } from "react";

const emptyProduct = {
  name: "",
  category: "",
  price: "",
  stock: "",
  rating: "",
  image: ""
};

function ProductForm({
  initialData = emptyProduct,
  onSubmit,
  buttonText = "Save Product"
}) {
  const [formData, setFormData] = useState(emptyProduct);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      category: initialData.category || "",
      price: initialData.price ?? "",
      stock: initialData.stock ?? "",
      rating: initialData.rating ?? "",
      image: initialData.image || ""
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.price === "" || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Enter a valid stock value";
    }

    if (
      formData.rating === "" ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    ) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const product = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: Number(formData.rating)
    };

    onSubmit(product);
  };

  const handleReset = () => {
    setFormData(emptyProduct);
    setErrors({});
  };

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">
        <label>Product Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />

        {errors.name && (
          <span className="error-text">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Clothing">Clothing</option>
          <option value="Bags">Bags</option>
          <option value="Accessories">Accessories</option>
        </select>

        {errors.category && (
          <span className="error-text">
            {errors.category}
          </span>
        )}
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="2499"
          />

          {errors.price && (
            <span className="error-text">
              {errors.price}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="10"
          />

          {errors.stock && (
            <span className="error-text">
              {errors.stock}
            </span>
          )}
        </div>

      </div>

      <div className="form-group">
        <label>Rating</label>

        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          placeholder="4.5"
        />

        {errors.rating && (
          <span className="error-text">
            {errors.rating}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Image URL</label>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
        />

        {errors.image && (
          <span className="error-text">
            {errors.image}
          </span>
        )}
      </div>

      <div className="form-buttons">

        <button
          type="button"
          className="reset-btn"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          type="submit"
          className="primary-btn"
        >
          {buttonText}
        </button>

      </div>

    </form>
  );
}

export default ProductForm;
import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";

import {
  getProductById,
  updateProduct
} from "../services/apiService";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data =
          await getProductById(id);

        setProduct(data);

      } catch (err) {

        setError(
          "Unable to load product."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProduct();

  }, [id]);

  const handleUpdate = async (updatedProduct) => {

    try {

      await updateProduct(
        id,
        {
          ...updatedProduct,
          id: Number(id)
        }
      );

      navigate(`/products/${id}`);

    } catch (err) {

      setError(
        "Failed to update product."
      );

    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="page">
        <div className="error-box">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Edit Product</h1>
          <p>Update product information</p>
        </div>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div className="form-card">

        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          buttonText="Update Product"
        />

      </div>

    </div>
  );
}

export default EditProduct;
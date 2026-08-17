import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import Loader from "../components/Loader";

import {
  getProducts,
  deleteProduct
} from "../services/apiService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [sort, setSort] = useState("Default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  // FETCH PRODUCTS

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      setError(
        "Unable to load products. Make sure JSON Server is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // DELETE

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      // filter() removes deleted product from state
      setProducts(
        products.filter((product) => product.id !== id)
      );

    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  // FILTER + SORT

  const processedProducts = useMemo(() => {

    let result = products;

    // SEARCH USING FILTER()
    result = result.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // CATEGORY FILTER
    result = result.filter((product) =>
      category === "All"
        ? true
        : product.category === category
    );

    // STOCK FILTER
    result = result.filter((product) => {
      if (stock === "All") {
        return true;
      }

      if (stock === "In Stock") {
        return product.stock > 0;
      }

      if (stock === "Out of Stock") {
        return product.stock === 0;
      }

      return true;
    });

    // SORT
    if (sort === "Low to High") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "High to Low") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "Rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;

  }, [products, search, category, stock, sort]);

  // PAGINATION

  const totalPages = Math.ceil(
    processedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts =
    processedProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, stock, sort]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Products</h1>
          <p>Manage your Velora products</p>
        </div>

        <Link
          to="/products/add"
          className="primary-btn"
        >
          <FaPlus />
          Add Product
        </Link>

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
          placeholder="Search products..."
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Electronics">
            Electronics
          </option>
          <option value="Footwear">
            Footwear
          </option>
          <option value="Clothing">
            Clothing
          </option>
          <option value="Bags">Bags</option>
          <option value="Accessories">
            Accessories
          </option>
        </select>

        <select
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        >
          <option value="All">All Stock</option>
          <option value="In Stock">
            In Stock
          </option>
          <option value="Out of Stock">
            Out of Stock
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="Default">
            Sort By
          </option>
          <option value="Low to High">
            Price: Low to High
          </option>
          <option value="High to Low">
            Price: High to Low
          </option>
          <option value="Rating">
            Highest Rating
          </option>
        </select>

      </div>

      <ProductTable
        products={currentProducts}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "page-number active"
                  : "page-number"
              }
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Products;
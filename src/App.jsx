import React, { useState } from "react";

import {
      BrowserRouter,
         Routes,
                Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

function App() {

             const [sidebarOpen, setSidebarOpen] =
             useState(false);

             return (
       <BrowserRouter>

      <div className="app">

        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="main-content">

          <button
            className="mobile-menu"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            ☰
          </button>

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <
              
              
              Route
              path="/products"
              element={<Products />}
            />

      <Route
     path="/products/add"
    element={<AddProduct />}
            />

            <Route
              path="/products/edit/:id"
              element={<EditProduct />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
                     path="/orders"
                     element={<Orders />}
                                />

            
            
            
            
            <Route
              path="/orders/:id"
              element={<OrderDetails />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;
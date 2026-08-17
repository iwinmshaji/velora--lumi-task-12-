import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaStore
} from "react-icons/fa";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      
      <div className="logo">
        <FaStore />
        <span>Velora</span>
      </div>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsOpen(false)}
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsOpen(false)}
        >
          <FaBox />
          Products
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setIsOpen(false)}
        >
          <FaShoppingCart />
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
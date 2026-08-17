import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-box">
      <FaSearch />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
}

export default SearchBar;
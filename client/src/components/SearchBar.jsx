import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchBar({ width = "300px", fontSize = "16px" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Search..."
      style={{
        width: `${width}px`,
        fontSize: `${fontSize}px`,
        height: `${fontSize * 2}px`,
        padding: "8px 12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "rgba(0,0,0,0.05)",
        color: "#333",
        outline: "none",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.2s ease-in-out",
      }}
      onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.3)")}
      onBlur={(e) => (e.target.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.2)")}
    />
  );
}
export default SearchBar;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [search, setSearch] = useState();

  return (
    <form className="search">
      <label htmlFor="search-bar">Search: </label>

      <input
        type="text"
        className="search-bar"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <FaSearch
        onClick={() => {
          window.alert("Hello World");
        }}
      />
    </form>
  );
};

export default SearchBar;

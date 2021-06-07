import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setSearch }) => {
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
      <FaSearch />
    </form>
  );
};

export default SearchBar;

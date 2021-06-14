import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ callback }) => {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={(e) => {
          callback(e.target.value.toLowerCase());
        }}
      />
    </form>
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;

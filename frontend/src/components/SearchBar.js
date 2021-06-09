import React from "react";

const SearchBar = ({ callback }) => {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={(e) => {
          callback(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;

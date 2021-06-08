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
        style={{ backgroundImage: "blue" }}
      />
    </form>
  );
};

export default SearchBar;
